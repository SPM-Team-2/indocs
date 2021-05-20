import CircleElement from "../assets/circle-element";

const Background = () => {
  return (
    <>
      <div className="absolute h-[100vh] w-screen overflow-hidden">
        <CircleElement dim={180} y={-10} x={60} del={1} />
        <CircleElement dim={80} y={32} x={-5} pad={12} del={4} />
        <CircleElement dim={120} y={76} x={60} pad={12} del={7} />
      </div>
      <div className="absolute top-[100vh] h-[200vh] w-screen overflow-hidden">
        <CircleElement dim={180} y={9} x={60} del={3} />
        <CircleElement dim={180} y={38} x={2} del={9} />
        <CircleElement dim={300} y={75} x={60} del={15} />
      </div>
    </>
  );
};

export default Background;
