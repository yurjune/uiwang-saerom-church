export const categoryToUrl = (category) => {
  if (category === "예배와 말씀") {
    return "/movies";
  }
  if (category === "커뮤니티") {
    return "/community/news";
  }
  if (category === "교회학교") {
    return "/#";
  }
  if (category === "주일예배") {
    return "/movies/sunday";
  }
  if (category === "수요예배") {
    return "/movies/wednesday";
  }
  if (category === "교회소식") {
    return "/community/news";
  }
  if (category === "오시는길") {
    return "/community/map";
  }
  return "/#";
};

export const categoryToContents = (category) => {
  if (category === "주일예배") {
    return "/contents/sunday";
  }
  if (category === "수요예배") {
    return "/contents/wednesday";
  }
  if (category === "교회소식") {
    return "/contents/news";
  }
  return "/#";
};

export const findBible = (category, bible) => {
  if (category === "예배와 말씀") {
    return `/movies/${bible}}`;
  }
  if (category === "주일예배") {
    return `/movies/sunday/${bible}}`;
  }
  if (category === "수요예배") {
    return `/movies/wednesday/${bible}}`;
  }
};
