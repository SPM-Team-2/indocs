import CircleElement from "../assets/circle-element";

const Background = () => {
  return (
    <>
      <div className="absolute h-[100vh] w-screen overflow-hidden">
        <CircleElement dim={180} y={-10} x={60} />
        <CircleElement dim={80} y={12} x={-5} pad={12} />
        <CircleElement dim={120} y={30} x={60} pad={12} />
      </div>
      <div className="absolute top-[100vh] h-[200vh] w-screen overflow-hidden">
        <CircleElement dim={180} y={9} x={60} />
        <CircleElement dim={180} y={15} x={2} />
        <CircleElement dim={300} y={45} x={-50} />
      </div>
    </>
  );
};

export default Background;
