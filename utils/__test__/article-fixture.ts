import { ArticleEntry } from "@/interface/article";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

let seq = 0;

export function createMockArticle() {
  seq += 1;
  return {
    ...mockArticle,
    sys: {
      ...mockArticle.sys,
      id: "mock-article-" + seq,
    },
  };
}

export const mockArticle: ArticleEntry = {
  metadata: {
    tags: [],
    concepts: [],
  },
  sys: {
    space: {
      sys: {
        type: "Link",
        linkType: "Space",
        id: "gahy3ijwoce2",
      },
    },
    id: "3zYYOgHw7s6HZDlvXOBGdk",
    type: "Entry",
    createdAt: "2021-10-26T16:13:56.985Z",
    updatedAt: "2026-03-02T11:17:17.101Z",
    environment: {
      sys: {
        id: "master",
        type: "Link",
        linkType: "Environment",
      },
    },
    publishedVersion: 81,
    revision: 21,
    contentType: {
      sys: {
        type: "Link",
        linkType: "ContentType",
        id: "article",
      },
    },
    locale: "ko",
  },
  fields: {
    paragraph: {
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
            {
              nodeType: INLINES.HYPERLINK,
              data: {
                uri: "https://www.youtube.com/embed/YATPaLsfT08",
              },
              content: [
                {
                  nodeType: "text",
                  value: "https://www.youtube.com/embed/YATPaLsfT08",
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: "text",
              value: "\n\n",
              marks: [],
              data: {},
            },
            {
              nodeType: "text",
              value: "빌립보서 4 : 1",
              marks: [
                {
                  type: "bold",
                },
              ],
              data: {},
            },
            {
              nodeType: "text",
              value:
                "\n\n1   그러므로 나의 사랑하고 사모하는 형제들, 나의 기쁨이요 면류관인 사랑하는 자들아 이와 같이 주 안에 서라",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    title: "항상 기뻐하라",
    thumbnail: {
      metadata: {
        tags: [],
        concepts: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "gahy3ijwoce2",
          },
        },
        id: "6QTx4NXaucnwVwHnDNHOPR",
        type: "Asset",
        createdAt: "2021-10-26T16:34:45.356Z",
        updatedAt: "2021-10-26T16:34:45.356Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        publishedVersion: 4,
        revision: 1,
        locale: "ko",
      },
      fields: {
        title: "썸네일1",
        description: "",
        file: {
          url: "//images.ctfassets.net/gahy3ijwoce2/6QTx4NXaucnwVwHnDNHOPR/490f021a08371a25370daa752241939e/_________1.png",
          details: {
            size: 208544,
            image: {
              width: 500,
              height: 500,
            },
          },
          fileName: "썸네일1.png",
          contentType: "image/png",
        },
      },
    },
    category: "설교영상",
    tag: ["빌립보서"],
  },
};
