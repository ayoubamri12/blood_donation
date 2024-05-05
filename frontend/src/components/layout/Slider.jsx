import React from 'react'

export default function Slider({slides,numberOfSlides}) {
  return (
 
    <div className="flex justify-between w-80  mx-auto mt-8">
      {
        numberOfSlides.map((e,i)=><div className={`${(slides===i ? "bg-red-700":"bg-slate-400")} rounded-full  w-16 p-1`}></div>
        )
      }
    </div>
  )
}
