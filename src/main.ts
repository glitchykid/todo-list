import { appRoutes } from "@/routes/routes";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./assets/styles/animations.css";
import "./assets/styles/tailwind.css";

const app = createApp(App);

const routes = appRoutes.map(({ component, path }) => ({
  path,
  component,
}));

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");
