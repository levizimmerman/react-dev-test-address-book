import React from "react";

import $ from "./ErrorMessage.module.css";

const ErrorMessage = ({ error }) => {
  return (
    <div className={$.error}>{error}</div>
  );
};

export default ErrorMessage;
