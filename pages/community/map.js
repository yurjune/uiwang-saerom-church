import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import AppLayout from "../../components/AppLayout";
import KakaoMap from "../../components/KakaoMap";
import SimplePage from "../../components/SimplePage";

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

const Map = ({ pictures }) => {
  return (
    <>
      <Head>
        <title>오시는길</title>
        <style>{`
          .customoverlay {position:relative;bottom:85px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
          .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
          .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
          .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
          .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
        `}</style>
      </Head>
      <AppLayout pictures={pictures}>
        <SimplePage title="찾아오시는 길">
          <KakaoMap />
        </SimplePage>
      </AppLayout>
    </>
  );
};

export default Map;
