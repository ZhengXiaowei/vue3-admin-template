import { MessageApi } from "ant-design-vue/lib/message";
import { ModalFunc, ModalFuncProps } from "ant-design-vue/lib/modal/Modal";
import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $copyText(text: string, container?: HTMLElement): Promise<Clipboard.Event>;
    $confirm(options: ModalFuncProps): ModalFunc;
    $message: MessageApi;
  }
}
