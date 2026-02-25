// Server-side helper to fetch GitHub repositories (REST) using optional token.
// Usage: import { fetchUserRepos } from '../lib/github'

export async function fetchUserRepos(username: string) {
  const token = process.env.GITHUB_TOKEN || "";
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
    headers,
    next: { revalidate: 60 * 5 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export default fetchUserRepos;

// Fetch simplified project list (name, description, url, stars, language, homepage, topics, updated_at)
export async function fetchUserProjects(username: string) {
  const repos = await fetchUserRepos(username);
  if (!Array.isArray(repos)) return [];

  return repos.map((r: any) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    description: r.description,
    html_url: r.html_url,
    homepage: r.homepage,
    stargazers_count: r.stargazers_count,
    language: r.language,
    topics: r.topics || [],
    updated_at: r.updated_at,
  }));
}

// Fetch recent contribution-like activity and aggregate commits per day.
// Uses REST events endpoint; counts commits from PushEvent plus simple counts for PR/Issues opens.
export async function fetchContributions(username: string, days = 90) {
  const token = process.env.GITHUB_TOKEN || "";
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const perPage = 100;
  const maxPages = 10; // avoid infinite fetching
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const counts: Record<string, number> = {};

  for (let page = 1; page <= maxPages; page++) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=${perPage}&page=${page}`;
    const res = await fetch(url, { headers, next: { revalidate: 60 * 5 } });
    if (!res.ok) break;
    const events = await res.json();
    if (!Array.isArray(events) || events.length === 0) break;

    let stop = false;
    for (const ev of events) {
      const date = new Date(ev.created_at);
      if (date < cutoff) {
        stop = true;
        break;
      }

      const day = date.toISOString().slice(0, 10);
      let delta = 0;

      if (ev.type === 'PushEvent') {
        delta = (ev.payload && ev.payload.commits && ev.payload.commits.length) || 1;
      } else if (ev.type === 'PullRequestEvent' && ev.payload && ev.payload.action === 'opened') {
        delta = 1;
      } else if (ev.type === 'IssuesEvent' && ev.payload && ev.payload.action === 'opened') {
        delta = 1;
      } else if (ev.type === 'IssueCommentEvent') {
        delta = 1;
      }

      if (delta > 0) counts[day] = (counts[day] || 0) + delta;
    }

    if (stop) break;
  }

  // Build an array for the last `days` days with zeros where missing
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: counts[key] || 0 });
  }

  return out;
}
