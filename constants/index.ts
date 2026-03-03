export const CHURCH_INFO = {
  name: "의왕 새롬교회",
  location: "경기 의왕시 안양판교로 219 로얄프라자 202 의왕 새롬교회",
};

export const SITE_METADATA = {
  baseUrl: "https://www.uwsch.org",
  locale: "ko_KR",
  siteName: CHURCH_INFO.name,
  title: CHURCH_INFO.name,
  description: `경기 의왕시 안양판교로 219 로얄프라자 202에 위치한 의왕 새롬교회 홈페이지입니다. 예배 안내, 오시는길, 설교영상, 교회소식을 확인할 수 있습니다.`,
  keywords: [
    CHURCH_INFO.name,
    "교회",
    "예배",
    "예배안내",
    "설교영상",
    "교회소식",
    CHURCH_INFO.location,
  ],
  favicon: "/favicon.ico",
  image: "/logo.jpg",
  og_image: "/logo.jpg",
  manifestIcon192: "/android-chrome-192x192.png",
  manifestIcon512: "/android-chrome-512x512.png",
  appleIcon: "/apple-touch-icon.png",
};

export const TWITTER_CONFIG = {
  card: "summary_large_image" as const,
  creator: "@saerom_church", // 실제 트위터 핸들로 변경하세요
  site: "@saerom_church", // 사이트 트위터 핸들로 변경하세요
};
