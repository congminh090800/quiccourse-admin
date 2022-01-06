import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home.vue";
import LoginPage from "../views/Login.vue";

import AdminPage from "../views/Home/Admin.vue";
import ClassPage from "../views/Home/Classroom.vue";
import UserPage from "../views/Home/User.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      {
        path: "admin",
        alias: "",
        component: AdminPage,
      },
      {
        path: "user",
        component: UserPage,
      },
      {
        path: "class",
        component: ClassPage,
      },
    ],
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
