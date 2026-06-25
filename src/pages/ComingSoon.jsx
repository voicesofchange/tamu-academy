import React, { useEffect, useState } from "react";
import WorldMapMotif from "@/components/WorldMapMotif";
import SocialLinks from "@/components/SocialLinks";

const LOGO_URL = "https://media.base44.com/images/public/user_68796cfeca8e624b09c5f04b/8de477990_TamuAcademyFinalLogo.png";

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sweepX = mousePos.x * 100;
  const sweepY = mousePos.y * 100;

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        background: "#1A130E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Obsidian Depth — layered radial gradients */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,161,42,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 30% 70%, rgba(232,149,28,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 30%, rgba(212,161,42,0.04) 0%, transparent 65%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* World Map SVG Motif — background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: 0.13,
        }}
      >
        <WorldMapMotif />
      </div>

      {/* Gilded Meridian line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          right: "5%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(212,161,42,0.3) 20%, rgba(226,182,82,0.5) 50%, rgba(212,161,42,0.3) 80%, transparent 100%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem 1.5rem",
          maxWidth: "900px",
          width: "100%",
          gap: "0",
        }}
      >
        {/* Logo */}
        <header
          style={{
            marginBottom: "2rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <img
            src={LOGO_URL}
            alt="Tamu Academy — Sweet Learning for a Better World"
            style={{
              width: "min(520px, 88vw)",
              height: "auto",
              filter: `
                brightness(0) invert(1)
                drop-shadow(0 0 28px rgba(212,161,42,0.45))
                drop-shadow(0 0 8px rgba(226,182,82,0.3))
              `,
              mixBlendMode: "normal",
            }}
          />
        </header>

        {/* Main content block */}
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
          {/* Descriptor */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 2.5vw, 1.125rem)",
              lineHeight: 1.75,
              color: "#F5EFE0",
              maxWidth: "580px",
              letterSpacing: "0.01em",
              margin: "0 0 2.5rem 0",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 1.1s ease 0.5s, transform 1.1s ease 0.5s",
            }}
          >
            AfroCentric video lessons on the mind, policy,
            <br className="hidden-xs" /> the world, and the planet —&nbsp;
            <span
              style={{
                background: `linear-gradient(135deg, #D4A12A ${sweepX - 20}%, #E2B652 ${sweepX}%, #D4A12A ${sweepX + 20}%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 500,
                transition: "background 0.15s ease",
              }}
            >
              launching soon.
            </span>
          </p>

          {/* Thin gold separator */}
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #D4A12A, transparent)",
              margin: "0 auto 2.5rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1.2s ease 0.8s",
            }}
          />

          {/* Topic pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.625rem",
              justifyContent: "center",
              marginBottom: "3rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1.1s ease 0.9s, transform 1.1s ease 0.9s",
            }}
          >
            {["Mental Health", "Policy", "Global Affairs", "Environment"].map((topic) => (
              <span
                key={topic}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#D4A12A",
                  border: "1px solid rgba(212,161,42,0.35)",
                  padding: "0.35rem 0.875rem",
                  borderRadius: "2px",
                  background: "rgba(212,161,42,0.06)",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.25rem 1.5rem",
          borderTop: "1px solid rgba(212,161,42,0.15)",
          gap: "1.25rem",
          flexWrap: "wrap",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.4s ease 1.1s",
        }}
      >
        {/* Brand seal */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.8rem",
            letterSpacing: "0.06em",
            color: "rgba(245,239,224,0.5)",
            textTransform: "uppercase",
          }}
        >
          A Waiyaki House LLC Brand
        </span>

        {/* Vertical rule */}
        <div
          aria-hidden="true"
          style={{
            width: "1px",
            height: "18px",
            background: "rgba(212,161,42,0.4)",
            flexShrink: 0,
          }}
        />

        {/* Social links */}
        <SocialLinks />
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
}