import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import mitt from "mitt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueMasonryPlugin = require("vue-masonry/src/masonry-vue3.plugin").VueMasonryPlugin;
import { auth } from "./plugins/firebase";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import VeeValidate from "./plugins/validation";
import "element-plus/dist/index.css";
import "@/assets/scss/imports.scss";
import GlobalDirectives from "./plugins/globalDirectives";

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    const emitter = mitt();
    app.config.globalProperties.emitter = emitter;
    app.use(VueMasonryPlugin);
    app.use(store);
    app.use(router);
    app.use(GlobalDirectives);
    app.use(ElementPlus);
    app.use(VeeValidate);
    app.mount("#app");
  }
});
