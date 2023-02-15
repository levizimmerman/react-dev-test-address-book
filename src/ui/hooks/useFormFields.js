import { useState } from "react";

function useFormFields(intialValue) {
  const [formData, setFormData] = useState(intialValue);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetFormFields = () => {
    setFormData(intialValue);
  };

  return { formData, handleInputChange, resetFormFields };
}

export default useFormFields;
