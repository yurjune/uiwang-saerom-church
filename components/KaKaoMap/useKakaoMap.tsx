"use client";

import { useEffect, type RefObject } from "react";
import { CHURCH_INFO } from "@/constants";

const LOC = {
  url: "https://kko.to/Jty5zmr2Oe",
  latitude: 37.3896433, // 위도
  longitude: 126.9956158, // 경도
};

type KakaoWindow = Window & {
  kakao?: any;
};

const useKakaoMap = (
  container: RefObject<HTMLDivElement | null>,
  isSdkReady: boolean,
) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    if (!isSdkReady) return;

    let isMounted = true;
    let mapInitialized = false;

    const initMap = () => {
      const kakao = (window as KakaoWindow).kakao;
      if (!isMounted || mapInitialized || !kakao?.maps || !container.current) {
        return false;
      }

      kakao.maps.load(() => {
        if (!isMounted || mapInitialized || !container.current) return;
        mapInitialized = true;

        const map = new kakao.maps.Map(container.current, {
          center: new kakao.maps.LatLng(LOC.latitude, LOC.longitude),
          level: 3, // 지도의 레벨(확대, 축소 정도)
        });

        // set marker image
        const markerImage = new kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/map/marker_map01.png",
          new kakao.maps.Size(64, 69),
          {
            offset: new kakao.maps.Point(27, 69),
          },
        );
        const marker = new kakao.maps.Marker({
          position: map.getCenter(),
          image: markerImage,
        });
        marker.setMap(map);

        kakao.maps.event.addListener(marker, "click", function () {
          window.open(LOC.url);
        });

        // custom overlay
        const content =
          '<div class="customoverlay">' +
          `  <a href="${LOC.url}" target="_blank" rel="noopener noreferrer">` +
          `    <span class="title">${CHURCH_INFO.name}</span>` +
          "  </a>" +
          "</div>";
        new kakao.maps.CustomOverlay({
          map,
          position: new kakao.maps.LatLng(LOC.latitude, LOC.longitude),
          content: content,
          yAnchor: 1,
        });

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        map.setZoomable();
      });

      return true;
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [container, isSdkReady]);
};

export default useKakaoMap;
