import { CONTENTFUL_CATEGORY } from "../constants/category";
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
      url: `${SITE_URL}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/movies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
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
          url: `${SITE_URL}/contents/news/${id}`,
          lastModified: article.sys.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      }
      if (category === CONTENTFUL_CATEGORY.movies) {
        return {
          url: `${SITE_URL}/contents/movies/${id}`,
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
