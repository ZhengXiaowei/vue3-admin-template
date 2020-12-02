declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 定义clipboard注入的元素
interface ClipboardElement extends HTMLElement {
  _vClipboard_success: any;
  _vClipboard_error: any;
  _vClipboard: ClipboardJS | ClipboardJS.Options | undefined;
}

// 定义provide提供的方法
interface ClipboardMethod {
  $copyText(
    string: string,
    container?: HTMLElement
  ): Promise<ClipboardJS.Event>;
}