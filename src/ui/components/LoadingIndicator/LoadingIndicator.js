import React from "react";

import $ from "./LoadingIndicator.module.css";

const LoadingIndicator = ({ isLoading = false }) => {
  if (!isLoading) return null;
  return (
    <div className={$["loading-spinner"]}>
      <div className={$["spinner"]}></div>
    </div>
  );
};

export default LoadingIndicator;
