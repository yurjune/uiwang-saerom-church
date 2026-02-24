import { NextResponse } from "next/server";

const DEPLOY_HOOK_URL =
  process.env.VERCEL_DEPLOY_HOOK_URL ||
  "https://api.vercel.com/v1/integrations/deploy/prj_sEkzsWr1gl1n20SMMn07FUfWkDxK/mZI1kh4i2p";

function withCors(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

async function triggerDeploy() {
  const upstream = await fetch(DEPLOY_HOOK_URL, { method: "POST", cache: "no-store" });

  if (!upstream.ok) {
    return withCors(
      NextResponse.json(
        { message: "Deploy trigger failed", status: upstream.status },
        { status: upstream.status },
      ),
    );
  }

  return withCors(NextResponse.json({ message: "Deploy triggered" }));
}

export async function GET() {
  return triggerDeploy();
}

export async function POST() {
  return triggerDeploy();
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}
