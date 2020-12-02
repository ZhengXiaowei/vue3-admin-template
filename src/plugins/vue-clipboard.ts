import Clipboard from "clipboard";
import { App, DirectiveBinding, VNode } from "vue";
import { clipboardKey } from "./injectionKey";

// clipboard config
const VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true,
};

// 枚举复制的状态
enum status {
  success = "success",
  error = "error",
}

// 方法调用 返回promise
const $copyText = (
  text: string,
  container?: HTMLElement
): Promise<ClipboardJS.Event> => {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement("button");
    const clipboard = new Clipboard(fakeElement, {
      text: () => text,
      action: () => "copy",
      container: typeof container === "object" ? container : document.body,
    });

    clipboard.on(status.success, (e: ClipboardJS.Event) => {
      clipboard.destroy();
      resolve(e);
    });

    clipboard.on(status.error, (e: ClipboardJS.Event) => {
      clipboard.destroy();
      reject(e);
    });

    if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement);
    fakeElement.click();
    if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement);
  });
};

// v-direction bind
const bind = (
  el: ClipboardElement,
  binding: DirectiveBinding,
  vnode: VNode
) => {
  if (binding.arg === status.success) el._vClipboard_success = binding.value;
  else if (binding.arg === status.error) el._vClipboard_error = binding.value;
  else {
    const clipboard = new Clipboard(el, {
      text: () => binding.value,
      action: () => (binding.arg === "cut" ? "cut" : "copy"),
      container: VueClipboardConfig.autoSetContainer ? el : undefined,
    });

    clipboard.on(status.success, (e) => {
      const cb = el._vClipboard_success;
      cb && cb(e);
    });

    clipboard.on(status.error, (e) => {
      const cb = el._vClipboard_error;
      cb && cb(e);
    });

    el._vClipboard = clipboard;
  }
};

// v-direction update
const update = (el: ClipboardElement, binding: DirectiveBinding) => {
  if (binding.arg === status.success) el._vClipboard_success = binding.value;
  else if (binding.arg === status.error) el._vClipboard_error = binding.value;
  else {
    (<ClipboardJS.Options>el._vClipboard).text = () => binding.value;
    (<ClipboardJS.Options>el._vClipboard).action = () =>
      binding.arg === "cut" ? "cut" : "copy";
  }
};

// v-direction unbind
const unbind = (el: ClipboardElement, binding: DirectiveBinding) => {
  if (binding.arg === status.success) delete el._vClipboard_success;
  else if (binding.arg === status.error) delete el._vClipboard_error;
  else {
    (<ClipboardJS>el._vClipboard).destroy();
    delete el._vClipboard;
  }
};

const VueClipboard3 = {
  install: (app: App<Element>) => {
    // const copySymbol = Symbol();
    // provide注入 方便组合api调用
    app.provide(clipboardKey, { $copyText });
    app.config.globalProperties.$clipboardConfig = VueClipboardConfig;
    app.config.globalProperties.$copyText = $copyText;

    app.directive("clipboard", {
      beforeMount: bind,
      updated: update,
      unmounted: unbind,
    });
  },
  config: VueClipboardConfig,
};

export default VueClipboard3;
