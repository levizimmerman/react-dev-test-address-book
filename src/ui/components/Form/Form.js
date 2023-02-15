import React from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

function Form({ legend, handleSubmit, fieldValues, buttonText }) {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        <div className="form-row">
          {fieldValues.map((items, index) => {
            return (
              <InputText
                key={index}
                name={items.name}
                placeholder={items.placeholder}
                value={items.value}
                onChange={items.handleInputChange}
              />
            );
          })}
        </div>
        <Button type="submit">{buttonText}</Button>
      </fieldset>
    </form>
  );
}

export default Form;
