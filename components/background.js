import CircleElement from "../assets/circle-element";

const Background = () => {
  return (
    <div className="absolute h-screen w-screen">
      <CircleElement dim={40} />
    </div>
  );
};

export default Background;
