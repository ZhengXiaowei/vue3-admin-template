import { DirectiveBinding, VNode, App } from "vue";
import QRCode from "qrcode";

const insertQrCode2Element = (el: HTMLElement | Element, qrCode: string) => {
  if (el.nodeName === "IMG") el.setAttribute("src", qrCode);
  else {
    // 判断原来的node是否存在 存在就删除
    const prevChild = el.lastElementChild;
    if (prevChild) el.removeChild(prevChild);
    const imgElement = document.createElement("img");
    imgElement.src = qrCode;
    el.appendChild(imgElement);
  }
};

const bind = async (
  el: HTMLElement | Element,
  binding: DirectiveBinding,
  vnode: VNode
) => {
  const qrText = binding.value;
  if (!qrText) return;
  if (typeof qrText === "string") {
    const code = await QRCode.toDataURL(qrText);
    insertQrCode2Element(el, code);
  } else console.log("v-qrode 需要一个string类型的值");
};

const update = async (el: HTMLElement | Element, binding: DirectiveBinding) => {
  if (binding.oldValue === binding.value) return;
  const qrText = binding.value;
  if (!qrText) return;
  if (typeof qrText === "string") {
    const code = await QRCode.toDataURL(qrText);
    insertQrCode2Element(el, code);
  } else console.log("v-qrode 需要一个string类型的值");
};

const VueQrCode = {
  install: (app: App<Element>) => {
    app.directive("qrcode", {
      mounted: bind,
      updated: update,
    });
  },
};

export default VueQrCode;
