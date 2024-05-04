import React from 'react'

export default function Container({children}) {
  return (
    <div className="border rounded-xl shadow-xl w-3/4  mx-auto mt-7 p-7 mb-7 ">
      {children}
    </div>
  )
}
