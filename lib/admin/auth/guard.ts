import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/admin/auth/session";

export function isAdminRequest(req: NextRequest): boolean {
  return verifyAdminSessionToken(
    req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value,
  );
}

export function createAdminUnauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { ok: false, message: "Admin authentication required" },
    { status: 401 },
  );
}
