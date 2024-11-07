

const CreateBlog = () => {
  return (
    <section className="w-3/4 max-lg:w-full lg:h-screen my-6  m-auto flex flex-col gap-4 items-start">
      <input type="text" placeholder="Title" className="text-6xl max-lg:text-2xl font-roboto 
    outline-none p-4 bg-gray-950 text-white w-full"/>
      <textarea name="Write" id="" placeholder="express" className="text-gray-300 min-h-80 p-4 text-4xl max-lg:text-xl font-roboto italic bg-gray-950 outline-none w-full">
      </textarea>
      <div className="btns flex items-center gap-4">
        <div className="file-upload">
          <label htmlFor="file-up" className="bg-indigo-500 hover:bg-indigo-600 text-2xl px-6 py-2 rounded-2xl font-bold text-gray-300 hover:text-white max-lg:ml-2 max-lg:text-xl" > select cover Img</label>
          <input type="file" id="file-up" name="file-up" className="hidden"/>
        </div>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-2xl px-6 py-2 rounded-2xl font-bold text-gray-300 hover:text-white max-lg:ml-2 max-lg:text-xl">Create</button>
      </div>
      
    </section>
  )
}

export default CreateBlog
