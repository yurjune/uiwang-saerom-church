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
import { createContentfulArticle } from "@/lib/admin/contentful/management";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const formData = await req.formData();
    const payload = parseAdminArticleFormData(formData);
    const assetIds = getAdminAssetIds(formData);

    const entry = await createContentfulArticle(
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
      error instanceof Error ? error.message : "게시글 생성에 실패했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
