import React from "react";
import $ from "./index.module.css";

const ErrorMessage = (props) => {
  const { children } = props;

  return <div className={$.error}>{children}</div>;
};

export default ErrorMessage;
