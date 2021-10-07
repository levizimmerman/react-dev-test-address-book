import React from "react";

import $ from "./Radio.module.css";

const Radio = ({ children, id, name, onChange }) => {
  return (
    <div className={$.radio}>
      <input type="radio" id={id} name={name} onChange={onChange} value={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
