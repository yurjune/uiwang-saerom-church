import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import { Box } from "@chakra-ui/react";
import SecondLayout from "../components/SecondLayout";
import MainImage from "../components/MainImage";
import Introduction from "../components/Introduction";
import WorshipTime from "../components/WorshipTime";
import People from "../components/People";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  return {
    props: {
      pictures: pictures.items,
    },
  };
};

function Home({ pictures }) {
  const mainImage = pictures.find((item) => item.fields.title === "메인이미지")
    .fields.picture.fields.file.url;
  return (
    <>
      <Head>
        <title>디딤돌교회</title>
      </Head>
      <SecondLayout pictures={pictures}>
        {/* <MainImage mainImage={mainImage} /> */}
        <Introduction pictures={pictures} />
        <People pictures={pictures} />
        <WorshipTime />
      </SecondLayout>
    </>
  );
}

export default Home;
