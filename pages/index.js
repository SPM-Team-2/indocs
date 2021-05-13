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
  const [loadFooter, setLoadFooter] = useState(false);
  const { images } = useStoreState((state) => state);
  const { addImage } = useStoreActions((action) => action);

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
    getMedia().then(
      setTimeout(() => {
        setDims({
          width: video.videoWidth,
          height: video.videoHeight,
        });
        // takeSnapshot();
      }, 1000)
    );

    if (images.length > 0) setLoadFooter(true);
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
        <div className="w-full flex justify-between items-center mt-5 h-20 px-2">
          {images.length > 0 && (
            <OcrIcon
              width={dims ? dims.width / 8 : "80%"}
              height={dims ? dims.height / 8 : "80%"}
            />
          )}
          <button
            id="capture"
            className="text-gray-900 absolute left-0 right-0 mx-auto rounded-full w-16 h-16 border-black border-8 text-white bg-white p-2"
            style={{
              boxShadow: "0 0 0 2px white",
            }}
            onClick={() => {
              takeSnapshot();
              //   setTrigger((trigger) => !trigger);
            }}
          >Hi</button>
          {images.length > 0 && (
            <Link href="/gallery">
              {/* <Photo /> */}
              <img className="h-full w-auto" ref={photoRef} />
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
