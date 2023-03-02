import React from "react";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";

const Form = ({
  initialValues,
  formFieldNames,
  caption,
  buttonTitle,
  onSubmit,
  onChange,
}) => {

  const formatPlaceholder = (text) => {
    // split text based on capital letters
    const str = text.split(/(?=[A-Z])/).join(" ").toLowerCase();
    // Capitalize the first letter and return entire string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>{caption}</legend>
        {formFieldNames.map((formFieldName) => {
          return (
            <div className="form-row">
              <InputText
                name={formFieldName}
                onChange={onChange}
                placeholder={formatPlaceholder(formFieldName)}
                value={initialValues[formFieldName]}
              />
            </div>
          );
        })}
        <Button type="submit">{buttonTitle}</Button>
      </fieldset>
    </form>
  );
};

export default Form;
