import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminUnauthorizedResponse,
  isAdminRequest,
} from "@/lib/admin/auth/guard";
import {
  parseAdminArticleFormData,
  toContentfulArticleFields,
} from "@/lib/admin/contentful/articlePayload";
import {
  createContentfulAsset,
  updateContentfulArticle,
} from "@/lib/admin/contentful/management";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getImageFile(formData: FormData): File | undefined {
  const file = formData.get("image");
  return file instanceof File && file.size > 0 ? file : undefined;
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
    const imageFile = getImageFile(formData);
    const thumbnailAssetId = imageFile
      ? await createContentfulAsset(imageFile)
      : undefined;
    const entry = await updateContentfulArticle(
      id,
      toContentfulArticleFields(payload, thumbnailAssetId),
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
