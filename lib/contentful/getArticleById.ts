import { cacheLife, cacheTag } from "next/cache";
import type { ArticleDetail, ArticleSkeleton } from "@/interface/article";
import { SIX_MONTHS_IN_SECONDS } from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import { getArticleTag } from "@/lib/contentful/tags";
import { toArticleDetail } from "@/lib/contentful/transformers";

export async function getArticleById(
  id: string,
): Promise<ArticleDetail | undefined> {
  "use cache";
  cacheLife({ revalidate: SIX_MONTHS_IN_SECONDS });
  cacheTag(getArticleTag(id));

  const article = await client.getEntries<ArticleSkeleton>({
    content_type: "article",
    "sys.id": id,
  });
  return article.items[0] ? toArticleDetail(article.items[0]) : undefined;
}
