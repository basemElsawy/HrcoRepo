import { Routes } from "../Models/Models";
export const appRoutes: Routes[] = [
  {
    id: 1,
    route: "/",
    routeName: "Home",

    icon: "fa-solid fa-house",
  },
  {
    id: 2,
    route: "/progress",
    routeName: "Progress",
    icon: "fa-solid fa-chart-line",
  },
  {
    id: 3,
    route: "/comments",
    routeName: "Comments",
    icon: "fa-solid fa-message",
  },
  {
    id: 4,
    route: "/employees",
    routeName: "Employees",
    icon: "fa-solid fa-user-tie",
  },
];
