export const categoryToUrl = (category) => {
  if (category === "오시는길") {
    return "/introduce/map";
  }
  if (category === "설교영상") {
    return "/movies";
  }
  if (category === "교회소식") {
    return "/news";
  }
  return "/#";
};

export const categoryToContents = (category) => {
  if (category === "주일예배") {
    return "/contents/movies";
  }
  if (category === "설교영상") {
    return "/contents/movies";
  }
  if (category === "교회소식") {
    return "/contents/news";
  }
  return "/#";
};
