import React, { FC } from 'react'

type InputType = {
    placeholder?: string

    name?: string
    type?: string
    error?: boolean
}

const Input: FC<InputType> = (props: InputType) => {
    const { error, name, placeholder, type = 'text' } = props
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-3 mt-5 text-base bg-gray-200 rounded-lg   border  ${error ? 'border-red-600 outline-red-500' : 'outline-none'} `}
        />
    )
}

export default Input
