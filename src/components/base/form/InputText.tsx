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
  prepend?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAppend?: () => void;
}

const ComponentInputText: React.FC<Props> = ({ label, placeholder, value, prepend, onChange }) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2 text-sm text-black">
      {label && <label htmlFor={inputId} className='font-semibold'>{label}</label>}
      <div className='flex items-center'>
        {prepend && <div className='mr-2'>{prepend}</div>}
        <InputText
          id={inputId}
          placeholder={placeholder}
          value={value}
          className='border-gray-200 border rounded-md py-1.5 px-3'
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default ComponentInputText