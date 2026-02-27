import { CHURCH_NAME } from "../constants";

export const SITE_URL = "https://www.uwsch.org";
export const SITE_IMAGE = "/logo.jpg";
export const SITE_ICON = "/favicon.ico";
export const SITE_DESCRIPTION = `${CHURCH_NAME} 홈페이지입니다. 예배 안내, 교회소식, 설교영상을 확인할 수 있습니다.`;

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

export const getArticleDescription = (article, fallback = "") => {
  const paragraph = article?.fields?.paragraph;
  const rawText = extractText(paragraph).replace(/\s+/g, " ").trim();
  return rawText ? rawText.slice(0, 140) : fallback;
};
