"use client";
import { useEffect, useState } from "react";
import type { Video } from "@/lib/youtube";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="video-grid">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            className="video-card"
            onClick={() => setActive(v)}
            aria-label={`Play: ${v.label} — ${v.title}`}
          >
            {v.thumbnail && (
              <img
                src={v.thumbnail}
                alt=""
                className="video-thumb"
                loading="lazy"
                decoding="async"
              />
            )}
            <span className="play" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <div className="meta">
              <div className="lab">{v.label}</div>
              <div className="ttl">{v.title}</div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
        >
          <div className="video-modal-inner">
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setActive(null)}
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" stroke="currentColor">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
            <div className="video-modal-frame">
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                title={active.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-modal-meta">
              <div className="lab">{active.label}</div>
              <div className="ttl">{active.title}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
