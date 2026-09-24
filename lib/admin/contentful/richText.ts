import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";

export function createEmptyDocument(): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: "",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
}

export function createAssetDocument(assetId: string): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.EMBEDDED_ASSET,
        data: {
          target: {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: assetId,
            },
          },
        },
        content: [],
      },
    ],
  };
}

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
