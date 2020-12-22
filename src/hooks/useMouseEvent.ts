import { onUnmounted } from "vue";

interface IMouseEvent {
  (event: MouseEvent): void;
}

const useMouseEvent = (move: IMouseEvent, leave: IMouseEvent) => {
  const initEvent = () => {
    document.addEventListener("mousemove", move, false);
    document.addEventListener("mouseup", leave, false);
  };

  onUnmounted(() => {
    document.removeEventListener("mousemove", move, false);
    document.removeEventListener("mouseup", leave, false);
  });

  return { initEvent };
};

export default useMouseEvent;
