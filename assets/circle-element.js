import { motion } from "framer-motion";

const CircleElement = ({ dim, x, y, pad = false, del }) => {
  return (
    <motion.div
      className="relative rounded-full bg-white z-0"
      style={{
        width: dim,
        height: dim,
        opacity: 0.3,
        top: `${y}%`,
        left: `${x}%`,
        backgroundClip: "content-box",
        border: `${dim / 12}px solid white`,
        padding: pad ? `${pad}px` : "20px",
      }}
      animate={{
        width: [dim, dim + 10, dim - 10, dim],
        height: [dim, dim + 10, dim - 10, dim],
      }}
      transition={{
        repeatDelay: del,
        repeat: Infinity,
        duration: 5,
      }}
    ></motion.div>
  );
};

export default CircleElement;
