import React from "react";

export default function ExperienceCard({ item }: { item: any }) {
	return (
		<div style={{ border: "1px solid #e6e6e6", padding: 16, borderRadius: 8, background: "#fff" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
				<div>
					<strong>{item.role}</strong>
					<div style={{ color: "#666" }}>{item.company}</div>
				</div>
				<div style={{ color: "#666" }}>{item.period}</div>
			</div>
			{item.bullets && (
				<ul style={{ marginTop: 8 }}>
					{item.bullets.map((b: string, i: number) => (
						<li key={i} style={{ color: "#444" }}>{b}</li>
					))}
				</ul>
			)}
		</div>
	);
}
