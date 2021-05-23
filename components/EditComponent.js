import React, { useRef } from "react";
import ControlPoint from "./ControlPoint";
import styles from "../styles/edit.module.css";
import { useStoreState } from "easy-peasy";
import { withRouter } from "next/router";
import Close from "../assets/close-icon";
import { returnControlPoints, scanImage } from "../utils/image-processing";

const Edit = ({ router }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  const { images } = useStoreState((state) => state);
  const index = router.query.activeSlide;
  console.log(images[index])

  const imageHeight = images[index].height
  const imageWidth = images[index].width

  const windowWidth =  window.innerWidth;
  const windowHeight =  window.innerHeight;
  
  const newImageHeight = Math.floor(windowWidth*imageHeight/imageWidth)
  const newImageWidth = Math.floor(windowWidth)
  console.log(newImageHeight,newImageWidth)
  
  // let ar = returnControlPoints(imageRef.current,newImageHeight)
  // console.log(imageRef.current)
  // console.log(ar)

  // let tlX = ar[0],tlY = ar[1]
  // let trX = ar[2],trY = ar[3]
  // let brX = ar[4],brY = ar[5]
  // let blX = ar[6],blY = ar[7]

  // let newtlX = tlX-Math.ceil(newImageWidth/2),newtlY = tlY-Math.floor(newImageHeight/2)
  // let newtrX = trX-Math.ceil(newImageWidth/2),newtrY = trY-Math.floor(newImageHeight/2)
  // let newbrX = brX-Math.ceil(newImageWidth/2),newbrY = brY-Math.floor(newImageHeight/2)
  // let newblX = blX-Math.ceil(newImageWidth/2),newblY = blY-Math.floor(newImageHeight/2)
  
  // console.log(newtlX,newtlY)

  return (
    <div style={{paddingTop:"20px",height:"100vh"}}>
      <div className={styles.exit} onClick={() => router.back()}>
        X
      </div>
      <div 
        className={`${styles.container}`}
        style={{height:newImageHeight,width:newImageWidth}} 
        ref={containerRef}
      >
        <img
          className={`${styles.stackModel}`}
          src={images[index].src}
          ref={imageRef}
        />
        <div>
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
      </div>
      <div className={`${styles.button_container} ${styles.flex}`}>
        <a href="/" className={`${styles.btn} ${styles.blue}`}>
          Edit
        </a>
        <a href="/" className={`${styles.btn} ${styles.green}`}>
          Scan
        </a>
      </div>
    </div>
  );
};

export default withRouter(Edit);
