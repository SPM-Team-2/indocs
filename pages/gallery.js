import { useStoreActions, useStoreState } from "easy-peasy";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Close from "../assets/close";
import LeftArrowIcon from "../assets/left-arrow";
import EmptyGalleryIcon from "../assets/empty-gallery-icon";
import generatePdf from "../utils/generatePdf";
import { createRef, useEffect, useRef, useState } from "react";
import PdfDoneIcon from "../assets/pdf-done-icon";

const Gallery = () => {
  const canvasRef = useRef();
  const { images } = useStoreState((state) => state);
  const { addImage, removeImage, removeAllImages } = useStoreActions(
    (action) => action
  );
  const [pdfGenerated, setPdfGenrated] = useState(false);
  const imageRefs = useRef([]);

  if (imageRefs.current.length !== images.length) {
    // add or remove refs
    imageRefs.current = Array(images.length)
      .fill()
      .map((_, i) => imageRefs.current[i] || createRef());
  }

  const handleGeneratePdfFromImages = () => {
    generatePdf(images);
    setPdfGenrated(true);
    cleanUpUploadedImages();
  };

  const cleanUpUploadedImages = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.src);
    });
    removeAllImages();
  };

  const setFilterToImages = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const _image = imageRefs.current;

    console.log(imageRefs);
    images.map((image, i) => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.filter = "contrast(1.4) sepia(1) drop-shadow(-9px 9px 3px #e81)";
      context.drawImage(_image[i].current, 0, 0);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        addImage({
          src: url,
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        URL.revokeObjectURL(blob);
      });
    });
  };

  return (
    <div>
      {/* BACK BUTTON */}
      <Link href="/">
        <a>
          <motion.div
            key="back-button"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{
              type: "tween",
            }}
            exit={{
              x: -200,
            }}
            className="bg-gray-500 h-6 rounded-lg w-[5rem] sm:w-[7rem] absolute top-3 -left-4"
          >
            <div className="ml-7 sm:ml-10">
              <LeftArrowIcon />
            </div>
          </motion.div>
        </a>
      </Link>
      {/* Images in buffer */}
      {images.length > 0 ? (
        <motion.div
          className="flex mt-12 flex-wrap flex-shrink"
          layoutId="gallery"
        >
          {images.map(({ src }, index) => (
            <motion.div
              key={index}
              className="relative border-2 border-gray-400 mx-2 overflow-hidden"
            >
              <img
                ref={imageRefs.current[index]}
                className={`py-3 px-2 filter`}
                src={src}
              />
              <div
                className="absolute bottom-0 right-0 w-[20%] bg-gray-400 rounded-full p-5 sm:p-7"
                onClick={() => removeImage(index)}
              >
                <Close imageIndex={index} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="h-[90vh] flex justify-center items-center flex-col">
          {pdfGenerated ? (
            <>
              <PdfDoneIcon />
              <div className="text-gray-300 text-center mt-3 px-3 sm:text-lg text-sm overflow-visible">
                <span className="text-xl font-bold">Done!</span>
                <br /> Your pdf should have opened in a new tab <br />{" "}
                <div className="border-b-[1px] border-gray-300 pb-2">
                  Make sure you save it before closing the tab
                </div>
              </div>
            </>
          ) : (
            <>
              <EmptyGalleryIcon />
              <div className="text-gray-300 text-center mt-3 px-3 sm:text-lg text-sm">
                Oops! looks like there are no images in your document right now,
                go back and click a few
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex justify-center">
        {images.length > 0 && (
          <button
            key="pdf"
            className="text-white border-2 border-white m-3 p-1"
            onClick={handleGeneratePdfFromImages}
          >
            GENERATE PDF
          </button>
        )}
        {/* <button
          className="text-white border-2 border-white m-3 p-1"
          onClick={setFilterToImages}
        >
          Set Filter
        </button> */}
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Gallery;
