"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "research", label: "Research" },
  { id: "philosophy", label: "Living History" },
  { id: "bio", label: "Biography" },
  { id: "projects", label: "Field Projects" },
  { id: "restoration", label: "Restoration" },
  { id: "angola", label: "Angola" },
  { id: "videos", label: "Videos" },
  { id: "engage", label: "Engagement" },
  { id: "contact", label: "Contact" },
  { id: "gallery", label: "Gallery" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setOnHero(active === "hero");
  }, [active]);

  return (
    <nav className={`nav${onHero ? " on-hero" : ""}`} aria-label="Primary">
      <div className="wrap">
        <a className="nav-brand" href="#hero" onClick={() => setOpen(false)}>
          <span className="mark">CS</span>
          <span>Chuck Stead</span>
        </a>
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
        <div className={`nav-links${open ? " open" : ""}`}>
          {SECTIONS.filter((s) => s.id !== "hero").map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
