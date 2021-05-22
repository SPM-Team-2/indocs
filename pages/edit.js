import React, { useRef } from "react";
import ControlPoint from "../components/ControlPoint";
import styles from "../styles/edit.module.css";
import { useStoreState } from "easy-peasy";
import { useRouter, withRouter } from "next/router";
import Close from "../assets/close";

const Edit = ({ router }) => {
  const containerRef = useRef(null);
  const { images } = useStoreState((state) => state);
  //   const router = useRouter();
  // const srcObject = images[0].src;
  // const srcHeight = images[0].height;
  // const srcWidth = images[0].width;
  const index = router.query.activeSlide;
  //   console.log(router.query.activeSlide);

  return (
    <div>
      <div className={styles.exit} onClick={() => router.back()}>
        <Close width={10} />
      </div>
      <div
        className=""
        style={{
          width: images[index].width / 2,
          height: images[index].height / 2,
          touchAction: "none",
        }}
        ref={containerRef}
      >
        {console.log(images[index].width, images[index].height)}
        <img
          className="absolute w-full object-cover"
          // style={{
          //   zIndex: -1,
          // }}
          src={images[index].src}
        />
        <ControlPoint
          container={containerRef}
          cssClass="top-left"
          initialDX={-10}
          initialDY={-10}
        ></ControlPoint>
        <ControlPoint
          container={containerRef}
          cssClass="top-right"
          initialDX={10}
          initialDY={-10}
        ></ControlPoint>
        <ControlPoint
          container={containerRef}
          cssClass="bottom-right"
          initialDX={50}
          initialDY={50}
        ></ControlPoint>
        <ControlPoint
          container={containerRef}
          cssClass="bottom-left"
          initialDX={-50}
          initialDY={50}
        ></ControlPoint>
      </div>
      <div className={`${styles.button_container} ${styles.flex}`}>
        <a href="/" className={`${styles.btn} ${styles.blue}`}>
          Edit
        </a>
        <a href="/" className={`${styles.btn} ${styles.green}`}>
          Scan
        </a>
      </div>
      {/* {images.map((image) => {
          return <img key={image.src} src={image.src} alt=""></img>;
        })} */}
    </div>
  );
};

export default withRouter(Edit);
