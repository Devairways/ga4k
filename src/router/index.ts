import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _2, scrollPosition) {
    if (scrollPosition) {
      return scrollPosition;
    }
    return { left: 0, top: 0 };
  }
});

export default router;
