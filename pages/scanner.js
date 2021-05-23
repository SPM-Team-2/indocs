import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStoreActions, useStoreState } from "easy-peasy";
import { motion } from "framer-motion";
import UploadIcon from "../assets/upload";
import { getMedia, resizeCanvas } from "../utils/camera-functions";
import useBlobImage from "../utils/blob";
import { returnControlPoints, scanImage } from "../utils/image-processing";
import { useRouter } from 'next/router'

const Camera = () => {
  // * References
  const canvasRef = useRef();
  const videoRef = useRef();
  const photoRef = useRef();
  const router = useRouter()
  // const [edit,setEdit] = useState(false);

  // * Store state and functions
  const { images } = useStoreState((state) => state);
  const { addImage } = useStoreActions((action) => action);

  // * Local state
  const [init, setInit] = useState(false);
  const [pop, setPop] = useState(false);

  const { toBlob } = useBlobImage();

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");

    resizeCanvas(canvas, video.videoWidth,video.videoHeight);

    if (video.videoWidth) {
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }

    // Scan
    let ar = returnControlPoints(canvas, video.videoHeight);
    const imgMat = scanImage(canvas, ar);
    console.log(ar)
    cv.imshow(canvas, imgMat);

    toBlob(canvas, photo, video.videoWidth, video.videoHeight);
    setPop(true);
    setTimeout(() => {
      setPop(false);
    }, 500);
  };

  navigator.getMedia = navigator.getUserMedia;

  useEffect(() => {
    getMedia();

    if (images.length > 0 && !init) {
      photoRef.current.setAttribute("src", images[images.length - 1].src);
      setInit(true);
    }
  }, []);

  // Each image is loaded and an object URL is created.
  const fileToImageURL = (file) => {
    return new Promise((resolve, reject) => {
      const photo = photoRef.current;
      const image = new Image(file.type);

      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        reject(new Error("Failed to convert File to Image"));
      };

      image.src = URL.createObjectURL(file);
      photo?.setAttribute("src", image.src);
    });
  };

  const handleImageUpload = (e) => {
    const fileList = e.target.files;
    const fileArray = fileList ? Array.from(fileList) : [];

    // Uploaded images are read and the app state is updated.
    const fileToImagePromises = fileArray.map(fileToImageURL);
    Promise.all(fileToImagePromises).then((res) => {
      res.map((image) => {
        
        let imageHeight = image.naturalWidth
        let imageWidth = image.naturalWidth

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        resizeCanvas(canvas,imageWidth,imageHeight)

        let base_image = new Image();
        base_image.src = image.src;
        if (imageWidth) {
          context.drawImage(base_image, 0, 0, imageWidth, imageHeight);
        }

        let ar = returnControlPoints(canvas,imageHeight)
        const imgMat = scanImage(canvas, ar);
        console.log(ar)
        cv.imshow(canvas, imgMat);
        toBlob(canvas, photoRef.current, imageWidth, imageHeight);

      }
      );
    });
  };

  return (
    <>
      <motion.div key="wrapper" className="wrapper h-screen overflow-hidden">
        <div className="mt-10">
          <video
            id="video"
            ref={videoRef}
            autoPlay
            style={{ display: "inline-block", verticalAlign: "top" }}
          ></video>
        </div>
        <div className="w-full flex justify-between items-center mt-5 h-20 px-2 overflow-visible">
          <div className="w-14">
            <label>
              <UploadIcon />
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                // Native file input is hidden only for styling purposes
                style={{ display: "none" }}
                multiple
              />
            </label>
          </div>
          <motion.button
            initial={{ padding: "2rem" }}
            animate={{
              padding: init ? "0.5rem" : "2rem",
            }}
            id="capture"
            className="text-gray-900 absolute left-0 right-0 mx-auto rounded-full w-16 h-16 border-black border-8 bg-white p-2 overflow-hidden"
            style={{
              boxShadow: "0 0 0 2px white",
            }}
            onClick={() => {
              setInit(true);
              takeSnapshot();
              // editPage();
            }}
          >
            <motion.div
              className={`w-14 transform  ${init ? "-translate-x-3" : "-translate-x-7 -translate-y-3"
                } font-extrabold`}
            >
              {/* <div className={`w-14 transform  font-extrabold`}> */}
              {/* {images.length > 0 ? images.length : ""} */}
              {init ? images.length : ""}
            </motion.div>
          </motion.button>
          {/* {images.length > 0 && ( */}
          <Link href="/gallery">
            <motion.img
              layoutId="gallery"
              animate={{
                scale: pop ? [1, 1.4, 1] : 1,
              }}
              transition={{
                duration: 0.3,
              }}
              className={`w-16 h-[80%] max-w-xs max-h-xl border-none bg-gray-900`}
              ref={photoRef}
            />
          </Link>
        </div>
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{ display: "none" }}
        ></canvas>
      </motion.div>
    </>
  );
};

export default Camera;
