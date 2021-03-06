import { useStoreActions } from "easy-peasy";

// Custom Hook to save canvas to images
const useBlobImage = () => {
  const { addImage } = useStoreActions((action) => action);

  const toBlob = (canvas, photo, width, height) => {
    const dataUrl = canvas.toDataURL("image/png");
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      photo?.setAttribute("src", url);
      addImage({ src: url, width: width, height: height, dataUrl: dataUrl });
    });

    // canvas.toBlob((blob) => {
    //   const url = URL.createObjectURL(blob);
    //   photo?.setAttribute("src", url);

    //   addImage({ src: url, width: width, height: height });
    //   // jimp.read(url).then((im) => {
    //   //   im.threshold({
    //   //     max: 160,
    //   //   }).getBase64("image/png", (err, res) => {});
    //   // });
    // });
  };
  return { toBlob };
};

export default useBlobImage;
