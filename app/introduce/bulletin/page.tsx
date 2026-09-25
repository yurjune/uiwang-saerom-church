import AppLayout from "@/components/layouts/AppLayout";
import { BulletinGallery } from "@/components/Bulletin/Bulletin";
import TitleBar from "@/components/TitleBar/TitleBar";
import { CHURCH_INFO } from "@/constants";
import { ProjectMenu } from "@/constants/menu";
import { ProjectUrl } from "@/constants/projectUrl";
import { getLatestBulletin } from "@/lib/contentful";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.introduce.bulletin.toString(),
  },
  title: ProjectMenu.introduce.bulletin.label,
  description: `${CHURCH_INFO.name} 주보를 안내합니다.`,
  keywords: [CHURCH_INFO.name, "주보", "교회소식"],
};

export default async function BulletinPage() {
  const bulletin = await getLatestBulletin();

  return (
    <AppLayout>
      <TitleBar title={ProjectMenu.introduce.bulletin.label} />

      {bulletin && bulletin.fields.images.length > 0 && (
        <BulletinGallery bulletin={bulletin} />
      )}
    </AppLayout>
  );
}
