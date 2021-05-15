import { useStoreActions, useStoreState } from "easy-peasy";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Close from "../assets/close";
import LeftArrowIcon from "../assets/left-arrow";
import EmptyGalleryIcon from "../assets/emptyGalleryIcon";
import generatePdf from "../utils/generatePdf";

const Gallery = () => {
  const { images } = useStoreState((state) => state);
  const { removeImage } = useStoreActions((action) => action);

  const handleGeneratePdfFromImages = () => {
    generatePdf(images);
    cleanUpUploadedImages();
  };

  const cleanUpUploadedImages = () => {
    uploadedImages.forEach((image) => {
      // The URL.revokeObjectURL() releases an existing object URL
      // which was previously created by URL.createObjectURL().
      // It lets the browser know not to keep the reference to the file any longer.
      URL.revokeObjectURL(image.src);
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
      <AnimatePresence exitBeforeEnter>
        {images.length > 1 ? (
          <motion.div
            className="flex mt-12 flex-wrap flex-shrink"
            layoutId="gallery"
          >
            {images.slice(1).map((dataURL, index) => (
              <motion.div
                key={index}
                exit={{
                  scale: 0.7,
                  opacity: 0,
                }}
                className="relative border-2 border-gray-400 mx-2 overflow-hidden"
              >
                <img className="py-3 px-2" src={dataURL} />
                <div
                  className="absolute bottom-0 right-0 w-[20%] bg-gray-400 rounded-full p-5 sm:p-7"
                  onClick={() => removeImage(index + 1)}
                >
                  <Close imageIndex={index} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="h-screen flex justify-center items-center flex-col">
            <EmptyGalleryIcon />
            <div className="text-gray-300 text-center mt-3 px-3 sm:text-lg text-sm">
              Oops! looks like there are no images in your document right now,
              go back and click a few
            </div>
          </div>
        )}
      </AnimatePresence>
      <button
        key="pdf"
        className="text-white border-2 border-white m-3 p-1"
        onClick={handleGeneratePdfFromImages}
      >
        GENERATE PDF
      </button>
    </div>
  );
};

export default Gallery;
