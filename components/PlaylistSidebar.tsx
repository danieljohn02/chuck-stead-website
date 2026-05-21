"use client";
import { useState } from "react";

const PLAYLIST_ID = "PL8dPuuaLjXtMwmepBjTSG593eG7ObzO7s";

const VIDEOS = [
  { id: "Yocja_N5s1I", title: "The Agricultural Revolution: Crash Course World History #1", duration: "11:54" },
  { id: "n7ndRwqJYDM", title: "Indus Valley Civilization: Crash Course World History #2", duration: "10:54" },
  { id: "sohXPx_XZ6Y", title: "Mesopotamia: Crash Course World History #3",                duration: "11:35" },
  { id: "Z3Wvw6BivVI", title: "Ancient Egypt: Crash Course World History #4",               duration: "11:43" },
  { id: "Q-V2uTcEoUI", title: "The Persians & Greeks: Crash Course World History #5",       duration: "12:43" },
  { id: "xQoP2OoolME", title: "Buddha and Ashoka: Crash Course World History #6",           duration: "12:23" },
];

export default function PlaylistSidebar() {
  const [active, setActive] = useState(0);
  const cur = VIDEOS[active];

  return (
    <div className="yt-custom">
      <div className="yt-custom-player">
        <iframe
          key={cur.id}
          src={`https://www.youtube.com/embed/${cur.id}?list=${PLAYLIST_ID}&rel=0&modestbranding=1`}
          title={cur.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <aside className="yt-custom-list" aria-label="Playlist">
        <div className="yt-custom-list-head">
          <span className="lab">Playlist</span>
          <span className="meta">{active + 1} / {VIDEOS.length}</span>
        </div>
        <ol>
          {VIDEOS.map((v, i) => (
            <li key={v.id}>
              <button
                type="button"
                className={`yt-row${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-current={i === active}
              >
                <span className="thumb">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="dur">{v.duration}</span>
                </span>
                <span className="info">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ttl">{v.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
