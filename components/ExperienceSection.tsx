import React from "react";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceSection({ items }: { items: any[] }) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			{items.map((it) => (
				<ExperienceCard key={it.id} item={it} />
			))}
		</div>
	);
}
