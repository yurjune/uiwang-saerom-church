import { NextRequest, NextResponse } from "next/server";
import {
  createAdminUnauthorizedResponse,
  isAdminRequest,
} from "@/lib/admin/auth/guard";
import { assertAdminImageFile } from "@/lib/admin/contentful/articlePayload";
import { createContentfulAsset } from "@/lib/admin/contentful/management";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const formData = await req.formData();
    const imageFile = assertAdminImageFile(formData.get("image"));
    const assetId = await createContentfulAsset(imageFile);

    return NextResponse.json({
      ok: true,
      id: assetId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
