import { cacheLife, cacheTag } from "next/cache";
import type {
  AnyArticleSkeleton,
  ArticleDetail,
  ArticleEntry,
} from "@/lib/contentful/article";
import { SIX_MONTHS_IN_SECONDS } from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import {
  LEGACY_ARTICLE_CONTENT_TYPE,
  MOVIE_CONTENT_TYPE,
  NEWS_CONTENT_TYPE,
} from "@/lib/contentful/contentTypes";
import { getArticleTag } from "@/lib/contentful/tags";
import { toArticleDetail } from "@/lib/contentful/transformers";

const ARTICLE_CONTENT_TYPES = new Set<string>([
  MOVIE_CONTENT_TYPE,
  NEWS_CONTENT_TYPE,
  LEGACY_ARTICLE_CONTENT_TYPE,
]);

export async function getArticleById(
  id: string,
): Promise<ArticleDetail | undefined> {
  "use cache";
  cacheLife({ revalidate: SIX_MONTHS_IN_SECONDS });
  cacheTag(getArticleTag(id));

  // 이전 전후로 같은 ID가 article 또는 movie/news 모델에 있으므로 모델을 지정하지 않고 찾는다.
  const response = await client.getEntries<AnyArticleSkeleton>({
    "sys.id": id,
  });
  const article = (response.items as ArticleEntry[]).find((item) =>
    ARTICLE_CONTENT_TYPES.has(item.sys.contentType.sys.id),
  );
  return article ? toArticleDetail(article) : undefined;
}
