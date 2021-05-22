import { motion } from "framer-motion";
import React, { useRef } from "react";
import useDraggable from "../hooks/useDraggable";
import styles from "../styles/edit.module.css";

export default function ControlPoint({
  children,
  container,
  cssClass,
  initialDX,
  initialDY,
}) {
  const controlPointRef = useRef(null);
  const [{ dx, dy }, setOffset] = useDraggable(
    controlPointRef,
    container,
    initialDX,
    initialDY
  );
//   console.log(dx, dy);

  function resolve(path, obj = self, separator = ".") {
    var properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }

  return (
    <div
      className={`${styles.controlPoint} ${resolve(cssClass, styles)}`}
      ref={controlPointRef}
    >
      {children}
    </div>
  );
}
