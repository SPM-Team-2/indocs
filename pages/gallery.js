import { useStoreActions, useStoreState } from "easy-peasy";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Close from "../assets/close";
import LeftArrowIcon from "../assets/left-arrow";
import EmptyGalleryIcon from "../assets/empty-gallery-icon";
import generatePdf from "../utils/generatePdf";
import { createRef, useEffect, useReducer, useRef, useState } from "react";
import PdfDoneIcon from "../assets/pdf-done-icon";
// Import Swiper React components
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import FilterSlider from "../components/filterSlider";

SwiperCore.use([Navigation, Thumbs]);

const Gallery = () => {
  const canvasRef = useRef();
  const swiperRef = useRef();
  const { images } = useStoreState((state) => state);
  const { addImage, removeImage, removeAllImages } = useStoreActions(
    (action) => action
  );
  const [pdfGenerated, setPdfGenrated] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [activeSlide, setActiveSlide] = useState();
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
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

  const setFilterToImage = (image) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const _image = imageRefs.current;

    console.log(imageRefs);

    canvas.width = image.width;
    canvas.height = image.height;
    context.filter = images.map((image, i) => {
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
      {images.length > 0 ? (
        <motion.div
          className="flex mt-12 flex-wrap flex-shrink justify-center"
          layoutId="gallery"
        >
          {/* MAIN CAROUSEL */}
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            onSlideChange={(e) => setActiveSlide(e.activeIndex)}
            // loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="mySwiper2"
            ref={swiperRef}
          >
            {images.map(({ src }, index) => (
              <SwiperSlide key={src}>
                <img
                  ref={imageRefs.current[index]}
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`,
                  }}
                  className={`py-3 px-2`}
                  src={src}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* SMALL CAROUSEL */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            // freeMode={true}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className="mySwiper"
            allowTouchMove={false}
          >
            {images.map(({ src }, index) => (
              <SwiperSlide key={src}>
                <img
                  ref={imageRefs.current[index]}
                  className={`py-3 px-2 filter`}
                  src={src}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* BUTTONS */}
          {!isEditing && (
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
              <button
                className="text-white border-2 border-white m-3 p-1"
                onClick={() => removeImage(activeSlide)}
              >
                Delete
                {/* <Close imageIndex={index} /> */}
              </button>
              <button
                className="text-white border-2 border-white m-3 p-1"
                onClick={() => setIsEditing(true)}
              >
                Edit
                {/* <Close imageIndex={index} /> */}
              </button>
            </div>
          )}

          {/* SLIDERS */}
          {isEditing && (
            <div className="grid grid-cols-12 grid-rows-3 items-center w-[90%] justify-center">
              <div className="col-span-10 row-span-1 my-[0.01rem]">
                <FilterSlider valueSetter={setBrightness} />
              </div>
              <div className="col-span-10 row-span-1 my-[0.01rem]">
                <FilterSlider valueSetter={setContrast} />
              </div>
              <div className="col-span-10 row-span-1 my-[0.01rem]">
                <FilterSlider valueSetter={setGrayscale} />
              </div>
              <div
                onClick={() => setIsEditing(false)}
                className="col-start-11 col-span-2 row-span-full row-start-1 justify-self-center self-center align-middle"
              >
                <Close width={50} />
              </div>
            </div>
          )}
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
      <canvas className="w-full" ref={canvasRef}></canvas>
    </div>
  );
};

export default Gallery;
