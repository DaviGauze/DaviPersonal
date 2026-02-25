import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
	return (
		<div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
				<div style={{ fontSize: 18, fontWeight: 700 }}>Meu Perfil</div>
				<div>
					<ThemeToggle />
				</div>
			</div>

			<div style={{ color: "#555", marginBottom: 16 }}>Davi — Desenvolvedor</div>
			<nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				<a href="#top" style={{ color: "#0366d6" }}>Início</a>
				<a href="#contributions" style={{ color: "#0366d6" }}>Contribuições</a>
				<a href="#projects" style={{ color: "#0366d6" }}>Projetos</a>
				<a href="#experience" style={{ color: "#0366d6" }}>Experiência</a>
				<a href="#skills" style={{ color: "#0366d6" }}>Skills</a>
				<a href="#certificates" style={{ color: "#0366d6" }}>Certificados</a>
			</nav>
		</div>
	);
}
