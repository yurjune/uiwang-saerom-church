import type { Metadata } from "next";
import AppLayout from "@/components/layouts/AppLayout";
import AdminUploadClient from "./AdminUploadClient";

export const metadata: Metadata = {
  title: "관리자",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <AppLayout>
      <AdminUploadClient />
    </AppLayout>
  );
}
