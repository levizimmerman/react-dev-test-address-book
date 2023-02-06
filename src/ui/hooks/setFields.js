import { useState } from "react";

function useFormFields(initialState) {
   const [fields, setFields] = useState(initialState);

   function handleFieldChange(event) {
      setFields({
         ...fields,
         [event.target.name]:
            event.target.value || event.target.checked,
      });
   }

   function resetFields() {
      setFields(initialState);
   }

   return [fields, handleFieldChange, resetFields];
}

export default useFormFields;
