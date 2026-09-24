const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

function getYouTubeVideoId(url: URL): string | null {
  if (!YOUTUBE_HOSTS.has(url.hostname)) {
    return null;
  }

  if (url.hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  const [prefix, videoId] = url.pathname.split("/").filter(Boolean);
  if (["embed", "shorts", "live"].includes(prefix)) {
    return videoId ?? null;
  }

  return null;
}

export function normalizeYouTubeEmbedUrl(rawUrl: string): string {
  let url: URL;

  try {
    url = new URL(rawUrl.trim());
  } catch {
    throw new Error("유효한 유튜브 링크를 입력해주세요.");
  }

  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    throw new Error("지원하지 않는 유튜브 링크입니다.");
  }

  return `https://www.youtube.com/embed/${videoId}`;
}
