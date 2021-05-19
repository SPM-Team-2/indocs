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

const resizeCanvas = (canvas, video) => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
};

export { getMedia, resizeCanvas };
