import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home.vue";
import LoginPage from "../views/Login.vue";

import AdminPage from "../views/Home/Admin.vue";
import AdminDetail from "../views/Home/AdminDetail.vue";
import ClassPage from "../views/Home/Classroom.vue";
import ClassDetail from "../views/Home/ClassDetail.vue";
import UserPage from "../views/Home/User.vue";
import UserDetail from "../views/Home/UserDetail.vue";
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
        path: "admin/detail/:id",
        component: AdminDetail,
      },
      {
        path: "user",
        component: UserPage,
      },
      {
        path: "user/detail/:id",
        component: UserDetail,
      },
      {
        path: "class",
        component: ClassPage,
      },
      {
        path: "class/detail/:id",
        component: ClassDetail,
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
