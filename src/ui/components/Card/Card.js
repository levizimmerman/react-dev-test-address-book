import React from "react";

import $ from "./Card.module.css";

const Card = ({ children }) => {
  return <div className={$.card}>{children}</div>;
};

export default Card;
