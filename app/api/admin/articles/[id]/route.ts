import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminUnauthorizedResponse,
  isAdminRequest,
} from "@/lib/admin/auth/guard";
import {
  getAdminAssetIds,
  parseAdminArticleFormData,
  toContentfulArticleFields,
} from "@/lib/admin/contentful/articlePayload";
import {
  getContentfulArticle,
  unpublishContentfulArticle,
  updateContentfulArticle,
} from "@/lib/admin/contentful/management";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function revalidateArticle(id: string) {
  revalidateTag("articles", "max");
  revalidateTag(`article:${id}`, "max");
}

export async function GET(
  req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const { id } = await context.params;
    const article = await getContentfulArticle(id);

    return NextResponse.json({ ok: true, article });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "게시글을 불러오지 못했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const { id } = await context.params;
    const formData = await req.formData();
    const payload = parseAdminArticleFormData(formData);
    const assetIds = getAdminAssetIds(formData);
    const entry = await updateContentfulArticle(
      id,
      toContentfulArticleFields(payload, assetIds, {
        updateImages: formData.get("updateImages") === "true",
      }),
    );

    revalidateArticle(entry.sys.id);

    return NextResponse.json({
      ok: true,
      id: entry.sys.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "게시글 수정에 실패했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const { id } = await context.params;
    await unpublishContentfulArticle(id);

    revalidateArticle(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "게시글 숨기기에 실패했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
