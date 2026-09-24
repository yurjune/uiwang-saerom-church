import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { toContentfulArticleFields } from "./articlePayload";

describe("toContentfulArticleFields", () => {
  it("설교영상 유튜브 링크를 embed hyperlink paragraph로 변환한다", () => {
    const fields = toContentfulArticleFields({
      category: CONTENTFUL_CATEGORY.movies,
      title: "설교 제목",
      youtubeUrl: "https://www.youtube.com/watch?v=YATPaLsfT08",
      tags: ["빌립보서"],
      date: "2026-09-25T00:00:00.000Z",
    });

    expect(fields).toMatchObject({
      title: "설교 제목",
      category: CONTENTFUL_CATEGORY.movies,
      date: "2026-09-25T00:00:00.000Z",
      tag: ["빌립보서"],
      paragraph: {
        nodeType: BLOCKS.DOCUMENT,
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [
              {
                nodeType: INLINES.HYPERLINK,
                data: {
                  uri: "https://www.youtube.com/embed/YATPaLsfT08",
                },
              },
            ],
          },
        ],
      },
    });
  });

  it("교회소식은 thumbnail asset id를 Contentful 필드로 전달한다", () => {
    expect(
      toContentfulArticleFields(
        {
          category: CONTENTFUL_CATEGORY.news,
          title: "소식 제목",
          date: "2026-09-25T00:00:00.000Z",
        },
        "asset-id",
      ),
    ).toMatchObject({
      title: "소식 제목",
      category: CONTENTFUL_CATEGORY.news,
      thumbnailAssetId: "asset-id",
      paragraph: {
        nodeType: BLOCKS.DOCUMENT,
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ASSET,
            data: {
              target: {
                sys: {
                  id: "asset-id",
                },
              },
            },
          },
        ],
      },
    });
  });
});
