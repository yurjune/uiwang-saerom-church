import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import {
  createAssetDocument,
  createYouTubeParagraphDocument,
  getEmbeddedAssetIds,
  getFirstHyperlinkUri,
  replaceEmbeddedAssets,
} from "@/lib/admin/contentful/richText";

describe("createYouTubeParagraphDocument", () => {
  it("유튜브 embed URL을 Contentful Rich Text hyperlink node로 만든다", () => {
    const embedUrl = "https://www.youtube.com/embed/YATPaLsfT08";

    expect(createYouTubeParagraphDocument(embedUrl)).toEqual({
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: INLINES.HYPERLINK,
              data: {
                uri: embedUrl,
              },
              content: [
                {
                  nodeType: "text",
                  value: embedUrl,
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    });
  });
});

const textParagraph = {
  nodeType: BLOCKS.PARAGRAPH,
  data: {},
  content: [{ nodeType: "text", value: "안내 문구", marks: [], data: {} }],
} as const;

describe("replaceEmbeddedAssets", () => {
  it("텍스트 블록은 유지하고 이미지 블록만 교체한다", () => {
    const current = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [textParagraph, ...createAssetDocument(["old"]).content],
    } as Document;

    const next = replaceEmbeddedAssets(current, ["new-1", "new-2"]);

    expect(next.content[0]).toEqual(textParagraph);
    expect(getEmbeddedAssetIds(next)).toEqual(["new-1", "new-2"]);
  });

  it("남는 블록이 없으면 빈 문단 문서를 반환한다", () => {
    const next = replaceEmbeddedAssets(createAssetDocument(["old"]), []);

    expect(next.content).toHaveLength(1);
    expect(next.content[0].nodeType).toBe(BLOCKS.PARAGRAPH);
  });
});

describe("getFirstHyperlinkUri", () => {
  it("본문의 첫 번째 링크 주소를 반환한다", () => {
    const document = createYouTubeParagraphDocument(
      "https://www.youtube.com/embed/abc",
    );

    expect(getFirstHyperlinkUri(document)).toBe(
      "https://www.youtube.com/embed/abc",
    );
    expect(document.content[0].content[0].nodeType).toBe(INLINES.HYPERLINK);
  });

  it("링크가 없으면 null을 반환한다", () => {
    expect(getFirstHyperlinkUri(createAssetDocument(["a"]))).toBeNull();
  });
});
