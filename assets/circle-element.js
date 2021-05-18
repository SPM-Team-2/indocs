const CircleElement = ({ dim, x, y, pad = false }) => {
  return (
    <div
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
    ></div>
  );
};

export default CircleElement;
