export const categoryToUrl = (category) => {
  if (category === "설교영상") {
    return "/movies";
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
  if (category === "설교영상") {
    return "/contents/sunday";
  }
  if (category === "교회소식") {
    return "/contents/news";
  }
  return "/#";
};
