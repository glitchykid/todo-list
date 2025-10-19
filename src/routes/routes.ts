import HomeView from "@/views/home/HomeView.vue";
import HistoryView from "@/views/history/HistoryView.vue";
import BinView from "@/views/bin/BinView.vue";

export type RouteIcon = "home" | "history" | "bin";

interface AppRoute {
  path: string;
  name: string;
  label: string;
  icon: RouteIcon;
  component: any;
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    name: "home",
    label: "Home",
    icon: "home",
    component: HomeView,
  },
  {
    path: "/history",
    name: "history",
    label: "History",
    icon: "history",
    component: HistoryView,
  },
  {
    path: "/bin",
    name: "bin",
    label: "Bin",
    icon: "bin",
    component: BinView,
  },
];
