import { createRouter, createWebHistory } from 'vue-router';
import DateView from "../views/DateView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "home",
        component: DateView,
      },
      {
        path: "/admin",
        name: "admin",
        component: () => import("../views/AdminView.vue"),
      },
  ],
});

export default router;