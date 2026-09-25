import { createClient } from "contentful";

function getRequiredEnv(name: string): string {
  const value = (process.env[name] ?? "").trim();
  if (!value) {
    throw new Error(`${name} 환경변수가 필요합니다.`);
  }

  return value;
}

export const client = createClient({
  space: getRequiredEnv("CONTENTFUL_SPACE_ID"),
  accessToken: getRequiredEnv("CONTENTFUL_ACCESS_KEY"),
});
