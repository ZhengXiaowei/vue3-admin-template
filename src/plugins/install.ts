import { App } from "vue";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Popover,
} from "ant-design-vue";

import VueClipboard3 from "./vue-clipboard";
import VueQrCode from "./vue-qrcode";

const install = (app: App<Element>) => {
  app.config.globalProperties.$confirm = Modal.confirm;
  app.config.globalProperties.$message = message;

  return app
    .use(VueClipboard3)
    .use(VueQrCode)
    .use(ConfigProvider)
    .use(Layout)
    .use(Menu)
    .use(Form)
    .use(Input)
    .use(Button)
    .use(Popover)
    .use(Modal);
};

export default install;
