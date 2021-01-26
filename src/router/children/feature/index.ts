import { RouteConfig } from "@/types/route";

export const FeatureCopy: RouteConfig = {
  name: "FeatureCopy",
  path: "copy",
  meta: {
    title: "复制",
  },
  component: () => import("@/views/feature/copy.vue"),
};

export const FeatureQrCode: RouteConfig = {
  name: "FeatureQrCode",
  path: "qrcode",
  meta: {
    title: "二维码生成",
  },
  component: () => import("@/views/feature/qrcode.vue"),
};

export const FeatureDrag: RouteConfig = {
  name: "FeatureDrag",
  path: "drag",
  meta: {
    title: "拖拽排序",
  },
  component: () => import("@/views/feature/drag.vue"),
};

export const FeatureVerify: RouteConfig = {
  name: "FeatureVerify",
  path: "verify",
  meta: {
    title: "滑块验证码",
  },
  component: () => import("@/views/feature/verify.vue"),
};

export const Functional: RouteConfig = {
  name: "Functional",
  path: "functional",
  meta: {
    title: "函数式组件",
  },
  component: () => import("@/views/feature/functional.vue"),
};
