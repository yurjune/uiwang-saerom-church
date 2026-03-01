export const CHURCH_INFO = {
  name: "의왕 새롬교회",
  location: "경기 의왕시 안양판교로 219 로얄프라자 202 의왕 새롬교회",
};

export const SITE_METADATA = {
  baseUrl: "https://www.uwsch.org",
  locale: "ko_KR",
  siteName: CHURCH_INFO.name,
  title: CHURCH_INFO.name,
  description: `${CHURCH_INFO.name} 홈페이지입니다. 예배 안내, 교회소식, 설교영상을 확인할 수 있습니다.`,
  image: "/logo.jpg",
  og_image: "/logo.jpg",
  icon: "/favicon.ico",
  keywords: [
    CHURCH_INFO.name,
    "교회",
    "예배",
    "예배안내",
    "설교영상",
    "교회소식",
    CHURCH_INFO.location,
  ],
};

export const TWITTER_CONFIG = {
  card: "summary_large_image",
  creator: "@saerom_church", // 실제 트위터 핸들로 변경하세요
  site: "@saerom_church", // 사이트 트위터 핸들로 변경하세요
};
