import { onCreateRandomRange } from "@/helper";

const useImage = (resource: string[], width: number, height: number) => {
  const onImageCreate = (
    load: ((this: GlobalEventHandlers, ev: Event) => any) | null
  ) => {
    const image = document.createElement("img");
    image.crossOrigin = "Anonymous";
    image.onload = load;
    image.onerror = () => (image.src = onCreateRandomImageByNets());
    image.src = onCreateRandomImageByNets();
    return image;
  };

  // 获取随机图片
  const onCreateRandomImageByNets = () => {
    let source = "";
    const resourceLength = resource.length;
    const IMAGE_RESOURCE = `https://picsum.photos/${width}/${height}/?&image=`;
    if (resourceLength)
      source = resource[onCreateRandomRange(0, resourceLength)];
    else source = IMAGE_RESOURCE + onCreateRandomRange(0, 1024);
    return source;
  };

  return { onImageCreate, onCreateRandomImageByNets };
};

export default useImage;
