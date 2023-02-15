import React from "react";

import $ from "./Radio.module.css";

const Radio = ({ children, id, name, handleInputChange }) => {
  return (
    <div className={$.radio}>
      <input
        type="radio"
        id={id}
        name={name}
        onChange={handleInputChange}
        value={id}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
