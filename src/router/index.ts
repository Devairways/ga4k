import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "@/store";

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

router.beforeEach((to, _, next) => {
  const userLoggedIn = store.getters["userLoggedIn"];
  if (to.matched.some(record => record.meta.requiresLogin) && !userLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
