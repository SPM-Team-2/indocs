import React, { useState, useEffect, useRef } from "react";
import OcrIcon from "../assets/ocr-icon";

const Camera = (props) => {
  const canvasRef = useRef();
  const videoRef = useRef();
  const photoRef = useRef();

  navigator.getMedia = navigator.getUserMedia;

  const [dims, setDims] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [firstImage, setFirstImage] = useState(false);

  const takeSnapshot = (canvas, context, video, photo) => {
    setFirstImage(true);
    resizeCanvas(canvas, video);
    if (video)
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    if (photo) photo.setAttribute("src", canvas.toDataURL("image/png"));
  };

  async function getMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      video.srcObject = stream;
    } catch (err) {
      console.log("Stream access error: ", err);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");
    setDims({
      width: video.videoWidth,
      height: video.videoHeight,
    });

    getMedia();

    const render = () => {
      takeSnapshot(canvas, context, video, photo);
    };
    render();
  }, [trigger]);

  const resizeCanvas = (canvas, video) => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  return (
    <>
      <div className="wrapper">
        <video
          id="video"
          className="mt-10"
          ref={videoRef}
          autoPlay
          style={{ display: "inline-block", verticalAlign: "top" }}
        ></video>
        <div className="w-full flex justify-between items-center mt-5 h-20 px-2">
          {firstImage && (
            <OcrIcon width={dims.width / 8} height={dims.height / 8} />
          )}
          <button
            id="capture"
            className="absolute left-0 right-0 mx-auto rounded-full w-16 h-16 border-black border-8 text-white bg-white p-2"
            style={{
              boxShadow: "0 0 0 2px white",
            }}
            onClick={() => {
              setTrigger((trigger) => !trigger);
            }}
          ></button>
          {firstImage && (
            <img
              className="h-full w-auto"
              // style={{
              //   width: dims.width / 6,
              //   height: dims.height / 6,
              // }}
              ref={photoRef}
            />
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
