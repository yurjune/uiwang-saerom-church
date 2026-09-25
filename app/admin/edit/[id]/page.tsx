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
  return <AdminUploadClient articleId={id} />;
}

export default function AdminEditPage({ params }: PageProps) {
  return (
    <AppLayout>
      <Suspense>
        <AdminEditContent params={params} />
      </Suspense>
    </AppLayout>
  );
}
