import { refresh, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  sys?: {
    id?: string;
  };
};

function getSecretFromHeaders(req: NextRequest): string {
  const secretHeader = req.headers.get("x-revalidate-secret");
  return secretHeader?.trim() ?? "";
}

async function handleRevalidate(
  req: NextRequest,
  body: RevalidateBody = {},
): Promise<NextResponse> {
  const secret = getSecretFromHeaders(req);
  const expectedSecret = (process.env.REVALIDATE_SECRET ?? "").trim();
  const secretInvalid = !expectedSecret || secret !== expectedSecret;
  if (secretInvalid) {
    return NextResponse.json(
      { ok: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  const revalidated = ["articles"];
  revalidateTag("articles", "max");

  const entryId = (body.sys?.id ?? "").trim();
  if (entryId) {
    revalidateTag(`article:${entryId}`, "max");
    revalidated.push(`article:${entryId}`);
  }

  refresh();

  return NextResponse.json({
    ok: true,
    revalidated,
  });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleRevalidate(req);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: RevalidateBody = {};

  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  return handleRevalidate(req, body);
}
