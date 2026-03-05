import { SITE_METADATA } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { getArticles } from "@/lib/contentful";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getMovieContentPath(id: string): string {
  return `${ProjectUrl.contents.movies.toString()}/${id}`;
}

export async function GET() {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.movies });

  const items = articles
    .map((article) => {
      const id = article?.sys?.id;
      const title = article?.fields?.title;
      if (!id || !title) {
        return "";
      }

      const path = getMovieContentPath(id);
      const link = `${SITE_METADATA.baseUrl}${path}`;
      const pubDate = new Date(
        article.sys.updatedAt || article.sys.createdAt,
      ).toUTCString();

      // TODO: apply excerpt to description
      return `
      <item>
        <title>${escapeXml(title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
      </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_METADATA.siteName)}</title>
    <link>${SITE_METADATA.baseUrl}</link>
    <description>${escapeXml(SITE_METADATA.description)}</description>
    <language>ko</language>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
