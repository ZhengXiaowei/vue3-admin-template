import { ComputedRef, Ref, ref, watch } from "vue";
import QRCode from "qrcode";

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;

const useQRCode = (
  text: MaybeRef<string>,
  options?: QRCode.QRCodeToDataURLOptions
) => {
  const src = ref(text);
  const result = ref("");

  watch(
    src,
    async (value) => {
      result.value = await QRCode.toDataURL(value, options);
    },
    { immediate: true }
  );

  return result;
};

export default useQRCode;
