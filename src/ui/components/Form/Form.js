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

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>🏠 Find an address</legend>
           <div className="form-row">
              <InputText
                name="zipCode"
                onChange={handleZipCodeChange}
                placeholder="Zip Code"
                value={zipCode}
              />
            </div>
            <div className="form-row">
              <InputText
                name="houseNumber"
                onChange={handleHouseNumberChange}
                value={houseNumber}
                placeholder="House number"
              />
          <Button type="submit" variant="primary" onClick={handleClick}>
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
