import type { Document } from "@contentful/rich-text-types";
import { CONTENTFUL_CATEGORY } from "@/constants/category";

const ARTICLE_CONTENT_TYPE = "article";
const DEFAULT_ENVIRONMENT_ID = "master";
const DEFAULT_LOCALE = "ko";

type ContentfulSys = {
  sys: {
    id: string;
    version: number;
    publishedVersion?: number;
  };
};

type ArticleFields = {
  title: string;
  category: string;
  date: string;
  movieType?: string;
  tag?: string[];
  thumbnailTitle?: string;
  thumbnailBible?: string;
  paragraph?: Document;
  thumbnailAssetId?: string;
};

type ManagementConfig = {
  spaceId: string;
  environmentId: string;
  token: string;
  locale: string;
};

function getManagementConfig(): ManagementConfig {
  const spaceId = (process.env.CONTENTFUL_SPACE_ID ?? "").trim();
  const token = (process.env.CONTENTFUL_MANAGEMENT_TOKEN ?? "").trim();

  if (!spaceId) {
    throw new Error("CONTENTFUL_SPACE_ID 환경변수가 필요합니다.");
  }
  if (!token) {
    throw new Error("CONTENTFUL_MANAGEMENT_TOKEN 환경변수가 필요합니다.");
  }

  return {
    spaceId,
    environmentId:
      (process.env.CONTENTFUL_ENVIRONMENT_ID ?? "").trim() ||
      DEFAULT_ENVIRONMENT_ID,
    token,
    locale: (process.env.CONTENTFUL_LOCALE ?? "").trim() || DEFAULT_LOCALE,
  };
}

function toLocalizedFields(config: ManagementConfig, fields: ArticleFields) {
  const localizedFields: Record<string, Record<string, unknown>> = {
    title: {
      [config.locale]: fields.title,
    },
    category: {
      [config.locale]: fields.category,
    },
    date: {
      [config.locale]: fields.date,
    },
  };

  if (fields.movieType) {
    localizedFields.movieType = {
      [config.locale]: fields.movieType,
    };
  }

  if (fields.tag) {
    localizedFields.tag = {
      [config.locale]: fields.tag,
    };
  }

  if (fields.thumbnailTitle) {
    localizedFields.thumbnailTitle = {
      [config.locale]: fields.thumbnailTitle,
    };
  }

  if (fields.thumbnailBible) {
    localizedFields.thumbnailBible = {
      [config.locale]: fields.thumbnailBible,
    };
  }

  if (fields.paragraph) {
    localizedFields.paragraph = {
      [config.locale]: fields.paragraph,
    };
  }

  if (fields.thumbnailAssetId) {
    localizedFields.thumbnail = {
      [config.locale]: {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: fields.thumbnailAssetId,
        },
      },
    };
  }

  return localizedFields;
}

async function cmaFetch<T>(
  config: ManagementConfig,
  pathname: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    `https://api.contentful.com/spaces/${config.spaceId}/environments/${config.environmentId}${pathname}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
        ...init.headers,
      },
    },
  );

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      `Contentful CMA 요청 실패: ${response.status} ${response.statusText}\n${text}`,
    );
  }

  return body as T;
}

async function uploadFetch<T>(
  config: ManagementConfig,
  pathname: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    `https://upload.contentful.com/spaces/${config.spaceId}${pathname}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${config.token}`,
        ...init.headers,
      },
    },
  );

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      `Contentful Upload 요청 실패: ${response.status} ${response.statusText}\n${text}`,
    );
  }

  return body as T;
}

async function publishEntry<T extends ContentfulSys>(
  config: ManagementConfig,
  entry: T,
): Promise<T> {
  return cmaFetch<T>(config, `/entries/${entry.sys.id}/published`, {
    method: "PUT",
    headers: {
      "X-Contentful-Version": String(entry.sys.version),
    },
  });
}

