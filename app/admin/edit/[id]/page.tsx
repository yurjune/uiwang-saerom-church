import type { Metadata } from "next";
import { Suspense } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import AdminUploadClient from "../../AdminUploadClient";

type PageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "게시글 수정",
  robots: {
    index: false,
    follow: false,
  },
};

async function AdminEditContent({ params }: PageProps) {
  const { id } = await params;
  return (
    <AppLayout>
      <AdminUploadClient articleId={id} />
    </AppLayout>
  );
}

// 게시글 ID는 요청 시점에만 알 수 있어 빌드 때 미리 렌더링할 수 없다.
// 헤더의 usePathname()도 이 경로에서는 동적이므로 레이아웃까지 Suspense 안에서 렌더링한다.
export default function AdminEditPage({ params }: PageProps) {
  return (
    <Suspense>
      <AdminEditContent params={params} />
    </Suspense>
  );
}
