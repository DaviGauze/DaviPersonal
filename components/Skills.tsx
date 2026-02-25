import React from "react";

export default function Skills({ list }: { list: string[] }) {
	return (
		<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
			{list.map((s) => (
				<span key={s} style={{ background: "#f5f5f5", padding: "6px 10px", borderRadius: 999 }}>{s}</span>
			))}
		</div>
	);
}
