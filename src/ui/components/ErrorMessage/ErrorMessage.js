import React from "react";

import $ from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
   return (
      <div>
         <p className={$.ErrorMessage}>{message}</p>
      </div>
   );
};

export default ErrorMessage;
