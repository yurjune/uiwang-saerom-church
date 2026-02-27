import { categoryMap, CONTENTFUL_CATEGORY } from "../constants/category";
import { getArticles } from "../lib/contentful";
import { SITE_URL } from "../lib/seo";

export default async function sitemap() {
  const now = new Date();
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${categoryMap[CONTENTFUL_CATEGORY.news].url}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${categoryMap[CONTENTFUL_CATEGORY.movies].url}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/introduce/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/introduce/time`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/introduce/location`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const articles = await getArticles();
  const dynamicPages = articles
    .map((article) => {
      const id = article?.sys?.id;
      const category = article?.fields?.category;
      if (!id) {
        return null;
      }
      if (category === CONTENTFUL_CATEGORY.news) {
        return {
          url: `${SITE_URL}${categoryMap[CONTENTFUL_CATEGORY.news].contentUrl}/${id}`,
          lastModified: article.sys.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      }
      if (category === CONTENTFUL_CATEGORY.movies) {
        return {
          url: `${SITE_URL}${categoryMap[CONTENTFUL_CATEGORY.movies].contentUrl}/${id}`,
          lastModified: article.sys.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      }
      return null;
    })
    .filter(Boolean);

  return [...staticPages, ...dynamicPages];
}
