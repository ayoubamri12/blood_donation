import React from 'react'

export default function CounterBtn({children,onClick}) {
  return (
    <button type='button' onClick={onClick} className='border rounded border-gray-400  w-10 h-10 flex justify-center items-center'>{children}</button>
  )
}
