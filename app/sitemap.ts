import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { getArticles } from "@/lib/contentful";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_METADATA.baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_METADATA.baseUrl}${ProjectUrl.news.toString()}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_METADATA.baseUrl}${ProjectUrl.movies.toString()}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_METADATA.baseUrl}/${ProjectUrl.introduce.about.toString()}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_METADATA.baseUrl}/${ProjectUrl.introduce.time.toString()}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_METADATA.baseUrl}/${ProjectUrl.introduce.location.toString()}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const { articles } = await getArticles();

  const dynamicPages = articles
    .map((article): MetadataRoute.Sitemap[number] | null => {
      const id = article?.sys?.id;
      const category = article?.fields?.category;
      if (!id) return null;

      if (category === CONTENTFUL_CATEGORY.news) {
        return {
          url: `${SITE_METADATA.baseUrl}${ProjectUrl.contents.news.toString()}/${id}`,
          lastModified: article.sys.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      }
      if (category === CONTENTFUL_CATEGORY.movies) {
        return {
          url: `${SITE_METADATA.baseUrl}${ProjectUrl.contents.movies.toString()}/${id}`,
          lastModified: article.sys.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      }

      return null;
    })
    .filter((page): page is MetadataRoute.Sitemap[number] => page !== null);

  return [...staticPages, ...dynamicPages];
}
