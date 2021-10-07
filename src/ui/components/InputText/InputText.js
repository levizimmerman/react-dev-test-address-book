import React from "react";

import $ from "./InputText.module.css";

const InputText = ({ onChange, placeholder, value }) => {
  return (
    <input
      className={$.inputText}
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default InputText;
