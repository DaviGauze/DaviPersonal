import React from "react";

export default function Tabs({ tabs, active, onChange }: { tabs: string[]; active?: string; onChange?: (t: string) => void }) {
	return (
		<div style={{ display: "flex", gap: 8 }}>
			{tabs.map((t) => (
				<button
					key={t}
					onClick={() => onChange && onChange(t)}
					style={{
						padding: "6px 10px",
						borderRadius: 6,
						border: active === t ? "1px solid #0366d6" : "1px solid #e6e6e6",
						background: active === t ? "#eaf4ff" : "#fff",
					}}
				>
					{t}
				</button>
			))}
		</div>
	);
}
