import { ProjectUrl } from "../../constants/projectUrl";

export const navItems = [
  {
    label: "교회소개",
    children: [
      // {
      //   href: ProjectUrl.introduce.about.toString(),
      //   label: "교회소개",
      // },
      {
        href: ProjectUrl.introduce.time.toString(),
        label: "예배시간 안내",
      },
      {
        href: ProjectUrl.introduce.location.toString(),
        label: "오시는길",
      },
    ],
  },
  { href: ProjectUrl.movies.toString(), label: "설교영상" },
  { href: ProjectUrl.news.toString(), label: "교회소식" },
];
