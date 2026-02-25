"use client";
import React, { useState } from "react";

export default function ProfileCard({ name = "Davi André Gauze", bio = "Suporte Web | React | Node.js | Python | SQL", imgSrc = "/profile.jpg" }: { name?: string; bio?: string; imgSrc?: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {!imgError ? (
        // try to load user-provided profile.jpg from /public
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgError(true)}
          style={{ width: 112, height: 112, borderRadius: "50%", objectFit: "cover", border: "2px solid #e6e6e6" }}
        />
      ) : (
        <div style={{ width: 112, height: 112, borderRadius: "50%", background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#444" }}>
          {name.split(" ").map((s) => s[0]).slice(0,2).join("")}
        </div>
      )}

      <div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{name}</div>
        <div style={{ color: "#666", marginTop: 6 }}>{bio}</div>
      </div>
    </div>
  );
}
