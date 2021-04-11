import React from "react";
import OcrIcon from "../assets/ocr-icon";
import Link from "next/link";

function Footer({ firstImage, dims, photoRef, takeSnapshot }) {
  console.log(firstImage);
  return (
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
          <img className="h-full w-auto cursor-pointer" ref={photoRef} />
        </Link>
      )}
    </div>
  );
}

export default Footer;
