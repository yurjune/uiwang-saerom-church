import { ProjectMenu } from "../../constants/menu";
import { ProjectUrl } from "../../constants/projectUrl";

export const navItems = [
  {
    label: ProjectMenu.introduce.label,
    children: [
      // {
      //   href: ProjectUrl.introduce.about.toString(),
      //   label: ProjectMenu.introduce.about.label,
      // },
      {
        href: ProjectUrl.introduce.time.toString(),
        label: ProjectMenu.introduce.time.label,
      },
      {
        href: ProjectUrl.introduce.location.toString(),
        label: ProjectMenu.introduce.location.label,
      },
    ],
  },
  {
    href: ProjectUrl.movies.toString(),
    label: ProjectMenu.movies.label,
  },
  {
    href: ProjectUrl.news.toString(),
    label: ProjectMenu.news.label,
  },
];
