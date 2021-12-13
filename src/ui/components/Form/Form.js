import React from 'react';
import Button from '../Button/Button';

export default function Form({ children, onSubmit, legend, buttonText = 'Submit' }) {
  return <>
    <form onSubmit={onSubmit}>
      <fieldset>
        {legend && <legend>{legend}</legend>} {children} <Button type="submit">{buttonText}</Button>
      </fieldset>
    </form>
  </>;
}
