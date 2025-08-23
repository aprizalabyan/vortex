import React, { useId } from 'react'

import { InputText } from 'primereact/inputtext'

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  type?: string,
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAppend?: () => void;
}

const ComponentInputText: React.FC<Props> = ({ label, placeholder, value, onChange }) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2 text-sm text-black">
      <label htmlFor={inputId} className='font-semibold'>{label}</label>
      <InputText
        id={inputId}
        placeholder={placeholder}
        value={value}
        className='border-gray-200 border rounded-md py-1.5 px-3'
        onChange={onChange}
      />
    </div>
  )
}

export default ComponentInputText