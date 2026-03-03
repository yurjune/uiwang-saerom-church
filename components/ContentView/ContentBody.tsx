import { Box, AspectRatio } from "@chakra-ui/react";
import NextImage from "next/image";
import {
  BLOCKS,
  INLINES,
  type Block,
  type Document,
  type Inline,
} from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import type { ReactNode } from "react";
import type { ArticleEntry } from "@/interface/article";

const option: Options = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (_node: Block | Inline, children: ReactNode) => (
      <Box fontSize="16px" lineHeight="180%">
        {children}
      </Box>
    ),
    // Quick workaround: avoid invalid <p><div/></p> nesting when inline YouTube renders AspectRatio (div).
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
      <Box as="div">{children}</Box>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline, _children: ReactNode) => {
      const fields = (node as any).data?.target?.fields;
      const image = fields?.file?.details?.image;
      const fileUrl = fields?.file?.url;
      if (image && fileUrl) {
        return (
          <NextImage
            src={`https:${fileUrl}`}
            alt="alt"
            width={image.width}
            height={image.height}
          />
        );
      }
      return null;
    },
    [INLINES.HYPERLINK]: (node: Block | Inline, _children: ReactNode) => {
      const uri = (node as any).data?.uri;
      if (typeof uri === "string" && uri.includes("youtube.com")) {
        return (
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={uri}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        );
      }
      return null;
    },
  },
  renderText: (text: string) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, [] as ReactNode[]);
  },
};

type Props = {
  article: ArticleEntry;
};

const ContentBody = ({ article }: Props) => {
  const paragraph = article.fields.paragraph as Document | undefined;
  if (!paragraph) return null;

  return <Box>{documentToReactComponents(paragraph, option)}</Box>;
};

export default ContentBody;
