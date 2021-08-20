import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "doc" */ "../views/Home.vue"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_ROUTER_BASE,
  routes,
});

export default router;
