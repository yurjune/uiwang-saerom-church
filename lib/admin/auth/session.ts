import { createHmac, createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE_NAME = "church_admin_session";

const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 8;

type AdminSessionPayload = {
  role: "admin";
  exp: number;
};

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

function getSessionSecret(): string {
  return (process.env.ADMIN_SESSION_SECRET ?? getAdminPassword()).trim();
}

function hash(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminPassword() && getSessionSecret());
}

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return false;
  }

  return timingSafeEqual(hash(password), hash(adminPassword));
}

export function createAdminSessionToken(now = Date.now()): string {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET 또는 ADMIN_PASSWORD 환경변수가 필요합니다.",
    );
  }

  const payload: AdminSessionPayload = {
    role: "admin",
    exp: Math.floor(now / 1000) + ADMIN_SESSION_DURATION_SECONDS,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload, secret)}`;
}

export function verifyAdminSessionToken(
  token: string | undefined,
  now = Date.now(),
): boolean {
  const secret = getSessionSecret();
  if (!token || !secret) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = sign(encodedPayload, secret);
  if (!timingSafeEqual(hash(signature), hash(expectedSignature))) {
    return false;
  }

  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(
      decodeBase64Url(encodedPayload),
    ) as AdminSessionPayload;
  } catch {
    return false;
  }

  const nowSeconds = Math.floor(now / 1000);
  return payload.role === "admin" && payload.exp > nowSeconds;
}

export function getAdminSessionMaxAge(): number {
  return ADMIN_SESSION_DURATION_SECONDS;
}
