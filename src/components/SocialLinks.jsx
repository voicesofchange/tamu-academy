import React, { useState } from "react";

// Social links — replace href values with real URLs when ready
const LINKS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TamuAcademy", // replace with real channel URL
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }} aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tamuacademy", // replace with real handle
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Substack",
    href: "https://tamuacademy.substack.com", // replace with real Substack URL
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }} aria-hidden="true">
        <rect x="3" y="4" width="18" height="3" rx="1" />
        <rect x="3" y="9" width="18" height="3" rx="1" />
        <path d="M 3 14 L 3 20 L 12 17 L 21 20 L 21 14 Z" />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  const [hovered, setHovered] = useState(null);

  return (
    <nav aria-label="Social media links" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      {LINKS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onMouseEnter={() => setHovered(label)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 44,
            minHeight: 44,
            color: hovered === label ? "#E2B652" : "#D4A12A",
            transform: hovered === label ? "scale(1.15)" : "scale(1)",
            transition: "color 0.2s ease, transform 0.2s ease",
            outline: "none",
            borderRadius: "4px",
            textDecoration: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid #D4A12A";
            e.currentTarget.style.outlineOffset = "4px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "none";
          }}
        >
          {icon}
        </a>
      ))}
    </nav>
  );
}