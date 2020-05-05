import React, { useState } from "react";
import Select from "react-select";

const DropDown = (props) => {
  const { options } = props;

  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption({ selectedOption }, () =>
      console.log(`Option selected:`, selectedOption)
    );
  };
  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default DropDown;
