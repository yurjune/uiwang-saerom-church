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
import { updateContentfulArticle } from "@/lib/admin/contentful/management";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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
      toContentfulArticleFields(payload, assetIds),
    );

    revalidateTag("articles", "max");
    revalidateTag(`article:${entry.sys.id}`, "max");

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
