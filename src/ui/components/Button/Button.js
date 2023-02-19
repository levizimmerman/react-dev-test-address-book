import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
}) => {
  let BtnClassName = null;

  if(variant === "primary"){
    BtnClassName = $.primary;
  }
  else if(variant === "secondary"){
    BtnClassName = $.secondary;
  }
  else{
    BtnClassName = null;
  }
  
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={`${$.button} ${BtnClassName}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
