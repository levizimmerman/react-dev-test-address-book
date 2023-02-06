import $ from "./FormItem.module.css";
import InputText from "../InputText/InputText";

export default function FormItem({
   value,
   onChange,
   placeholder,
   name,
}) {
   return (
      <div className={$.formItem}>
         <InputText
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
         />
      </div>
   );
}
