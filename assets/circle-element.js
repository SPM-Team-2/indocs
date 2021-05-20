import { motion } from "framer-motion";

const CircleElement = ({ dim, x, y, pad = false, del }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white z-0"
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
        width: [dim, dim + dim / 15, dim - dim / 15, dim],
        height: [dim, dim + dim / 15, dim - dim / 15, dim],
      }}
      transition={{
        repeatDelay: del,
        repeat: Infinity,
        duration: 30,
        type: 'inertia'
      }}
    ></motion.div>
  );
};

export default CircleElement;
