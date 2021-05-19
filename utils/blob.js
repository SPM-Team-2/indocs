import { useStoreActions } from "easy-peasy";

// Custom Hook to save canvas to images
const useBlobImage = () => {
  const { addImage } = useStoreActions((action) => action);

  const toBlob = (canvas, photo, width, height) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      photo?.setAttribute("src", url);
      addImage({ src: url, width: width, height: height });
    });
  };
  return { toBlob };
};

export default useBlobImage;
