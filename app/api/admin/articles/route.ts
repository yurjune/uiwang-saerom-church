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
  createContentfulArticle,
  createContentfulAsset,
} from "@/lib/admin/contentful/management";
import { CONTENTFUL_CATEGORY } from "@/constants/category";

export const runtime = "nodejs";

function getImageFile(formData: FormData): File | undefined {
  const file = formData.get("image");
  return file instanceof File && file.size > 0 ? file : undefined;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const formData = await req.formData();
    const payload = parseAdminArticleFormData(formData);
    const imageFile = getImageFile(formData);

    if (payload.category === CONTENTFUL_CATEGORY.news && !imageFile) {
      return NextResponse.json(
        { ok: false, message: "교회소식 이미지를 업로드해주세요." },
        { status: 400 },
      );
    }

    const thumbnailAssetId = imageFile
      ? await createContentfulAsset(imageFile)
      : undefined;
    const entry = await createContentfulArticle(
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
      error instanceof Error ? error.message : "게시글 생성에 실패했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
