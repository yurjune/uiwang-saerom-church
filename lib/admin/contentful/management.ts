import { CONTENTFUL_CATEGORY } from "@/constants/category";
import {
  categoryToContentType,
  MOVIE_CONTENT_TYPE,
  NEWS_CONTENT_TYPE,
} from "@/lib/contentful/contentTypes";

const DEFAULT_ENVIRONMENT_ID = "master";
const DEFAULT_LOCALE = "ko";

type ContentfulSys = {
  sys: {
    id: string;
    version: number;
    publishedVersion?: number;
    contentType?: { sys: { id: string } };
  };
};

type LocalizedEntry = ContentfulSys & {
  fields: Record<string, Record<string, unknown> | undefined>;
};

type ArticleFields = {
  title: string;
  category: string;
  date: string;
  movieType?: string;
  newsType?: string;
  youtubeUrl?: string;
  tag?: string[];
  thumbnailTitle?: string;
  thumbnailBible?: string;
  // undefined면 이미지를 건드리지 않고, 빈 배열이면 모두 뺀다.
  imageAssetIds?: string[];
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

function toAssetLink(assetId: string) {
  return {
    sys: {
      type: "Link",
      linkType: "Asset",
      id: assetId,
    },
  };
}

function toLocalizedFields(config: ManagementConfig, fields: ArticleFields) {
  // category는 콘텐츠 모델(movie/news)로 구분하므로 필드로 저장하지 않는다.
  const { category: _category, imageAssetIds, ...values } = fields;
  const localizedFields: Record<string, Record<string, unknown>> = {};

  for (const [fieldId, value] of Object.entries(values)) {
    if (value !== undefined && value !== "") {
      localizedFields[fieldId] = { [config.locale]: value };
    }
  }

  if (imageAssetIds && imageAssetIds.length > 0) {
    localizedFields.images = {
      [config.locale]: imageAssetIds.map(toAssetLink),
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
      "X-Contentful-Content-Type": categoryToContentType(fields.category),
    },
    body: JSON.stringify({
      fields: toLocalizedFields(config, fields),
    }),
  });

  return publishEntry(config, entry);
}

type AssetLinkLike = { sys?: { id?: string } };

function toAssetIds(links: AssetLinkLike[]) {
  return links
    .map((link) => link.sys?.id)
    .filter((id): id is string => typeof id === "string");
}

function getLinkedAssetIds(config: ManagementConfig, entry: LocalizedEntry) {
  const images = (entry.fields.images?.[config.locale] ??
    []) as AssetLinkLike[];
  const thumbnail = entry.fields.thumbnail?.[config.locale] as
    | AssetLinkLike
    | undefined;

  return toAssetIds([...images, ...(thumbnail ? [thumbnail] : [])]);
}

// 더 이상 어떤 entry에서도 참조하지 않는 asset만 지운다. 실패해도 게시글 작업은 성공으로 본다.
async function deleteOrphanAssets(
  config: ManagementConfig,
  assetIds: string[],
) {
  await Promise.allSettled(
    [...new Set(assetIds)].map(async (assetId) => {
      const links = await cmaFetch<{ total: number }>(
        config,
        `/entries?links_to_asset=${encodeURIComponent(assetId)}&limit=0`,
      );
      if (links.total === 0) {
        await deleteContentfulAsset(assetId);
      }
    }),
  );
}

async function getEntry(config: ManagementConfig, entryId: string) {
  return cmaFetch<LocalizedEntry>(
    config,
    `/entries/${encodeURIComponent(entryId)}`,
  );
}

// 관리자 화면은 movie/news 모델만 다룬다. 기존 article 모델은 데이터 이전 후 사라진다.
async function getArticleEntry(config: ManagementConfig, entryId: string) {
  const entry = await getEntry(config, entryId);
  const contentType = entry.sys.contentType?.sys.id;
  if (contentType !== MOVIE_CONTENT_TYPE && contentType !== NEWS_CONTENT_TYPE) {
    throw new Error(
      "새 콘텐츠 모델(movie/news)로 옮겨지지 않은 게시글은 수정할 수 없습니다.",
    );
  }

  return {
    entry,
    category:
      contentType === MOVIE_CONTENT_TYPE
        ? CONTENTFUL_CATEGORY.movies
        : CONTENTFUL_CATEGORY.news,
  };
}

