import { useState } from "react";

const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(event.target.value);
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
