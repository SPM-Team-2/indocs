import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStoreActions, useStoreState } from "easy-peasy";
import { motion } from "framer-motion";
<<<<<<< HEAD
import firebase from '../Handlers/firebaseHandler'

firebase()
=======
import UploadIcon from "../assets/upload";
>>>>>>> 62f0727d045d7b6a9e79f77114dcb5f606861571

const Camera = (props) => {
  const canvasRef = useRef();
  const videoRef = useRef();
  const photoRef = useRef();

  navigator.getMedia = navigator.getUserMedia;

  const [init, setInit] = useState(false);
  const { images } = useStoreState((state) => state);
  const { addImage } = useStoreActions((action) => action);
  const [pop, setPop] = useState(false);

  // class CustomImage extends Image {
  //   constructor() {
  //     super();
  //   }

  //   // `imageType` is a required input for generating a PDF for an image.
  //   get imageType() {
  //     return this.mimeType.split("/")[1];
  //   }
  // }

  const takeSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = canvas.getContext("2d");

    resizeCanvas(canvas, video);
    if (video.videoWidth)
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // photo?.setAttribute("src", canvas.toDataURL("image/png"));
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      photo?.setAttribute("src", url);
      addImage(url);
      console.log(url);
    });
    // photo?.setAttribute(
    //   "src",
    //   canvas.toBlob((blob) => blob)
    // );
    // addImage(canvas.toDataURL("image/png"));
    // addImage(canvas.toBlob((blob) => blob));
    setPop(true);
    setTimeout(() => {
      setPop(false);
    }, 500);
  };

  // const getUploadedImg = (img) => {
  //   const canvas = canvasRef.current;
  //   const video = videoRef.current;
  //   const photo = photoRef.current;
  //   const context = canvas.getContext("2d");

  //   if (img) context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //   // photo?.setAttribute("src", canvas.toDataURL("image/png"));
  //   // addImage(canvas.toDataURL("image/png"));
  // };

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

    if (images.length > 1 && !init) {
      photoRef.current.setAttribute("src", images[images.length - 1]);
      setInit(true);
    }
  }, []);

  const resizeCanvas = (canvas, video) => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

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
      addImage(image.src);
      console.log(image.src);
    });
  };

  const handleImageUpload = (e) => {
    const fileList = e.target.files;
    const fileArray = fileList ? Array.from(fileList) : [];

    // Uploaded images are read and the app state is updated.
    const fileToImagePromises = fileArray.map(fileToImageURL);
    Promise.all(fileToImagePromises).then((res) => console.log(res));
  };

  return (
    <>
      <motion.div key="wrapper" className="wrapper">
        <div className="mt-10">
          <video
            id="video"
            ref={videoRef}
            autoPlay
            style={{ display: "inline-block", verticalAlign: "top" }}
          ></video>
        </div>
        <div className="w-full flex justify-between items-center mt-5 h-20 px-2 overflow-visible">
          {/* <div className="w-3/5"></div> */}
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
            }}
          >
            <motion.div
              className={`w-14 transform  ${
                init ? "-translate-x-3" : "-translate-x-7 -translate-y-3"
              } font-extrabold`}
            >
              {/* <div className={`w-14 transform  font-extrabold`}> */}
              {init ? images.length - 1 : "START"}
            </motion.div>
          </motion.button>
          {images.length > 0 && (
            <Link href="/gallery">
              {/* <Photo /> */}
              <motion.img
                layoutId="gallery"
                animate={{
                  scale: pop ? [1, 1.4, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`w-16 h-[80%] max-w-xs max-h-xl ${
                  images.length > 1 && "border-2 border-gray-200"
                } p-1`}
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg%20id%3D%22a338e755-f6c7-45a0-8ec7-0e8a92e33cf6%22%20data-name%3D%22Layer%201%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22816.22237%22%20height%3D%22700.597%22%20viewBox%3D%220%200%20816.22237%20700.597%22%3E%3Cpath%20d%3D%22M772.0209%2C797.89518a34.81426%2C34.81426%2C0%2C0%2C1-16.74561-4.30859L278.867%2C533.04069a35.03942%2C35.03942%2C0%2C0%2C1-13.9137-47.50147L466.00063%2C117.924a34.99945%2C34.99945%2C0%2C0%2C1%2C47.50171-13.91358l476.4082%2C260.5459a35.03913%2C35.03913%2C0%2C0%2C1%2C13.91382%2C47.50147L802.777%2C779.673a34.7714%2C34.7714%2C0%2C0%2C1-20.86914%2C16.79492A35.147%2C35.147%2C0%2C0%2C1%2C772.0209%2C797.89518Zm-13.8667-9.57227a29.00079%2C29.00079%2C0%2C0%2C0%2C39.35864-11.5288L998.5602%2C409.17887A29.03345%2C29.03345%2C0%2C0%2C0%2C987.03164%2C369.82L510.62344%2C109.27409a29.00081%2C29.00081%2C0%2C0%2C0-39.35865%2C11.5288L270.21743%2C488.41813A29.03335%2C29.03335%2C0%2C0%2C0%2C281.746%2C527.777Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%23f2f2f2%22%2F%3E%3Cpath%20d%3D%22M781.84414%2C669.32487a32.70567%2C32.70567%2C0%2C0%2C1-15.68262-4.0166L380.99917%2C454.66471a32.46947%2C32.46947%2C0%2C0%2C1-12.91992-44.1084L488.151%2C191.005a32.49693%2C32.49693%2C0%2C0%2C1%2C44.10865-12.91992L917.42226%2C388.72868a32.49758%2C32.49758%2C0%2C0%2C1%2C12.91993%2C44.10839l-.43873-.23974.43873.23974L810.27041%2C652.38834A32.3643%2C32.3643%2C0%2C0%2C1%2C781.84414%2C669.32487Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%23f2f2f2%22%2F%3E%3Cpath%20d%3D%22M769.88882%2C797.7985h-543a32.53692%2C32.53692%2C0%2C0%2C1-32.5-32.5v-419a32.53692%2C32.53692%2C0%2C0%2C1%2C32.5-32.5h543a32.53685%2C32.53685%2C0%2C0%2C1%2C32.5%2C32.5v419A32.53685%2C32.53685%2C0%2C0%2C1%2C769.88882%2C797.7985Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M769.88882%2C800.2985h-543a35.03947%2C35.03947%2C0%2C0%2C1-35-35v-419a35.03947%2C35.03947%2C0%2C0%2C1%2C35-35h543a35.03947%2C35.03947%2C0%2C0%2C1%2C35%2C35v419A35.03947%2C35.03947%2C0%2C0%2C1%2C769.88882%2C800.2985Zm-543-483a29.03275%2C29.03275%2C0%2C0%2C0-29%2C29v419a29.03275%2C29.03275%2C0%2C0%2C0%2C29%2C29h543a29.03276%2C29.03276%2C0%2C0%2C0%2C29-29v-419a29.03276%2C29.03276%2C0%2C0%2C0-29-29Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%23e6e6e6%22%2F%3E%3Cpath%20d%3D%22M582.89156%2C451.586a40.76358%2C40.76358%2C0%2C0%2C0-32.55116%2C16.18593%2C26.83976%2C26.83976%2C0%2C0%2C0-37.44912%2C24.64757H623.72505A40.83342%2C40.83342%2C0%2C0%2C0%2C582.89156%2C451.586Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%23e6e6e6%22%2F%3E%3Ccircle%20cx%3D%22148.19669%22%20cy%3D%22445.96036%22%20r%3D%2265.75727%22%20fill%3D%22%236c63ff%22%2F%3E%3Cpath%20d%3D%22M725.24868%2C681.17851a31.87811%2C31.87811%2C0%2C0%2C1-7.35986.85h-439a31.87492%2C31.87492%2C0%2C0%2C1-15.46-3.97l1.16992-1.68%2C48.98-70.53%2C72.58008-104.49%2C1.06-1.53%2C11.41993-16.44a8.33693%2C8.33693%2C0%2C0%2C1%2C13.70019%2C0l37.93994%2C54.61v.01l22.31983%2C32.14%2C53.28027%2C76.7%2C80.80957-115.35a8.34782%2C8.34782%2C0%2C0%2C1%2C13.68018%2C0l51.83984%2C73.99%2C2.98%2C4.25Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%233f3d56%22%2F%3E%3Cpath%20d%3D%22M495.61848%2C519.76805A50.29271%2C50.29271%2C0%2C0%2C0%2C455.458%2C539.7377%2C33.114%2C33.114%2C0%2C0%2C0%2C409.2545%2C570.147h136.743A50.3789%2C50.3789%2C0%2C0%2C0%2C495.61848%2C519.76805Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%23ccc%22%2F%3E%3Cpath%20d%3D%22M717.88882%2C683.02848h-439a32.97007%2C32.97007%2C0%2C0%2C1-33-33V399.78873a33.03734%2C33.03734%2C0%2C0%2C1%2C33-33h439a33.03734%2C33.03734%2C0%2C0%2C1%2C33%2C33V650.02848a32.96211%2C32.96211%2C0%2C0%2C1-33%2C33Zm-439-314.23975a31.0352%2C31.0352%2C0%2C0%2C0-31%2C31V650.02848a30.97077%2C30.97077%2C0%2C0%2C0%2C31%2C31h439a30.9637%2C30.9637%2C0%2C0%2C0%2C31-31V399.78873a31.03521%2C31.03521%2C0%2C0%2C0-31-31Z%22%20transform%3D%22translate(-191.88882%20-99.7015)%22%20fill%3D%22%233f3d56%22%2F%3E%3C%2Fsvg%3E")',
                }}
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
      </motion.div>
    </>
  );
};

export default Camera;
