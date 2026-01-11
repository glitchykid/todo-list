import BinView from "@/views/bin/BinView.vue";
import HistoryView from "@/views/history/HistoryView.vue";
import HomeView from "@/views/home/HomeView.vue";
import { HomeIcon, NewspaperIcon, TrashIcon } from "@heroicons/vue/20/solid";
import type { Component } from "vue";

interface AppRoute {
  path: string;
  name: string;
  label: string;
  icon: Component;
  component: any;
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    name: "home",
    label: "Home",
    icon: HomeIcon,
    component: HomeView,
  },
  {
    path: "/history",
    name: "history",
    label: "History",
    icon: NewspaperIcon,
    component: HistoryView,
  },
  {
    path: "/bin",
    name: "bin",
    label: "Bin",
    icon: TrashIcon,
    component: BinView,
  },
];
