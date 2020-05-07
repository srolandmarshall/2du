import React from "react";
import DropDown from "./DropDown.jsx";

const GistPicker = (props) => {
  const labelFunction = (gist) => {
    return `${gist.id}: ${gist.description}`;
  };
  const valueFunction = (gist) => {
    try {
      return `${gist.id}`;
    } catch (error) {
      console.log(error);
    }
  };

  const { gists, setSelectedGist } = props;
  const onChange = (gistId) => {
    const gist = gists.find((gist) => gist.id === gistId);

    setSelectedGist(gist);
  };
  return (
    <DropDown
      labelFunction={labelFunction}
      valueFunction={valueFunction}
      onChange={onChange}
      options={gists}
      name="gist"
    />
  );
};

export default GistPicker;
