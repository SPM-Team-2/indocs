import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import OcrIcon from "../assets/ocr-icon";
import Link from "next/link";
import { useStoreActions, useStoreState } from "easy-peasy";
import { motion } from "framer-motion";

const Camera = (props) => {
  const canvasRef = useRef();
  const videoRef = useRef();
  const photoRef = useRef();

  navigator.getMedia = navigator.getUserMedia;

  const [dims, setDims] = useState(0);
  const [init, setInit] = useState(false);
  const { images } = useStoreState((state) => state);
  const { addImage } = useStoreActions((action) => action);
  const [pop, setPop] = useState(false);

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");

    resizeCanvas(canvas, video);
    if (video.videoWidth)
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    photo?.setAttribute("src", canvas.toDataURL("image/png"));
    addImage(canvas.toDataURL("image/png"));
    setPop(true);
    setTimeout(() => {
      setPop(false);
    }, 500);
  };

  async function getMedia() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => console.error("Stream access error: " + err));
  }

  useEffect(() => {
    getMedia();
    // getMedia().then(
    //   setTimeout(() => {
    //     setDims({
    //       width: video.videoWidth,
    //       height: video.videoHeight,
    //     });
    //   }, 1000)
    // );

    if (images.length > 1 && !init) {
      photoRef.current.setAttribute("src", images[images.length - 1]);
      setInit(true);
    }
  }, []);

  const resizeCanvas = (canvas, video) => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  return (
    <>
      <div className="wrapper">
        <div className="mt-10">
          <video
            id="video"
            ref={videoRef}
            autoPlay
            style={{ display: "inline-block", verticalAlign: "top" }}
          ></video>
        </div>
        <div className="w-full flex justify-between items-center mt-5 h-20 px-2 overflow-visible">
          <div className="w-3/5"></div>
          <motion.button
            initial={{ padding: "2rem" }}
            animate={{
              padding: init ? "0.5rem" : "2rem",
            }}
            id="capture"
            className="text-gray-900 absolute left-0 right-0 mx-auto rounded-full w-16 h-16 border-black border-8 bg-white p-2"
            style={{
              boxShadow: "0 0 0 2px white",
            }}
            onClick={() => {
              setInit(true);
              takeSnapshot();
            }}
          >
            <motion.div
              className={`w-14 transform  ${
                init ? "-translate-x-3" : "-translate-x-7 -translate-y-3"
              } font-extrabold`}
            >
              {/* <div className={`w-14 transform  font-extrabold`}> */}
              {init ? images.length-1 : "START"}
            </motion.div>
          </motion.button>
          {images.length > 0 && (
            <Link href="/gallery">
              {/* <Photo /> */}
              <motion.img
                animate={{
                  scale: pop ? [1, 1.4, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="h-full w-auto max-h-xl"
                ref={photoRef}
              />
            </Link>
          )}
        </div>
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{ display: "none" }}
        ></canvas>
      </div>
    </>
  );
};

export default Camera;
