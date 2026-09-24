import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT_DIR = process.cwd();
const API_ENV_PATH = path.join(ROOT_DIR, "apps/api/.env");
const WEB_ENV_PATH = path.join(ROOT_DIR, "apps/web/.env");
const ARTICLE_CONTENT_TYPE = "article";
const TEST_VIDEO_URL = "https://www.youtube.com/embed/YATPaLsfT08";
const TEST_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64",
);

function parseEnvFile(text) {
  return Object.fromEntries(
    text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const [key, ...rest] = line.split("=");
        return [key, rest.join("=").replace(/^['"]|['"]$/g, "")];
      }),
  );
}

async function loadEnv() {
  const envEntries = await Promise.allSettled([
    readFile(API_ENV_PATH, "utf8"),
    readFile(WEB_ENV_PATH, "utf8"),
  ]);

  for (const result of envEntries) {
    if (result.status === "fulfilled") {
      Object.assign(process.env, parseEnvFile(result.value));
    }
  }
}

function requiredEnv(name, fallback = "") {
  const value = (process.env[name] ?? fallback).trim();
  if (!value) {
    throw new Error(`${name} 환경변수가 필요합니다.`);
  }
  return value;
}

function getArgValue(name) {
  const prefix = `${name}=`;
  return process.argv
    .find((arg) => arg.startsWith(prefix))
    ?.slice(prefix.length);
}

function createYouTubeParagraphDocument(embedUrl) {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [
          {
            nodeType: "hyperlink",
            data: {
              uri: embedUrl,
            },
            content: [
              {
                nodeType: "text",
                value: embedUrl,
                marks: [],
                data: {},
              },
            ],
          },
        ],
      },
    ],
  };
}

function createEmptyDocument() {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [
          {
            nodeType: "text",
            value: "",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
}

function createAssetDocument(assetId) {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "embedded-asset-block",
        data: {
          target: {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: assetId,
            },
          },
        },
        content: [],
      },
    ],
  };
}

async function cmaFetch({
  spaceId,
  environmentId,
  token,
  pathname,
  init = {},
}) {
  const response = await fetch(
    `https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}${pathname}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
        ...init.headers,
      },
    },
  );

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (
      response.status === 401 &&
      text.includes("OrganizationAccessGrantRequired")
    ) {
      throw new Error(
        [
          "Contentful Management Token에 이 space의 organization 접근 권한이 없습니다.",
          "Contentful에서 organization 접근이 허용된 Management Token을 다시 발급해 CONTENTFUL_MANAGEMENT_TOKEN에 설정해주세요.",
          `원본 응답: ${text}`,
        ].join("\n"),
      );
    }

    throw new Error(
      `Contentful CMA 요청 실패: ${response.status} ${response.statusText}\n${text}`,
    );
  }

  return body;
}

async function uploadFetch({ spaceId, token, pathname, init = {} }) {
  const response = await fetch(
    `https://upload.contentful.com/spaces/${spaceId}${pathname}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
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

  return body;
}

async function publishEntry(config, entry) {
  return cmaFetch({
    ...config,
    pathname: `/entries/${entry.sys.id}/published`,
    init: {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(entry.sys.version),
      },
    },
  });
}

async function unpublishEntry(config, entry) {
  return cmaFetch({
    ...config,
    pathname: `/entries/${entry.sys.id}/published`,
    init: {
      method: "DELETE",
      headers: {
        "X-Contentful-Version": String(entry.sys.version),
      },
    },
  });
}

async function deleteEntry(config, entry) {
  await cmaFetch({
    ...config,
    pathname: `/entries/${entry.sys.id}`,
    init: {
      method: "DELETE",
      headers: {
        "X-Contentful-Version": String(entry.sys.version),
      },
    },
  });
}

async function getEntry(config, entryId) {
  return cmaFetch({
    ...config,
    pathname: `/entries/${entryId}`,
  });
}

