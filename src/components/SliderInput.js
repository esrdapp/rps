import React, { useState } from "react";

const SliderInput = () => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="sliderinput">
      <div className="slider-input-container">
        <input
          className="slider"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleSliderChange}
        />
        <div className="input-group">
          <input
            className="input-box"
            type="number"
            value={value}
            onChange={handleInputChange}
          />
          <button className="submit-button">ETH To Bet</button>
        </div>
      </div>
    </div>
  );
};

export default SliderInput;
