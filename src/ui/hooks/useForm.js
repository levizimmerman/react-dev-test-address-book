import {useState} from 'react'

const useForm = (initialValues) => {
  const [formInput, setFormInput] = useState(initialValues);

  const handleChangeForm = e => {
    setFormInput(formInput =>({...formInput, [e.target.name]: e.target.value }))
  }

  const handleClearForm = () => {
    setFormInput(initialValues)
  }

  return {formInput, handleChangeForm, handleClearForm}
}

export default useForm