import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      className={cx($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
