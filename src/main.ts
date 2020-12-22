import "moment/locale/zh-cn";
import "@/scss/index.scss";
import "@/router/permission";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { install, createGlobalData } from "@/plugins";

const app = createApp(App);

// 初始化三方库和插件
install(app);
createGlobalData(app);

app.use(store).use(router);

router.isReady().then((_) => app.mount("#app"));
