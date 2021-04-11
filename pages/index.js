import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import OcrIcon from "../assets/ocr-icon";
import Link from "next/link";
import { useStoreActions } from "easy-peasy";

const Camera = (props) => {
  const canvasRef = useRef();
  const videoRef = useRef();
  const photoRef = useRef();

  navigator.getMedia = navigator.getUserMedia;

  const [dims, setDims] = useState(0);
  // const [trigger, setTrigger] = useState(false);
  const [firstImage, setFirstImage] = useState(false);
  const { addImage } = useStoreActions((action) => action);

  const takeSnapshot = () => {
    console.log("took snapshot");
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");

    setFirstImage(true);
    resizeCanvas(canvas, video);
    if (video.videoWidth)
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // else {
    //   context.fillStyle = "#FF0000";
    //   context.fillRect(0, 0, 150, 75);
    //   console.log(canvas);
    // }
    photo?.setAttribute("src", canvas.toDataURL("image/png"));
    addImage(canvas.toDataURL("image/png"));
  };

  async function getMedia() {
    // try {
    // const stream = await navigator.mediaDevices.getUserMedia({
    //   video: {
    //     facingMode: "environment",
    //   },
    //   audio: false,
    // });

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      })
      .then((stream) => {
        // const track = stream.getVideoTracks()[0];
        video.srcObject = stream;
      })
      .catch((err) => console.error("Stream access error: " + err));

    // video.srcObject = stream;
    // } catch (err) {
    //   console.log("Stream access error: ", err);
    //   setSee(toString(err));
    // }
  }

  // useEffect(() => {
  //   const devices = await navigator.mediaDevices?.enumerateDevices();
  //   const videoDevices = devices?.filter(
  //     (device) => device.kind === "videoinput"
  //   );

  //   console.log(Navigator);
  //   const entries = Object.entries(navigator);
  //   console.log(entries);
  //   setSee(devices[0]?.kind);
  //   const options = videoDevices?.map((videoDevice) => {
  //     return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  //   });
  //   console.log(dims);
  //   cameraOptions.innerHTML = options.join("");
  // }, []);

  useEffect(() => {
    getMedia().then(
      setTimeout(() => {
        setDims({
          width: video.videoWidth,
          height: video.videoHeight,
        });
        takeSnapshot();
      }, 1000)
    );
    console.log(video.videoWidth);
    // const render = () => {
    // };
    // render();
  }, []);

  // useEffect(() => {
  //   takeSnapshot(canvas, context, video, photo);
  // }, []);

  const resizeCanvas = (canvas, video) => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  console.log("rendering", firstImage);
  console.log(dims);

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
        {/* <Footer
          firstImage={firstImage}
          dims={dims}
          photoRef={photoRef}
          takeSnapshot={takeSnapshot}
          // setTrigger={setTrigger}
        /> */}
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
              takeSnapshot();
              //   setTrigger((trigger) => !trigger);
            }}
          ></button>
          {firstImage && (
            <Link href="/gallery">
              {/* <Photo /> */}
              <img className="h-full w-auto cursor-pointer" ref={photoRef} />
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
