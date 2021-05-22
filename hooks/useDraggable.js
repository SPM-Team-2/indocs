import { useState, useEffect } from "react";

export default function useDraggable(el, container, initialDX, initialDY) {
  const [{ dx, dy }, setOffset] = useState({ dx: initialDX, dy: initialDY });

  useEffect(() => {
    const handleMouseDown = event => {
      let startX = null;
      let startY = null;

      if (event.type === "touchmove" || event.type === "touchstart") {
        startX = event.touches[0].pageX - dx;
        startY = event.touches[0].pageY - dy;
      }
      else {
        startX = event.pageX - dx;
        startY = event.pageY - dy;
      }
      const handleMouseMove = event => {
        if (event.type === "touchmove" || event.type === "touchstart") {
          const newDx = event.touches[0].pageX - startX;
          const newDy = event.touches[0].pageY - startY;
          setOffset({ dx: newDx, dy: newDy });
        } else {
          const newDx = event.pageX - startX;
          const newDy = event.pageY - startY;
          setOffset({ dx: newDx, dy: newDy });
        }
      };

      container.current.addEventListener("mousemove", handleMouseMove);
      container.current.addEventListener("touchmove", handleMouseMove);


      container.current.addEventListener(
        "mouseup", () => {
          container.current.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );

      container.current.addEventListener(
        "touchend",
        () => {
          container.current.removeEventListener("touchmove", handleMouseMove);
        },
      );
    };

    el.current.addEventListener("mousedown", handleMouseDown);
    el.current.addEventListener("touchstart", handleMouseDown);

    return () => {
      try {
        el.current.removeEventListener("mousedown", handleMouseDown);
        el.current.removeEventListener("touchstart", handleMouseDown);
      } catch (er) {
      }
    };
  }, [dx, dy]);

  useEffect(() => {
    el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, [el, container, dx, dy]);

  return [{ dx, dy }, setOffset];
}
