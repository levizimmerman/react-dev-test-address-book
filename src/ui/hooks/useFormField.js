import { useState } from 'react';

export const useFormField = (fields) => {
  const [state, setState] = useState(fields);

  const update = (field, value) => {
    setState((state) => ({ ...state, [field]: value }));
  };

  const clear = () => {
    Object
      .keys(state)
      .forEach(key => {
        update(key, '');
      });
  };

  return [state, update, clear];
};
