import type { App } from 'vue';

declare global {
  declare interface Window {
    __APP__: App<Element>;
  }
  declare interface String {
    parse<T>(): T | null | undefined;
  }
}
