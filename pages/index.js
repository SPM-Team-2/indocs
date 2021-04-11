import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";

const Camera = (props) => {
  const canvasRef = useRef();
  const videoRef = useRef();
  const photoRef = useRef();

  navigator.getMedia = navigator.getUserMedia;

  const [dims, setDims] = useState(0);
  // const [trigger, setTrigger] = useState(false);
  const [firstImage, setFirstImage] = useState(false);

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");

    setFirstImage(true);
    resizeCanvas(canvas, video);
    if (video)
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    if (photo) photo.setAttribute("src", canvas.toDataURL("image/png"));
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
    getMedia();
    setDims({
      width: video.videoWidth,
      height: video.videoHeight,
    });
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
        <Footer
          firstImage={firstImage}
          dims={dims}
          photoRef={photoRef}
          takeSnapshot={takeSnapshot}
          // setTrigger={setTrigger}
        />
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
