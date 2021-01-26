import { Component } from "vue";

import createComponent from "@/components/create-component";
import defineInstance from "./wrapper";

import { IBaseProps } from "@/types/api";

import TestComponent from "./slots/test.vue";

const createModal = <T, U = any>(
  vnode: Component,
  props?: T & IBaseProps
): Promise<U> => {
  return createComponent(defineInstance, vnode, props) as Promise<U>;
};

export { createModal, TestComponent };
