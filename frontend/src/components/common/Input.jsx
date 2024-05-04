import React from 'react'

export default function Input({type,register,name,className,handler,placeholder}) {
  return ( 
    <input type={type} name={name} onChange={handler} className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  flex-1`} placeholder={placeholder} />
  )
}
