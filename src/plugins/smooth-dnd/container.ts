import {
  defineComponent,
  onMounted,
  onUpdated,
  SetupContext,
  ref,
  onUnmounted,
  watch,
  h,
} from "vue";
import { smoothDnD, dropHandlers, SmoothDnD } from "smooth-dnd";
import { getTagProps, validateTagProp } from "./utils";

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
smoothDnD.wrapChild = false;

const emitEventMap = {
  "drag-start": "onDragStart",
  "drag-end": "onDragEnd",
  drop: "onDrop",
  "drag-enter": "onDragEnter",
  "drag-leave": "onDragLeave",
  "drop-ready": "onDropReady",
};

const getContainerOptions = (
  props: Record<string, any>,
  context: SetupContext
) => {
  const options = Object.keys(props).reduce(
    (result: Record<string, any>, key: string) => {
      const optName = key;
      const prop = props[optName];
      if (prop !== undefined) {
        if (typeof prop === "function") {
          if ((<Record<string, string>>emitEventMap)[optName]) {
            result[(<Record<string, string>>emitEventMap)[optName]] = (
              params: any
            ) => {
              context.emit(optName, params);
            };
          } else {
            result[optName] = (...params: any[]) => {
              return prop(...params);
            };
          }
        } else result[optName] = prop;
      }
      return result;
    },
    {}
  );

  return options;
};

const mapOptions = (appProps: Record<string, any>, context: SetupContext) => {
  const props = Object.assign({}, appProps, context.attrs);
  return getContainerOptions(props, context);
};

const Container = defineComponent({
  props: {
    behaviour: String,
    groupName: String,
    orientation: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    dragBeginDelay: Number,
    animationDuration: Number,
    autoScrollEnabled: { type: Boolean, default: true },
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    removeOnDropOut: { type: Boolean, default: false },
    "drag-start": Function,
    "drag-end": Function,
    drop: Function,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    "drag-enter": Function,
    "drag-leave": Function,
    tag: {
      validator: validateTagProp,
      default: "div",
    },
    getGhostParent: Function,
    "drop-ready": Function,
    dropPlaceholder: [Object, Boolean],
  },
  setup(props, context) {
    const container = ref<HTMLElement | null>(null);

    const dndContainer = ref<SmoothDnD | null>(null);

    onMounted(() => {
      dndContainer.value = smoothDnD(
        container.value!,
        mapOptions(props, context)
      );
    });

    watch(
      () => container.value,
      () => {
        console.log("change dnd container");
        if (dndContainer.value) dndContainer.value.dispose();
        dndContainer.value = smoothDnD(
          container.value!,
          mapOptions(props, context)
        );
      }
    );

    onUpdated(() => dndContainer.value?.setOptions(mapOptions(props, context)));

    onUnmounted(() => {
      if (dndContainer.value) dndContainer.value.dispose();
    });

    const tagProps = getTagProps(props);

    const renderContainer = () => {
      return h(
        tagProps.value,
        Object.assign({}, { ref: container }, tagProps.props),
        {
          default: () =>
            context.slots.default ? context.slots.default() : "default text",
        }
      );
    };

    return () => h(renderContainer);
  },
});

export default Container;
