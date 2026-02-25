export const categoryToUrl = (category) => {
  if (category === "설교영상") {
    return "/movies";
  }
  if (category === "교회소식") {
    return "/news";
  }
  return "/#";
};

export const categoryToContentUrl = (category) => {
  if (category === "설교영상") {
    return "/contents/movies";
  }
  if (category === "교회소식") {
    return "/contents/news";
  }
  return "/#";
};
