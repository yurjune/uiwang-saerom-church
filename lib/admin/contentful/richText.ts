import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";

export function createYouTubeParagraphDocument(embedUrl: string): Document {
  return {
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
  };
}
