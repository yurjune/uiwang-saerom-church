import { cacheLife, cacheTag } from "next/cache";
import type { ArticleEntry, ArticleSkeleton } from "@/interface/article";
import { SIX_MONTHS_IN_SECONDS } from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import { getArticleTag } from "@/lib/contentful/tags";

export async function getArticleById(
  id: string,
): Promise<ArticleEntry | undefined> {
  "use cache";
  cacheLife({ revalidate: SIX_MONTHS_IN_SECONDS });
  cacheTag(getArticleTag(id));

  const article = await client.getEntries<ArticleSkeleton>({
    content_type: "article",
    "sys.id": id,
  });
  return article.items[0];
}