async function publishAsset(config, asset) {
  return cmaFetch({
    ...config,
    pathname: `/assets/${asset.sys.id}/published`,
    init: {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(asset.sys.version),
      },
    },
  });
}

async function unpublishAsset(config, asset) {
  return cmaFetch({
    ...config,
    pathname: `/assets/${asset.sys.id}/published`,
    init: {
      method: "DELETE",
      headers: {
        "X-Contentful-Version": String(asset.sys.version),
      },
    },
  });
}

async function deleteAsset(config, asset) {
  await cmaFetch({
    ...config,
    pathname: `/assets/${asset.sys.id}`,
    init: {
      method: "DELETE",
      headers: {
        "X-Contentful-Version": String(asset.sys.version),
      },
    },
  });
}

async function getAsset(config, assetId) {
  return cmaFetch({
    ...config,
    pathname: `/assets/${assetId}`,
  });
}

async function waitForProcessedAsset(config, assetId, locale) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const asset = await getAsset(config, assetId);
    if (asset.fields?.file?.[locale]?.url) {
      return asset;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Contentful Asset 처리가 시간 내에 완료되지 않았습니다.");
}

async function createTestAsset(config, locale, title) {
  const upload = await uploadFetch({
    ...config,
    pathname: "/uploads",
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: TEST_PNG,
    },
  });
  console.log(`created upload: ${upload.sys.id}`);

  let asset = await cmaFetch({
    ...config,
    pathname: "/assets",
    init: {
      method: "POST",
      body: JSON.stringify({
        fields: {
          title: {
            [locale]: title,
          },
          file: {
            [locale]: {
              contentType: "image/png",
              fileName: "contentful-write-test.png",
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
    },
  });
  console.log(`created draft asset: ${asset.sys.id}`);

  await cmaFetch({
    ...config,
    pathname: `/assets/${asset.sys.id}/files/${locale}/process`,
    init: {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(asset.sys.version),
      },
    },
  });
  asset = await waitForProcessedAsset(config, asset.sys.id, locale);
  console.log(`processed asset: ${asset.sys.id}`);

  asset = await publishAsset(config, asset);
  console.log(`published asset: ${asset.sys.id}`);

  return asset;
}

async function runNewsImageVerification(config, locale, title, keepEntry) {
  const asset = await createTestAsset(config, locale, `${title} 이미지`);
  let entry = await cmaFetch({
    ...config,
    pathname: "/entries",
    init: {
      method: "POST",
      headers: {
        "X-Contentful-Content-Type": ARTICLE_CONTENT_TYPE,
      },
      body: JSON.stringify({
        fields: {
          title: {
            [locale]: title,
          },
          category: {
            [locale]: "교회소식",
          },
          date: {
            [locale]: new Date().toISOString(),
          },
          paragraph: {
            [locale]: createAssetDocument(asset.sys.id),
          },
          thumbnail: {
            [locale]: {
              sys: {
                type: "Link",
                linkType: "Asset",
                id: asset.sys.id,
              },
            },
          },
        },
      }),
    },
  });
  console.log(`created news draft entry: ${entry.sys.id}`);

  entry = await publishEntry(config, entry);
  console.log(`published news entry: ${entry.sys.id}`);

  entry = await cmaFetch({
    ...config,
    pathname: `/entries/${entry.sys.id}`,
    init: {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(entry.sys.version),
        "X-Contentful-Content-Type": ARTICLE_CONTENT_TYPE,
      },
      body: JSON.stringify({
        fields: {
          ...entry.fields,
          title: {
            [locale]: `${title} 수정`,
          },
        },
      }),
    },
  });
  console.log(`updated news draft entry: ${entry.sys.id}`);

  entry = await publishEntry(config, entry);
  console.log(`republished news entry: ${entry.sys.id}`);

  if (!keepEntry) {
    entry = await unpublishEntry(config, entry);
    await deleteEntry(config, entry);
    console.log(`cleaned up news entry: ${entry.sys.id}`);

    const latestAsset = await getAsset(config, asset.sys.id);
    const unpublishedAsset = latestAsset.sys.publishedVersion
      ? await unpublishAsset(config, latestAsset)
      : latestAsset;
    await deleteAsset(config, unpublishedAsset);
    console.log(`cleaned up asset: ${asset.sys.id}`);
  } else {
    console.log(`kept news entry for manual verification: ${entry.sys.id}`);
    console.log(`kept asset for manual verification: ${asset.sys.id}`);
  }
}

async function main() {
  if (!process.env.CONFIRM_CONTENTFUL_WRITE) {
    throw new Error(
      "실제 Contentful에 테스트 entry를 생성합니다. 실행하려면 CONFIRM_CONTENTFUL_WRITE=1을 설정하세요.",
    );
  }

  await loadEnv();

  const locale = requiredEnv("CONTENTFUL_LOCALE", "ko-KR");
  const config = {
    spaceId: requiredEnv("CONTENTFUL_SPACE_ID"),
    environmentId: requiredEnv("CONTENTFUL_ENVIRONMENT_ID", "master"),
    token: requiredEnv("CONTENTFUL_MANAGEMENT_TOKEN"),
  };
  const deleteEntryId = getArgValue("--delete-entry");
  if (deleteEntryId) {
    let entry = await getEntry(config, deleteEntryId);
    if (entry.sys.publishedVersion) {
      entry = await unpublishEntry(config, entry);
      console.log(`unpublished entry: ${entry.sys.id}`);
    }
    await deleteEntry(config, entry);
    console.log(`deleted entry: ${entry.sys.id}`);
    return;
  }
  const deleteAssetId = getArgValue("--delete-asset");
  if (deleteAssetId) {
    let asset = await getAsset(config, deleteAssetId);
    if (asset.sys.publishedVersion) {
      asset = await unpublishAsset(config, asset);
      console.log(`unpublished asset: ${asset.sys.id}`);
    }
    await deleteAsset(config, asset);
    console.log(`deleted asset: ${asset.sys.id}`);
    return;
  }

  const keepEntry = process.argv.includes("--keep");
  const verifyNewsImage = process.argv.includes("--news-image");
  const title =
    getArgValue("--title") ?? `[CMA 검증] ${new Date().toISOString()}`;

  if (verifyNewsImage) {
    await runNewsImageVerification(config, locale, title, keepEntry);
    return;
  }

  let entry = await cmaFetch({
    ...config,
    pathname: "/entries",
    init: {
      method: "POST",
      headers: {
        "X-Contentful-Content-Type": ARTICLE_CONTENT_TYPE,
      },
      body: JSON.stringify({
        fields: {
          title: {
            [locale]: title,
          },
          category: {
            [locale]: "설교영상",
          },
          date: {
            [locale]: new Date().toISOString(),
          },
          tag: {
            [locale]: ["검증"],
          },
          paragraph: {
            [locale]: createYouTubeParagraphDocument(TEST_VIDEO_URL),
          },
        },
      }),
    },
  });
  console.log(`created draft entry: ${entry.sys.id}`);

  entry = await publishEntry(config, entry);
  console.log(`published entry: ${entry.sys.id}`);

  entry = await cmaFetch({
    ...config,
    pathname: `/entries/${entry.sys.id}`,
    init: {
      method: "PUT",
      headers: {
        "X-Contentful-Version": String(entry.sys.version),
        "X-Contentful-Content-Type": ARTICLE_CONTENT_TYPE,
      },
      body: JSON.stringify({
        fields: {
          ...entry.fields,
          title: {
            [locale]: `${title} 수정`,
          },
        },
      }),
    },
  });
  console.log(`updated draft entry: ${entry.sys.id}`);

  entry = await publishEntry(config, entry);
  console.log(`republished entry: ${entry.sys.id}`);

  if (!keepEntry) {
    entry = await unpublishEntry(config, entry);
    await deleteEntry(config, entry);
    console.log(`cleaned up entry: ${entry.sys.id}`);
  } else {
    console.log(`kept entry for manual verification: ${entry.sys.id}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
