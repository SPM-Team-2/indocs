import { useState } from "react";
import Slider from "react-input-slider";

const FilterSlider = ({ valueSetter }) => {
  const [sliderVal, setSliderVal] = useState(100);

  return (
    <Slider
      axis="x"
      x={sliderVal}
      xmin={0}
      xmax={200}
      onChange={({ x }) => {
        setSliderVal(x);
        valueSetter(x);
      }}
      className="slider"
      styles={{
        track: {
          width: "90%",
        },
      }}
    />
  );
};

export default FilterSlider;
