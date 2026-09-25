import { NextRequest, NextResponse } from "next/server";
import {
  createAdminUnauthorizedResponse,
  isAdminRequest,
} from "@/lib/admin/auth/guard";
import { deleteContentfulAsset } from "@/lib/admin/contentful/management";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  if (!isAdminRequest(req)) {
    return createAdminUnauthorizedResponse();
  }

  try {
    const { id } = await context.params;
    await deleteContentfulAsset(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "이미지 삭제에 실패했습니다.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
