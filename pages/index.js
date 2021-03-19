import React, { useState, useEffect, useRef } from "react";


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
    resizeCanvas(canvas);
    if (video)
      context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    if (photo) photo.setAttribute("src", canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    setDims({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");

    navigator.getUserMedia(
      {
        video: {
          facingMode: "environment",
        },
        audio: false,
      },
      (stream) => {
        const mediaStream = new MediaStream(stream);
        video.srcObject = mediaStream;
      },
      (e) => console.log(e)
    );

    const render = () => {
      takeSnapshot(canvas, context, video, photo);
    };
    render();
  }, [trigger]);

  const resizeCanvas = (canvas) => {
    canvas.width = dims.width;
    canvas.height = dims.height;
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
        <div className="w-full flex justify-center">
          <button
            id="capture"
            className="rounded-full w-16 h-16 border-white border-2 my-5"
            onClick={() => {
              setTrigger((trigger) => !trigger);
            }}
          >
            CAPTURE
          </button>
        </div>
        {firstImage && (
          <img
            id="output"
            className="mb-5"
            ref={photoRef}
            style={{ display: "inline-block", verticalAlign: "top" }}
          ></img>
        )}
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
