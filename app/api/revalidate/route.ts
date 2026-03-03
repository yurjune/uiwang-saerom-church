import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ProjectUrl } from "@/constants/projectUrl";

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

  const entryId = (body.sys?.id ?? "").trim();
  // always revalidate /movies and /news
  const paths = [ProjectUrl.movies.toString(), ProjectUrl.news.toString()];
  if (entryId) {
    paths.push(`${ProjectUrl.contents.movies.toString()}/${entryId}`);
    paths.push(`${ProjectUrl.contents.news.toString()}/${entryId}`);
  }

  for (const path of new Set(paths)) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: paths,
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
