import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
}) => {
  const classNames = `${$.button} ${variant === "primary" ? $.primary : $.secondary }`;

  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={classNames}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
