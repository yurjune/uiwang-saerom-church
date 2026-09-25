import {
  BLOCKS,
  INLINES,
  type Document,
  type TopLevelBlock,
} from "@contentful/rich-text-types";

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

export function createAssetDocument(assetIds: string[]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: assetIds.map((assetId) => ({
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
    })),
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

function isEmptyParagraph(node: TopLevelBlock) {
  return (
    node.nodeType === BLOCKS.PARAGRAPH &&
    node.content.every(
      (child) => child.nodeType === "text" && !child.value.trim(),
    )
  );
}

export function getEmbeddedAssetIds(document: Document | undefined): string[] {
  return (document?.content ?? [])
    .filter((node) => node.nodeType === BLOCKS.EMBEDDED_ASSET)
    .map((node) => node.data?.target?.sys?.id)
    .filter((id): id is string => typeof id === "string");
}

export function getFirstHyperlinkUri(
  document: Document | undefined,
): string | null {
  for (const block of document?.content ?? []) {
    for (const child of block.content) {
      if (child.nodeType === INLINES.HYPERLINK) {
        return typeof child.data?.uri === "string" ? child.data.uri : null;
      }
    }
  }

  return null;
}

// 이미지를 교체할 때 기존 본문의 텍스트 블록은 유지하고 이미지 블록만 바꾼다.
export function replaceEmbeddedAssets(
  current: Document | undefined,
  assetIds: string[],
): Document {
  const kept = (current?.content ?? []).filter(
    (node) =>
      node.nodeType !== BLOCKS.EMBEDDED_ASSET && !isEmptyParagraph(node),
  );
  const content = [...kept, ...createAssetDocument(assetIds).content];

  if (content.length === 0) {
    return createEmptyDocument();
  }

  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content,
  };
}
