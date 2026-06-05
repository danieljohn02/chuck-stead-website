"use client";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/youtube";

const YT_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the modal so keyboard / screen-reader users stay inside.
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore focus to the card that opened the modal.
      lastTriggerRef.current?.focus();
    };
  }, [active]);

  return (
    <>
      <p className="scroll-hint" aria-hidden="true">Swipe to see more <span>→</span></p>
      <div className="video-grid">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            className="video-card"
            onClick={(e) => {
              lastTriggerRef.current = e.currentTarget;
              setActive(v);
            }}
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
          onKeyDown={(e) => {
            // Simple focus trap: cycle Tab between close button and iframe.
            if (e.key !== "Tab") return;
            const focusables = e.currentTarget.querySelectorAll<HTMLElement>(
              'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
            );
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }}
        >
          <div className="video-modal-inner">
            <button
              ref={closeBtnRef}
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
                src={`https://www.youtube.com/embed/${YT_ID_RE.test(active.id) ? active.id : ""}?autoplay=1&rel=0&modestbranding=1`}
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
