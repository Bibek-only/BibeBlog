import React from 'react'

const CreateSkeliton = () => {
  return (
    <section className="w-3/4 max-lg:w-full py-12 my-6  m-auto flex flex-col gap-4 items-start ">
      <div className="bo h-28 w-full bg-[#16181c] rounded-2xl"></div>
      <div className="textarea  min-h-80  w-full bg-[#16181c] rounded-2xl"></div>
      <div className="btns flex items-center gap-4">
      <div className="btn h-8 w-40 bg-[#16181c] rounded-full"></div>
      <div className="btn h-8 w-32 bg-[#16181c] rounded-full"></div>
      </div>
      
    </section>
  )
}

export default CreateSkeliton
