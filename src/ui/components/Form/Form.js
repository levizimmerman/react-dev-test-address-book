import React from "react";
import { useForm } from "react-hook-form";
import content from "../../../content";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    zipcode: yup.string().required().min(6),
    housenumber: yup.string().required(),
  })
  .required();

function Form() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>🏠 Find an address</legend>
          {content.inputs.map((input, key) => {
            return (
              <div key={key}>
                <div className="form-row">
                  <InputText
                    name={input.name}
                    placeholder={input.label}
                    refs={register}
                    type={input.type}
                  />
                </div>
              </div>
            );
          })}
          <Button type="submit" variant="primary">
            Find
          </Button>
          <Button type="reset" variant="secondary">
            Clear all data
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
export default Form;
