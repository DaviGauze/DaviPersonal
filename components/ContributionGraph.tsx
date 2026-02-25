import React from "react";
import { fetchContributions } from "../lib/github";
import GITHUB from "../data/github";

function colorForCount(count: number) {
	if (count === 0) return "#ebedf0";
	if (count === 1) return "#c6e48b";
	if (count === 2) return "#7bc96f";
	return "#196127";
}

export default async function ContributionGraph({ days = 90 }: { days?: number }) {
	const username = GITHUB.username;
	const data = await fetchContributions(username, days).catch(() => []);

	const cols = Math.ceil(days / 7);
	// data is an array of {date, count} for the last `days` days
	const cells: number[] = [];
	for (const d of data) cells.push(d.count);
	// pad to full weeks
	while (cells.length < cols * 7) cells.unshift(0);

	return (
		<div style={{ display: "flex", gap: 8 }}>
			<div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 12px)`, gap: 4 }}>
				{cells.map((v, i) => (
					<div
						key={i}
						title={`Commits: ${v}`}
						style={{
							width: 12,
							height: 12,
							background: colorForCount(v),
							borderRadius: 3,
						}}
					/>
				))}
			</div>
			<div style={{ marginLeft: 12, color: "#666", fontSize: 13 }}>
				<div>Últimos {days} dias</div>
				<div style={{ marginTop: 8 }}>{data.length ? "Dados reais carregados do GitHub" : "Sem dados públicos"}</div>
			</div>
		</div>
	);
}
