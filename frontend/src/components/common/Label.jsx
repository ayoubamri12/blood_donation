import React from 'react'

export default function Label({label,className}) {
  return (
    <label className={`${className} block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>{label}</label>
  )
}
