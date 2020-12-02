import "moment/locale/zh-cn";
import "@/scss/index.scss";
import "@/router/permission";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import install from "@/plugins/install";

const app = install(createApp(App));

app.use(store).use(router);

router.isReady().then((_) => app.mount("#app"));
