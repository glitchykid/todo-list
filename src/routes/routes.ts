import TaskBinView from "@/views/bin/TaskBinView.vue";
import TaskHistoryView from "@/views/history/TaskHistoryView.vue";
import TaskBoardView from "@/views/home/TaskBoardView.vue";
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
    component: TaskBoardView,
  },
  {
    path: "/history",
    name: "history",
    label: "History",
    icon: NewspaperIcon,
    component: TaskHistoryView,
  },
  {
    path: "/bin",
    name: "bin",
    label: "Bin",
    icon: TrashIcon,
    component: TaskBinView,
  },
];
