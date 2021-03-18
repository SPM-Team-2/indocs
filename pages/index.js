import React, { useState, useEffect } from "react";

const Chat = (props) => {
  // let localVideoref = React.createRef();
  const width = 533,
    height = 400;
  navigator.getMedia = navigator.getUserMedia;
  const [dims, setDims] = useState(0);
  let video, canvas, context, photo;

  useEffect(() => {
    setDims({ width: window.innerWidth, height: window.innerHeight });
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    React.getDOM;
    video = document.getElementById("video");
    photo = document.getElementById("output");
    navigator.getUserMedia(
      {
        video: true,
        audio: false,
      },
      (stream) => {
        const mediaStream = new MediaStream(stream);
        video.srcObject = mediaStream;
      },
      (e) => console.log(e)
    );
    // setDimensions({ width: window.innerWidth, height: window.innerHeight });
    // setDimensions(0);
  }, []);

  const takeSnapshot = () => {
    context.drawImage(video, 0, 0);
    photo.setAttribute("src", canvas.toDataURL("image/png"));
  };
  // const takeSnapshot = () => {
  //   context.drawImage(video, 0, 0, dimensions.width / 2, dimensions.height / 2);
  //   photo.setAttribute("src", canvas.toDataURL("image/png"));
  // };

  return (
    <>
      <div>
        <video
          id="video"
          // ref={localVideoref}
          autoPlay
          style={{ display: "inline-block", verticalAlign: "top" }}
          // width={width}
          // height={height}
          // width={dimensions.width / 2}
          // height={dimensions.height / 2}
        ></video>
        <img
          id="output"
          style={{ display: "inline-block", verticalAlign: "top" }}
        ></img>
      </div>
      <canvas
        id="canvas"
        width={width}
        height={height}
        style={{ display: "none" }}
      ></canvas>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          // left: "50%",
        }}
      >
        <button id="capture" onClick={takeSnapshot}>
          CAPTURE
        </button>
      </div>
    </>
  );
};

export default Chat;
