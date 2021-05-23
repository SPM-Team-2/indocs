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

const resizeCanvas = (canvas, videoWidth,videoHeight) => {
  canvas.width = videoWidth;
  canvas.height = videoHeight;
};

export { getMedia, resizeCanvas };