export type AdminArticleImage = {
  id: string;
  url: string;
  name: string;
};

export type AdminArticleDetail = {
  id: string;
  category: string;
  title: string;
  date: string | null;
  movieType: string | null;
  newsType: string | null;
  tags: string[];
  thumbnailTitle: string | null;
  thumbnailBible: string | null;
  youtubeUrl: string | null;
  images: AdminArticleImage[];
};

async function getAdminArticleImages(
  config: ManagementConfig,
  assetIds: string[],
): Promise<AdminArticleImage[]> {
  if (assetIds.length === 0) {
    return [];
  }

  const assets = await cmaFetch<{
    items: Array<
      ContentfulSys & {
        fields: {
          title?: Record<string, string>;
          file?: Record<string, { url?: string; fileName?: string }>;
        };
      }
    >;
  }>(config, `/assets?sys.id[in]=${assetIds.join(",")}`);

  return assetIds.flatMap((assetId) => {
    const asset = assets.items.find((item) => item.sys.id === assetId);
    const file = asset?.fields.file?.[config.locale];
    if (!file?.url) {
      return [];
    }
    return [
      {
        id: assetId,
        url: `https:${file.url}`,
        name: asset?.fields.title?.[config.locale] ?? file.fileName ?? assetId,
      },
    ];
  });
}

export async function getContentfulArticle(
  entryId: string,
): Promise<AdminArticleDetail> {
  const config = getManagementConfig();
  const { entry, category } = await getArticleEntry(config, entryId);
  const read = <T>(fieldId: string) =>
    entry.fields[fieldId]?.[config.locale] as T | undefined;

  return {
    id: entry.sys.id,
    category,
    title: read<string>("title") ?? "",
    date: read<string>("date") ?? null,
    movieType: read<string>("movieType") ?? null,
    newsType: read<string>("newsType") ?? null,
    tags: read<string[]>("tag") ?? [],
    thumbnailTitle: read<string>("thumbnailTitle") ?? null,
    thumbnailBible: read<string>("thumbnailBible") ?? null,
    youtubeUrl: read<string>("youtubeUrl") ?? null,
    images: await getAdminArticleImages(
      config,
      toAssetIds(read<AssetLinkLike[]>("images") ?? []),
    ),
  };
}

export async function updateContentfulArticle(
  entryId: string,
  fields: ArticleFields,
) {
  const config = getManagementConfig();
  const { entry: currentEntry, category } = await getArticleEntry(
    config,
    entryId,
  );
  if (category !== fields.category) {
    throw new Error("게시글 카테고리는 바꿀 수 없습니다.");
  }
  const previousAssetIds = getLinkedAssetIds(config, currentEntry);

  const localizedFields = {
    ...currentEntry.fields,
    ...toLocalizedFields(config, fields),
  };
  // 비워서 저장한 선택 필드는 기존 값도 지운다.
  if (category === CONTENTFUL_CATEGORY.movies) {
    if (!fields.thumbnailTitle) {
      delete localizedFields.thumbnailTitle;
    }
    if (!fields.thumbnailBible) {
      delete localizedFields.thumbnailBible;
    }
  }
  if (fields.imageAssetIds?.length === 0) {
    delete localizedFields.images;
  }

  const entry = await cmaFetch<LocalizedEntry>(
    config,
    `/entries/${encodeURIComponent(entryId)}`,
    {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(currentEntry.sys.version),
      },
      body: JSON.stringify({
        fields: localizedFields,
      }),
    },
  );

  const publishedEntry = await publishEntry(config, entry);
  const nextAssetIds = new Set(getLinkedAssetIds(config, entry));
  await deleteOrphanAssets(
    config,
    previousAssetIds.filter((assetId) => !nextAssetIds.has(assetId)),
  );

  return publishedEntry;
}

// 사이트에서만 내리고 Contentful에는 초안으로 남겨, 필요하면 다시 게시할 수 있게 한다.
export async function unpublishContentfulArticle(entryId: string) {
  const config = getManagementConfig();
  const entry = await getEntry(config, entryId);

  if (!entry.sys.publishedVersion) {
    return;
  }

  await cmaFetch<unknown>(
    config,
    `/entries/${encodeURIComponent(entryId)}/published`,
    { method: "DELETE" },
  );
}
