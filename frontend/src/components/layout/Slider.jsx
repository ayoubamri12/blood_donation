import React from 'react'

export default function Slider({slides,numberOfSlides}) {
  return (
 
    <div className="flex justify-between w-80  mx-auto mt-8">
      {
        numberOfSlides.map(e=><div className={`${(slides===0 && "bg-red-700")} rounded-full bg-slate-400 w-16 p`}></div>
        )
      }
    </div>
  )
}
