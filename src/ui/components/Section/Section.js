import React from "react";
import cx from "classnames";

import $ from "./Section.module.css";

const Section = ({ children, variant = "light" }) => {
  return (
    <section
      className={cx($.section, {
        [$.light]: variant === "light",
        [$.dark]: variant === "dark",
      })}
    >
      {children}
    </section>
  );
};

export default Section;
