import { isArray } from "@/helper/utils";

export const getTagProps = (
  props: Record<string, any>,
  tagClasses?: string
) => {
  const tag = props.tag;
  if (tag) {
    if (typeof tag === "string") {
      const result: Record<string, any> = { value: tag };
      if (tagClasses) {
        result.props = { class: tagClasses };
      }
      return result;
    } else if (typeof tag === "object") {
      const result = { value: tag.value || "div", props: tag.props || {} };

      if (tagClasses) {
        if (result.props.class) {
          if (isArray(result.props.class)) {
            result.props.class.push(tagClasses);
          } else {
            result.props.class = [tagClasses, result.props.class];
          }
        } else {
          result.props.class = tagClasses;
        }
      }

      return result;
    }
  }
  return { value: "div" };
};

export const validateTagProp = (tag: any) => {
  if (tag) {
    if (typeof tag === "string") return true;
    if (typeof tag === "object") {
      if (
        typeof tag.value === "string" ||
        typeof tag.value === "function" ||
        typeof tag.value === "object"
      ) {
        return true;
      }
    }
    return false;
  }
  return true;
};
