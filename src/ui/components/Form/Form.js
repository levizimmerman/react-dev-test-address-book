import React from 'react'

const Form = ({
    onSubmit,
    text,
 }) => {
  return (
    <form onSubmit={null}>
    <fieldset>
      <legend>🏠 Find an address</legend>
      {/* <div className="form-row">
        <InputText
          name="zipCode"
          onChange={handleChangeForm}
          placeholder="Zip Code"
          value={values.zipCode}
        />
      </div>
      <div className="form-row">
        <InputText
          name="houseNumber"
          onChange={handleChangeForm}
          value={values.houseNumber}
          placeholder="House number"
        />
      </div>
      <Button type="submit">Find</Button> */}
    </fieldset>
    </form>
  )
}

export default Form