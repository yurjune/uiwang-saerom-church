"use client";

import { useEffect } from "react";
import { CHURCH_NAME } from "../../constants";

const useKakaoMap = (container, appKey) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }
    if (!appKey) {
      return;
    }

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
        // v3 스크립트 동적로드
        const options = {
          center: new kakao.maps.LatLng(37.3896433, 126.9956158), // 지도의 중심좌표
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container.current, options); // 지도 생성 및 객체 리턴

        const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/map/marker_map01.png", // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );
        // 지도를 클릭한 위치에 표출할 마커입니다
        const marker = new kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: map.getCenter(),
          image: markerImage, // 마커이미지 설정
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          window.open("http://kko.to/8IX9yjgfM");
        });

        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        const content =
          '<div class="customoverlay">' +
          '  <a href="http://kko.to/8IX9yjgfM" target="_blank">' +
          `    <span class="title">${CHURCH_NAME}</span>` +
          "  </a>" +
          "</div>";
        // 커스텀 오버레이가 표시될 위치입니다
        const position = new kakao.maps.LatLng(
          37.3896433,
          126.9956158,
        );
        // 커스텀 오버레이를 생성합니다
        new kakao.maps.CustomOverlay({
          map: map,
          position: position,
          content: content,
          yAnchor: 1,
        });

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
        function setZoomable(zoomable) {
          // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
          map.setZoomable(zoomable);
        }
        setZoomable();
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
