"use client";

import { useEffect } from "react";
import { CHURCH_NAME } from "@/constants";

const LOC = {
  url: "https://kko.to/Jty5zmr2Oe",
  latitude: 37.3896433, // 위도
  longitude: 126.9956158, // 경도
};

const useKakaoMap = (container, appKey) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    if (!appKey) return;

    let isMounted = true;
    let mapInitialized = false;

    const initMap = () => {
      const kakao = /** @type {any} */ (window).kakao;
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
          `    <span class="title">${CHURCH_NAME}</span>` +
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

    // if sdk is ready
    if (initMap()) {
      return () => {
        isMounted = false;
      };
    }

    const scriptId = "kakao-map-sdk";
    const sdkUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    let script = /** @type {HTMLScriptElement | null} */ (
      document.getElementById(scriptId)
    );

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = sdkUrl;
      script.async = true;
      document.head.appendChild(script);
    }

    const handleLoad = () => {
      initMap();
    };

    script.addEventListener("load", handleLoad);

    return () => {
      isMounted = false;
      script?.removeEventListener("load", handleLoad);
    };
  }, [appKey, container]);
};

export default useKakaoMap;
