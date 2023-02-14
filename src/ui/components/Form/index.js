import React from "react";
import Button from "../Button/Button";

const Form = (props) => {
  const { legend, children, buttonTitle, onButtonClick } = props;
  return (
    <form>
      <fieldset>
        {legend && <legend>{legend}</legend>}
        {children}
        <Button type="submit" onClick={onButtonClick}>
          {buttonTitle}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
