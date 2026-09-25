import { CONTENTFUL_CATEGORY } from "@/constants/category";

export const MOVIE_CONTENT_TYPE = "movie";
export const NEWS_CONTENT_TYPE = "news";
export const LEGACY_ARTICLE_CONTENT_TYPE = "article";

export type ArticleContentType =
  | typeof MOVIE_CONTENT_TYPE
  | typeof NEWS_CONTENT_TYPE;

export function categoryToContentType(category: string): ArticleContentType {
  if (category === CONTENTFUL_CATEGORY.movies) {
    return MOVIE_CONTENT_TYPE;
  }
  if (category === CONTENTFUL_CATEGORY.news) {
    return NEWS_CONTENT_TYPE;
  }

  throw new Error(`지원하지 않는 카테고리입니다: ${category}`);
}

// movie/news 모델로 데이터를 옮기는 동안에는 새 모델이 비어 있으면 기존 article 모델을 읽는다.
// 이전이 끝나 article entry가 모두 사라지면 이 fallback은 항상 빈 결과를 돌려주므로 제거해도 된다.
export async function withLegacyFallback<T extends { total: number }>(
  query: () => Promise<T>,
  legacyQuery: () => Promise<T>,
): Promise<T> {
  const response = await query();
  return response.total > 0 ? response : legacyQuery();
}
