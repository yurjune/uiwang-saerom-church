import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionMaxAge,
  isAdminAuthConfigured,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from "@/lib/admin/auth/session";

export const runtime = "nodejs";

type LoginBody = {
  password?: unknown;
};

function createUnauthorizedResponse(): NextResponse {
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  return NextResponse.json({
    authenticated: verifyAdminSessionToken(token),
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { authenticated: false, message: "Admin auth is not configured" },
      { status: 500 },
    );
  }

  let body: LoginBody = {};
  try {
    body = (await req.json()) as LoginBody;
  } catch {
    body = {};
  }

  if (typeof body.password !== "string") {
    return createUnauthorizedResponse();
  }

  if (!verifyAdminPassword(body.password)) {
    return createUnauthorizedResponse();
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: createAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });

  return response;
}

export async function DELETE(): Promise<NextResponse> {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
