import React from "react";
import Sidebar from "../components/sidebar";
import ContributionGraph from "../components/ContributionGraph";
import ProfileCard from "../components/ProfileCard";
import ProjectCard from "../components/ProjectCard";
import ExperienceSection from "../components/ExperienceSection";
import Skills from "../components/Skills";
import { projects } from "../data/projects";
import { experience } from "../data/experience";
import { skills } from "../data/skills";

export default function HomePage() {
	return (
		<div style={{ display: "flex", minHeight: "100vh", fontFamily: 'Inter, system-ui, -apple-system' }}>
			<aside style={{ width: 260, padding: 24, borderRight: "1px solid #e6e6e6" }}>
				<Sidebar />
			</aside>

			<main style={{ flex: 1, padding: 32, maxWidth: 1100, margin: "0 auto" }}>
				<section id="top">
					<h1 style={{ margin: 0 }}>Meu GitHub / Portfolio (one-page)</h1>
					<p style={{ color: "#555" }}>Projetos, contribuições, experiências e certificados — tudo numa página.</p>
				</section>

				<section id="contributions" style={{ marginTop: 40 }}>
					<h2>Contribuições</h2>

					<div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
						<div style={{ width: 300 }}>
							<ProfileCard />
							<div style={{ marginTop: 12, color: "#666", fontSize: 13 }}>
								Pinned: AutoCatchChamados (veja projetos)
							</div>
						</div>

						<div style={{ flex: 1 }}>
							<ContributionGraph />
						</div>
					</div>
				</section>

				<section id="projects" style={{ marginTop: 40 }}>
					<h2>Projetos</h2>
					<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
						{projects.map((p) => (
							<ProjectCard key={p.id} project={p} />
						))}
					</div>
				</section>

				<section id="experience" style={{ marginTop: 40 }}>
					<h2>Experiência</h2>
					<ExperienceSection items={experience} />
				</section>

				<section id="skills" style={{ marginTop: 40 }}>
					<h2>Skills</h2>
					<Skills list={skills} />
				</section>

				<section id="certificates" style={{ marginTop: 40 }}>
					<h2>Certificados & Educação</h2>
					<p style={{ color: "#666" }}>Adicione seus certificados aqui (opcional).</p>
				</section>
			</main>
		</div>
	);
}
