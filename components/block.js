const Block = ({ bigText, line2, line3, background }) => {
  return (
    <button
      className={`p-3 ${background} border-2 border-slightWhite w-[85%] rounded-lg text-left mb-5`}
    >
      <h3 className="text-3xl font-extrabold">{bigText}</h3>
      <h5>{line2}</h5>
      <h5 className="text-sm opacity-80">{line3}</h5>
    </button>
  );
};

export default Block;
