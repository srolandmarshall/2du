import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import { useLocalStorage } from "../App.js";

const DropDown = (props) => {
  const { options, name, labelFunction, valueFunction, onChange } = props;
  const [selectedOption, setSelectedOption] = useState(
    valueFunction(options[0])
  );
  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);
  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
  };
  return (
    <select onChange={handleChange} id={`${name}-picker`} name={name}>
      {options.map((item, index) => {
        return (
          <option key={`${name}-option-${index}`} value={valueFunction(item)}>
            {labelFunction(item)}
          </option>
        );
      })}
    </select>
  );
};

export default DropDown;
