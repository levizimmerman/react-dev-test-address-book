import React from "react";

import $ from "./Button.module.css";

const Button = ({
   children,
   onClick,
   type = "button",
   variant = "primary",
   loading,
   text,
}) => {
   let buttonClassName;

   switch (variant) {
      case "primary":
         buttonClassName = $.primary;
         break;
      case "secondary":
         buttonClassName = $.secondary;
         break;
      case "remove":
         buttonClassName = $.remove;
         break;
      default:
         break;
   }

   return (
      <button
         className={`${$.button} ${buttonClassName}`}
         type={type}
         onClick={onClick}
      >
         {loading ? "Loading..." : text}
      </button>
   );
};

export default Button;
