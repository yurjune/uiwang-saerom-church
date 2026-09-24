import { describe, expect, it } from "vitest";
import { normalizeYouTubeEmbedUrl } from "@/lib/admin/contentful/youtube";

describe("normalizeYouTubeEmbedUrl", () => {
  it.each([
    [
      "https://www.youtube.com/watch?v=YATPaLsfT08",
      "https://www.youtube.com/embed/YATPaLsfT08",
    ],
    [
      "https://youtu.be/YATPaLsfT08?si=test",
      "https://www.youtube.com/embed/YATPaLsfT08",
    ],
    [
      "https://www.youtube.com/embed/YATPaLsfT08",
      "https://www.youtube.com/embed/YATPaLsfT08",
    ],
    [
      "https://www.youtube.com/shorts/YATPaLsfT08",
      "https://www.youtube.com/embed/YATPaLsfT08",
    ],
    [
      "https://www.youtube.com/live/YATPaLsfT08?feature=shared",
      "https://www.youtube.com/embed/YATPaLsfT08",
    ],
  ])("%s를 embed URL로 정규화한다", (input, expected) => {
    expect(normalizeYouTubeEmbedUrl(input)).toBe(expected);
  });

  it("유튜브 링크가 아니면 에러를 던진다", () => {
    expect(() => normalizeYouTubeEmbedUrl("https://example.com")).toThrow(
      "지원하지 않는 유튜브 링크입니다.",
    );
  });
});
