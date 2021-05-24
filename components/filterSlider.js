import { useState } from "react";
import Slider from "react-input-slider";

const FilterSlider = ({ valueSetter }) => {
  const [sliderVal, setSliderVal] = useState(0);

  return (
    <Slider
      axis="x"
      x={sliderVal}
      xmin={-100}
      xmax={100}
      xstep={1}
      onChange={({ x }) => {
        setSliderVal(x);
        valueSetter(x.toPrecision(2));
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
