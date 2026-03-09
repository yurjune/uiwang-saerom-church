export function getArticleTag(id: string): string {
  return `article:${id}`;
}

export function getArticleCategoryTag(category?: string): string {
  return category ? `articles:${category}` : "articles";
}
