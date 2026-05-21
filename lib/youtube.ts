// Server-side YouTube playlist fetcher. ISR-cached for 1 hour.
// Set YOUTUBE_API_KEY and YOUTUBE_PLAYLIST_ID in .env.local (and on Vercel).

export type Video = {
  id: string;          // YouTube video ID
  label: string;       // Card eyebrow ("Field Report", "Lecture", etc.)
  title: string;       // Card title
  thumbnail: string;   // YouTube thumbnail URL
  publishedAt: string; // ISO date
};

type YTItem = {
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
    resourceId: { videoId: string };
  };
};

// Parses a YouTube title like "Field Report — Monsey Glen, Spring 2026"
// into { label: "Field Report", title: "Monsey Glen, Spring 2026" }.
// Falls back to a default label if no separator is found.
function parseTitle(raw: string): { label: string; title: string } {
  const sep = raw.match(/\s+[—–-]\s+/);
  if (sep && sep.index !== undefined) {
    return {
      label: raw.slice(0, sep.index).trim(),
      title: raw.slice(sep.index + sep[0].length).trim(),
    };
  }
  return { label: "Field Report", title: raw };
}

export async function fetchPlaylistVideos(): Promise<Video[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;
  if (!apiKey || !playlistId) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error("YouTube API error", res.status, await res.text());
      return null;
    }
    const json = (await res.json()) as { items: YTItem[] };
    return json.items
      .filter((it) => it.snippet?.resourceId?.videoId)
      .map((it) => {
        const { label, title } = parseTitle(it.snippet.title);
        const thumb =
          it.snippet.thumbnails.high?.url ??
          it.snippet.thumbnails.medium?.url ??
          it.snippet.thumbnails.default?.url ??
          `https://img.youtube.com/vi/${it.snippet.resourceId.videoId}/hqdefault.jpg`;
        return {
          id: it.snippet.resourceId.videoId,
          label,
          title,
          thumbnail: thumb,
          publishedAt: it.snippet.publishedAt,
        };
      });
  } catch (e) {
    console.error("YouTube fetch failed", e);
    return null;
  }
}
