import { cacheLife, cacheTag } from "next/cache";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import type { ArticleDetail } from "@/lib/contentful/article";
import { THIRTY_DAYS_IN_SECONDS } from "@/lib/contentful/constants";
import { getArticleById } from "@/lib/contentful/getArticleById";
import { getArticles } from "@/lib/contentful/getArticles";

export async function getLatestBulletin(): Promise<ArticleDetail | undefined> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { articles } = await getArticles({
    category: CONTENTFUL_CATEGORY.news,
    newsType: "주보",
    limit: 1,
  });
  const latestBulletin = articles[0];

  return latestBulletin ? getArticleById(latestBulletin.sys.id) : undefined;
}
