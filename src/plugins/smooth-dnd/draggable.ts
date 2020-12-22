import { defineComponent, h } from "vue";
import { constants } from "smooth-dnd";
import { getTagProps, validateTagProp } from "./utils";

const Draggable = defineComponent({
  props: {
    tag: {
      validator: validateTagProp,
      default: "div",
    },
  },
  setup(props, ctx) {
    const tagProps = getTagProps(props, constants.wrapperClass);

    return () =>
      h(tagProps.value, Object.assign({}, tagProps.props), {
        default: () =>
          ctx.slots.default ? ctx.slots.default() : "default wrap",
      });
  },
});

export default Draggable;
