import { CHURCH_LOCATION, CHURCH_NAME } from "../constants";

export const SITE_URL = "https://www.uwsch.org";
export const SITE_IMAGE = "/logo.jpg";
export const SITE_ICON = "/favicon.ico";
export const SITE_DESCRIPTION = `${CHURCH_NAME} 홈페이지입니다. 예배 안내, 교회소식, 설교영상을 확인할 수 있습니다.`;
export const SITE_SHORT_DESCRIPTION = `${CHURCH_NAME} 예배 안내와 교회소식을 전합니다.`;

const toAbsoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

export const createPageMetadata = ({
  title,
  description,
  path = "/",
  keywords = [],
  openGraphType = "website",
  noIndex = false,
}) => ({
  title,
  description,
  keywords,
  alternates: {
    canonical: toAbsoluteUrl(path),
  },
  openGraph: {
    type: openGraphType,
    locale: "ko_KR",
    title,
    description,
    siteName: CHURCH_NAME,
    url: toAbsoluteUrl(path),
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_IMAGE],
  },
  robots: noIndex
    ? {
        index: false,
        follow: true,
      }
    : undefined,
});

const extractText = (node) => {
  if (!node) {
    return "";
  }
  if (typeof node.value === "string") {
    return node.value;
  }
  if (Array.isArray(node.content)) {
    return node.content.map(extractText).join(" ");
  }
  return "";
};

export const getArticleDescription = (article, fallback) => {
  const paragraph = article?.fields?.paragraph;
  const rawText = extractText(paragraph).replace(/\s+/g, " ").trim();
  if (!rawText) {
    return fallback;
  }
  return rawText.slice(0, 140);
};

export const SEO_KEYWORDS = {
  home: [
    CHURCH_NAME,
    "의왕 새롬교회",
    "예배 안내",
    "교회소식",
    CHURCH_LOCATION,
  ],
  news: [CHURCH_NAME, "교회소식", "공지", "교회 행사"],
  sermons: [CHURCH_NAME, "설교영상", "주일예배"],
  about: [CHURCH_NAME, "교회소개"],
  time: [
    CHURCH_NAME,
    "예배 시간",
    "주일 예배",
    "수요 예배",
    "주일학교",
    "청년부",
  ],
  location: [CHURCH_NAME, "오시는 길", "교회 위치", CHURCH_LOCATION],
};
