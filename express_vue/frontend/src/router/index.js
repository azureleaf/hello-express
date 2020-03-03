import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/resjson",
    name: "ResJson",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "resjson" */ "../views/ResJson.vue")
  },
  {
    path: "/resrender",
    name: "ResRender",
    component: () =>
      import(/* webpackChunkName: "resrender" */ "../views/ResRender.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
