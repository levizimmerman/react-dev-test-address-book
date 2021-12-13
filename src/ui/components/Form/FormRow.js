import InputText from '../InputText/InputText';

export default function FormRow({ value, setValue, placeholder, name }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="form-row">
      <InputText
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={value} />
    </div>
  );
}
