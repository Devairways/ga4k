import { RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

export enum AppRouteNames {
  Home = "Home",
  Profile = "Profile",
  Register = "Register",
  About = "About",
  Partners = "Partners",
  Manage = "Manage",
  News = "News",
  AddNews = "AddNews",
  NewsDetail = "NewsDetail",
  EditNews = "EditNews",
  Events = "Events",
  AddEvents = "AddEvents",
  EventsHistory = "EventsHistory",
  EventsDetail = "EventsDetail",
  EditEvents = "EditEvents"
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: AppRouteNames.Home,
    component: Home
  },
  {
    path: "/profile",
    name: AppRouteNames.Profile,
    component: () => import("../views/user/Profile.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/register",
    name: AppRouteNames.Register,
    component: () => import("../views/user/RegisterUser.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/about",
    name: AppRouteNames.About,
    component: () => import(/* webpackChunkName: "about" */ "../views/about/About.vue")
  },
  {
    path: "/partners",
    name: AppRouteNames.Partners,
    component: () => import(/* webpackChunkName: "about" */ "../views/about/Partners.vue")
  },
  {
    path: "/manage",
    name: AppRouteNames.Manage,
    component: () => import(/* webpackChunkName: "manage" */ "../views/manage/Manage.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/news",
    name: AppRouteNames.News,
    component: () => import(/* webpackChunkName: "news" */ "../views/news/News.vue")
  },
  {
    path: "/news/add",
    name: AppRouteNames.AddNews,
    component: () => import(/* webpackChunkName: "news" */ "../views/news/AddOrUpdateNewsItem.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/news/:itemId",
    name: AppRouteNames.NewsDetail,
    props: true,
    component: () => import(/* webpackChunkName: "news" */ "../views/news/NewsDetail.vue")
  },
  {
    path: "/news/edit/:itemId",
    name: AppRouteNames.EditNews,
    props: route => ({
      newsItemId: route.params.itemId,
      edit: true
    }),
    component: () =>
      import(/* webpackChunkName: "manage" */ "../views/news/AddOrUpdateNewsItem.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/events",
    name: AppRouteNames.Events,
    component: () => import(/* webpackChunkName: "events" */ "../views/events/Events.vue")
  },
  {
    path: "/eventshistory",
    name: AppRouteNames.EventsHistory,
    component: () => import(/* webpackChunkName: "events" */ "../views/events/EventsHistory.vue")
  },
  {
    path: "/events/add",
    name: AppRouteNames.AddEvents,
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/events/AddOrUpdateEventItem.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/events/:itemId",
    name: AppRouteNames.EventsDetail,
    props: true,
    component: () => import(/* webpackChunkName: "events" */ "../views/events/EventsDetail.vue")
  },
  {
    path: "/events/edit/:itemId",
    name: AppRouteNames.EditEvents,
    props: route => ({
      eventItemId: route.params.itemId,
      edit: true
    }),
    component: () =>
      import(/* webpackChunkName: "manage" */ "../views/events/AddOrUpdateEventItem.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: AppRouteNames.Home }
  }
];

export default routes;
