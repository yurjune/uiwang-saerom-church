import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { createYouTubeParagraphDocument } from "@/lib/admin/contentful/richText";

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
