import HomeView from "@/views/home/HomeView.vue";
import HistoryView from "@/views/history/HistoryView.vue";
import BinView from "@/views/bin/BinView.vue";

type IconName = "home" | "history" | "bin";

interface AppRoute {
  id: number;
  path: string;
  name: string;
  label: string;
  icon: IconName;
  component: any;
}

export const appRoutes: AppRoute[] = [
  {
    id: 0,
    path: "/",
    name: "home",
    label: "Home",
    icon: "home",
    component: HomeView,
  },
  {
    id: 1,
    path: "/history",
    name: "history",
    label: "History",
    icon: "history",
    component: HistoryView,
  },
  {
    id: 2,
    path: "/bin",
    name: "bin",
    label: "Bin",
    icon: "bin",
    component: BinView,
  },
];
