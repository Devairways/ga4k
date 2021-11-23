import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import mitt from "mitt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueMasonryPlugin = require("vue-masonry/src/masonry-vue3.plugin").VueMasonryPlugin;
import { auth } from "./plugins/firebase";
import store from "./store";
import router from "./router";
import ElementPlus from "element-plus";
import VeeValidate from "./plugins/validation";
import "element-plus/dist/index.css";
import "@/assets/scss/imports.scss";
import GlobalDirectives from "./plugins/globalDirectives";
import i18n from "./plugins/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    const emitter = mitt();
    app.config.globalProperties.emitter = emitter;
    app.use(i18n);
    app.use(VueMasonryPlugin);
    app.use(store);
    app.use(router);
    app.use(GlobalDirectives);
    app.use(ElementPlus);
    app.use(VeeValidate);
    app.mount("#app");
  }
});
