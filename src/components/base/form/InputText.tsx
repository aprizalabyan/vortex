import React, { useId } from 'react'

import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password';

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

const ComponentInputText: React.FC<Props> = ({ label, placeholder, value, prepend, type, onChange }) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2 text-sm text-black w-full">
      {label && type === "password" ?
        <label htmlFor={inputId} className='font-semibold'>{label}</label> :
        <label htmlFor={inputId} className='font-semibold'>{label}</label>}
      <div className='flex items-center w-full'>
        {prepend && <div className='mr-2'>{prepend}</div>}
        {type === "password" ?
          <Password
            inputId={inputId}
            placeholder={placeholder}
            value={value}
            feedback={false}
            onChange={onChange}
            pt={{ root: { className: 'w-full' }, iconField: { className: 'w-full', } }}
            inputClassName='border-gray-200 border rounded-md py-1.5 px-3 w-full'
          />
          :
          <InputText
            id={inputId}
            placeholder={placeholder}
            value={value}
            className='border-gray-200 border rounded-md py-1.5 px-3 w-full'
            onChange={onChange}
          />}
      </div>
    </div>
  )
}

export default ComponentInputText