async function publishAsset<T extends ContentfulSys>(
  config: ManagementConfig,
  asset: T,
): Promise<T> {
  return cmaFetch<T>(config, `/assets/${asset.sys.id}/published`, {
    method: "PUT",
    headers: {
      "X-Contentful-Version": String(asset.sys.version),
    },
  });
}

async function getAsset(config: ManagementConfig, assetId: string) {
  return cmaFetch<ContentfulSys>(config, `/assets/${assetId}`);
}

async function waitForProcessedAsset(
  config: ManagementConfig,
  assetId: string,
): Promise<ContentfulSys> {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const asset = await getAsset(config, assetId);
    const fields = (asset as any).fields;
    const fileUrl = fields?.file?.[config.locale]?.url;
    if (fileUrl) {
      return asset;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Contentful Asset 처리가 시간 내에 완료되지 않았습니다.");
}

export async function createContentfulAsset(file: File): Promise<string> {
  const config = getManagementConfig();
  const buffer = Buffer.from(await file.arrayBuffer());
  const upload = await uploadFetch<ContentfulSys>(config, "/uploads", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: buffer,
  });

  let asset = await cmaFetch<ContentfulSys>(config, "/assets", {
    method: "POST",
    body: JSON.stringify({
      fields: {
        title: {
          [config.locale]: file.name,
        },
        file: {
          [config.locale]: {
            contentType: file.type,
            fileName: file.name,
            uploadFrom: {
              sys: {
                type: "Link",
                linkType: "Upload",
                id: upload.sys.id,
              },
            },
          },
        },
      },
    }),
  });

  await cmaFetch<unknown>(
    config,
    `/assets/${asset.sys.id}/files/${config.locale}/process`,
    {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(asset.sys.version),
      },
    },
  );
  asset = await waitForProcessedAsset(config, asset.sys.id);
  asset = await publishAsset(config, asset);

  return asset.sys.id;
}

export async function deleteContentfulAsset(assetId: string) {
  const config = getManagementConfig();
  const asset = await getAsset(config, assetId);

  if (asset.sys.publishedVersion) {
    await cmaFetch<unknown>(config, `/assets/${assetId}/published`, {
      method: "DELETE",
    });
  }

  await cmaFetch<unknown>(config, `/assets/${assetId}`, {
    method: "DELETE",
  });
}

export async function createContentfulArticle(fields: ArticleFields) {
  const config = getManagementConfig();
  const entry = await cmaFetch<ContentfulSys>(config, "/entries", {
    method: "POST",
    headers: {
      "X-Contentful-Content-Type": ARTICLE_CONTENT_TYPE,
    },
    body: JSON.stringify({
      fields: toLocalizedFields(config, fields),
    }),
  });

  return publishEntry(config, entry);
}

export async function updateContentfulArticle(
  entryId: string,
  fields: ArticleFields,
) {
  const config = getManagementConfig();
  const currentEntry = await cmaFetch<ContentfulSys & { fields: unknown }>(
    config,
    `/entries/${entryId}`,
  );
  const localizedFields = {
    ...(currentEntry.fields as Record<string, unknown>),
    ...toLocalizedFields(config, fields),
  };
  if (fields.category === CONTENTFUL_CATEGORY.movies) {
    delete localizedFields.thumbnail;
    // reference는 thumbnailBible로 대체되어 Contentful에서 삭제될 필드
    delete localizedFields.reference;
    if (!fields.thumbnailTitle) {
      delete localizedFields.thumbnailTitle;
    }
    if (!fields.thumbnailBible) {
      delete localizedFields.thumbnailBible;
    }
  }

  const entry = await cmaFetch<ContentfulSys>(config, `/entries/${entryId}`, {
    method: "PUT",
    headers: {
      "X-Contentful-Version": String(currentEntry.sys.version),
      "X-Contentful-Content-Type": ARTICLE_CONTENT_TYPE,
    },
    body: JSON.stringify({
      fields: localizedFields,
    }),
  });

  return publishEntry(config, entry);
}
