import React, { useState } from "react";

export default function useFormFields(initialValues) {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e)  => {
    const { name, value } = e.target;
    setValues((prevValues) => ({...prevValues, [name]: value }))
  }

  const clearFormFields = () => setValues(initialValues)
  
  return { values, handleChange, clearFormFields };
}
