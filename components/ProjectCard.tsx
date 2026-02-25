import React from "react";

export default function ProjectCard({ project }: { project: any }) {
	return (
		<a href={project.link || "#"} style={{ textDecoration: "none", color: "inherit" }}>
			<div style={{ border: "1px solid #e6e6e6", padding: 16, borderRadius: 8, background: "#fff" }}>
				<h3 style={{ margin: "0 0 8px 0" }}>{project.title}</h3>
				<p style={{ margin: 0, color: "#444" }}>{project.description}</p>
				{project.tags && (
					<div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
						{project.tags.map((t: string) => (
							<span key={t} style={{ background: "#f1f1f1", padding: "4px 8px", borderRadius: 6, fontSize: 12 }}>
								{t}
							</span>
						))}
					</div>
				)}
			</div>
		</a>
	);
}
