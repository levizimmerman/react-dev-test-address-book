import React from "react";
import Button from "../Button/Button";

const Form = ({
   onSubmit,
   buttonText,
   legend,
   buttonLoading,
   children,
}) => {
   return (
      <>
         <form onSubmit={onSubmit}>
            <fieldset>
               {legend && <legend>{legend}</legend>} {children}
               <Button
                  loading={buttonLoading}
                  text={buttonText}
                  type="submit"
               />
            </fieldset>
         </form>
      </>
   );
};

export default Form;
