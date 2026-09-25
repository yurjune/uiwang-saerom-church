export const THUMBNAIL_PRESETS = Array.from(
  { length: 8 },
  (_, index) => `/thumbnails/presets/thumbnail${index + 1}.webp`,
);

// sequence: 가장 오래된 게시글을 0으로 하는 순번. 순서대로 프리셋을 돌려 쓴다.
export function getThumbnailPreset(sequence: number) {
  const count = THUMBNAIL_PRESETS.length;
  return THUMBNAIL_PRESETS[((sequence % count) + count) % count];
}
