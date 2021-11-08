import { RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/user/Profile.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/user/RegisterUser.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/manage",
    name: "Manage",
    component: () => import(/* webpackChunkName: "manage" */ "../views/manage/Manage.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/news/News.vue")
  },
  {
    path: "/news/add",
    name: "AddNews",
    component: () => import(/* webpackChunkName: "news" */ "../views/news/AddOrUpdateNewsItem.vue")
  },
  {
    path: "/news/:itemId",
    name: "NewsDetail",
    props: true,
    component: () => import(/* webpackChunkName: "news" */ "../views/news/NewsDetail.vue")
  },
  {
    path: "/news/edit/:itemId",
    name: "EditNews",
    props: route => ({
      newsItemId: route.params.itemId,
      edit: true
    }),
    component: () =>
      import(/* webpackChunkName: "manage" */ "../views/news/AddOrUpdateNewsItem.vue")
  },
  {
    path: "/events",
    name: "Events",
    component: () => import(/* webpackChunkName: "events" */ "../views/events/Events.vue")
  },
  {
    path: "/eventshistory",
    name: "EventsHistory",
    component: () => import(/* webpackChunkName: "events" */ "../views/events/EventsHistory.vue")
  },
  {
    path: "/events/add",
    name: "AddEvents",
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/events/AddOrUpdateEventItem.vue")
  },
  {
    path: "/events/:itemId",
    name: "EventsDetail",
    props: true,
    component: () => import(/* webpackChunkName: "events" */ "../views/events/EventsDetail.vue")
  },
  {
    path: "/events/edit/:itemId",
    name: "EditEvent",
    props: route => ({
      eventItemId: route.params.itemId,
      edit: true
    }),
    component: () =>
      import(/* webpackChunkName: "manage" */ "../views/events/AddOrUpdateEventItem.vue")
  }
];

export default routes;
