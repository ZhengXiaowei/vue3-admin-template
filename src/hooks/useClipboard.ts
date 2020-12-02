import { clipboardKey } from "@/plugins/injectionKey";
import { inject } from "vue";

/**
 * @description: 使用方式一 - Promise
 * this.$copyText(text)
 */

/**
 * @description: 使用方式二 - Directive
 * <button v-clipboard:text="text1"
 *         v-clipboard:success="sucFn"
 *         v-clipboard:error="errFn">复制</button>
 */

const useClipboard = () => {
  const { $copyText } = inject(clipboardKey)!;
  return $copyText;
};

export default useClipboard;
