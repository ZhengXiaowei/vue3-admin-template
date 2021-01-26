import { Component, createApp, createVNode } from "vue";

let instance: any = null;
let componentDestroy: any;

const createComponent = (Component: Component) => {
  const app = createApp(Component);

  const root = document.createElement("div");

  document.body.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount(root);
      document.body.removeChild(root);
    },
  };
};

const create = (
  parentNode: Component,
  vnode: Component,
  props?: Record<string, any>
) => {
  return new Promise((resolve) => {
    const onClosed = () => {
      componentDestroy();
      instance = null;
    };

    if (!instance) {
      const vm = createVNode(
        parentNode,
        {
          onClosed,
        },
        {
          default: (childProps: Record<string, any>) => {
            return createVNode(vnode, {
              ...childProps,
              onConfirm: (data: Record<string, any>) => {
                resolve(data);
                instance.close();
              },
              onClose: () => instance.close(),
              onClosed,
            });
          },
        }
      );

      ({ instance, unmount: componentDestroy } = createComponent(vm));
    }

    instance.open(props);
  });
};

export default create;
