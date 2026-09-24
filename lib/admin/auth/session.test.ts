import { afterEach, describe, expect, it } from "vitest";
import {
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from "@/lib/admin/auth/session";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("admin session", () => {
  it("환경변수 비밀번호를 검증한다", () => {
    process.env.ADMIN_PASSWORD = "secret";
    process.env.ADMIN_SESSION_SECRET = "session-secret";

    expect(isAdminAuthConfigured()).toBe(true);
    expect(verifyAdminPassword("secret")).toBe(true);
    expect(verifyAdminPassword("wrong")).toBe(false);
  });

  it("서명된 관리자 세션 토큰을 검증한다", () => {
    process.env.ADMIN_PASSWORD = "secret";
    process.env.ADMIN_SESSION_SECRET = "session-secret";
    const now = new Date("2026-09-25T00:00:00.000Z").getTime();

    const token = createAdminSessionToken(now);

    expect(verifyAdminSessionToken(token, now)).toBe(true);
    expect(verifyAdminSessionToken(`${token}tampered`, now)).toBe(false);
  });

  it("만료된 세션 토큰은 거부한다", () => {
    process.env.ADMIN_PASSWORD = "secret";
    process.env.ADMIN_SESSION_SECRET = "session-secret";
    const now = new Date("2026-09-25T00:00:00.000Z").getTime();
    const token = createAdminSessionToken(now);

    expect(verifyAdminSessionToken(token, now + 1000 * 60 * 60 * 9)).toBe(
      false,
    );
  });
});
