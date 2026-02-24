import React from "react";
import Script from "next/script";
import KakaoMap from "../../../components/KakaoMap";
import { getPictures } from "../../../lib/contentful";
import { Box } from "@chakra-ui/react";
import TitleBar from "../../../components/TitleBar";
import AppLayout from "../../../components/layouts/AppLayout";

export const metadata = {
  title: "오시는길",
};

export default async function CommunityMap() {
  const pictures = await getPictures();

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOMAP_ACCESS_KEY}&autoload=false`}
        strategy="afterInteractive"
      />
      <style>{`
        .customoverlay {position:relative;bottom:85px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
        .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
        .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
        .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
        .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
      `}</style>
      <AppLayout pictures={pictures}>
        <Box mb="30px">
          <TitleBar title="오시는길"></TitleBar>
        </Box>
        <KakaoMap />
      </AppLayout>
    </>
  );
}
