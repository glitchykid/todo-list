import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import { appRoutes } from "./routes/routes";
import "./assets/tailwind.css";

const app = createApp(App);

const routes = appRoutes.map(({ component, path }) => ({
  path,
  component,
}));

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

app.use(router);
app.mount("#app");
