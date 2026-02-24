import React from "react";
import SecondLayout from "../components/SecondLayout";
import Introduction from "../components/Introduction";
import WorshipTime from "../components/WorshipTime";
import People from "../components/People";
import { getPictures } from "../lib/contentful";

export const metadata = {
  title: "디딤돌교회",
};

export default async function HomePage() {
  const pictures = await getPictures();

  return (
    <SecondLayout pictures={pictures}>
      <Introduction pictures={pictures} />
      <People pictures={pictures} />
      <WorshipTime />
    </SecondLayout>
  );
}
