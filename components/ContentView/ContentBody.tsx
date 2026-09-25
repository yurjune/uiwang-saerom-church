import { Box } from "@chakra-ui/react";
import NextImage from "next/image";
import {
  BLOCKS,
  INLINES,
  type Block,
  type Document,
  type Inline,
  type Text,
} from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import type { ReactNode } from "react";
import type { ArticleDetail } from "@/lib/contentful/article";

const YouTubePlayer = ({ src }: { src: string }) => (
  // Chakra AspectRatio는 Children.only를 써서 서버 컴포넌트에서 넘긴 자식으로 prerender가 실패한다.
  <Box
    as="iframe"
    src={src}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    display="block"
    w="100%"
    sx={{ aspectRatio: "16 / 9" }}
    border="0"
    marginBottom="16px"
  />
);

const option: Options = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (_node: Block | Inline, children: ReactNode) => (
      <Box fontSize="16px" lineHeight="180%">
        {children}
      </Box>
    ),
    // Quick workaround: avoid invalid <p><div/></p> nesting when inline YouTube renders a block iframe.
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
    // 기존 article 모델은 본문 첫 줄의 hyperlink로 유튜브 영상을 저장했다.
    [INLINES.HYPERLINK]: (node: Block | Inline, _children: ReactNode) => {
      const uri = (node as any).data?.uri;
      if (typeof uri === "string" && uri.includes("youtube.com")) {
        return <YouTubePlayer src={uri} />;
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

function hasYouTubeHyperlinkNode(node: Block | Inline | Text): boolean {
  if (
    node.nodeType === INLINES.HYPERLINK &&
    typeof node.data?.uri === "string" &&
    node.data.uri.includes("youtube.com")
  ) {
    return true;
  }

  if (node.nodeType === "text") {
    return false;
  }

  return node.content.some(hasYouTubeHyperlinkNode);
}

type Props = {
  article: ArticleDetail;
};

const ContentBody = ({ article }: Props) => {
  const { youtubeUrl, images } = article.fields;
  const paragraph = article.fields.paragraph as Document | null;
  const paragraphHasYouTube = paragraph?.content.some(hasYouTubeHyperlinkNode);

  return (
    <Box>
      {youtubeUrl && !paragraphHasYouTube && <YouTubePlayer src={youtubeUrl} />}
      {paragraph && documentToReactComponents(paragraph, option)}
      {images.map((image) => (
        <NextImage
          key={image.url}
          src={image.url}
          alt={image.title || article.fields.title}
          width={image.width}
          height={image.height}
        />
      ))}
    </Box>
  );
};

export default ContentBody;
