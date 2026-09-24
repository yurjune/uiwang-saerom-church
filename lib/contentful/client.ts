import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "contentful";

function loadLocalContentfulEnv() {
  const hasContentfulEnv =
    process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_KEY;
  if (hasContentfulEnv) {
    return;
  }

  loadEnvConfig(path.join(process.cwd(), "apps/web"));
}

function getRequiredEnv(name: string): string {
  const value = (process.env[name] ?? "").trim();
  if (!value) {
    throw new Error(`${name} 환경변수가 필요합니다.`);
  }

  return value;
}

loadLocalContentfulEnv();

export const client = createClient({
  space: getRequiredEnv("CONTENTFUL_SPACE_ID"),
  accessToken: getRequiredEnv("CONTENTFUL_ACCESS_KEY"),
});
