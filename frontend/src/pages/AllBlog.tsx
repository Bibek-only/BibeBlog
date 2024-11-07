

const AllBlog = () => {
  return (
    <section className="min-h-screen w-full  lg:w-10/12  m-auto lg:flex ">
      <div className="savedBlog  w-full lg:w-1/3 text-black flex flex-col">
        <div className=" top-16 sticky">
        <h1 className="text-indigo-500 text-xl font-bold mb-4">Saved blog's</h1>
        <div className=" saved-blog-card bg-gray-950 text-white p-2  flex gap-2">
          <img src="https://tse4.mm.bing.net/th?id=OIP.7ITF2gx8_a3s4NbnDOpZzAHaHa&pid=Api&P=0&h=180" alt="" className="h-24 w-24 object-fit"/>
          <div className="info flex flex-col justify-start items-start gap-1">
          <div className="title font-bold">how to become a good dev</div>
          <p className="text-gray-100 font-semibold"><span className="font-bold">Author:</span> Bibek samal</p>
          <button className="px-2 py-1 rounded-lg bg-indigo-500 font-thin text-gray-100 hover:bg-indigo-600 hover:text-white">Read</button>
          </div>
        </div>
        <div className=" saved-blog-card bg-gray-950 text-white p-2 mt-1 flex gap-2">
          <img src="https://tse4.mm.bing.net/th?id=OIP.7ITF2gx8_a3s4NbnDOpZzAHaHa&pid=Api&P=0&h=180" alt="" className="h-24 w-24 object-fit"/>
          <div className="info flex flex-col justify-start items-start gap-1">
          <div className="title font-bold">how to become a good dev</div>
          <p className="text-gray-100 font-semibold"><span className="font-bold">Author:</span> Bibek samal</p>
          <button className="px-2 py-1 rounded-lg bg-indigo-500 font-thin text-gray-100 hover:bg-indigo-600 hover:text-white">Read</button>
          </div>
        </div>
        
        
        </div>
        
        
      </div>
      <div className="Allblog w-full lg:w-2/3 lg:pl-2   ">
      <h1 className="text-indigo-500 text-xl font-bold">All blog's</h1>
      <div className="blog-card lg:h-72 relative bg-gray-950 lg:flex lg:gap-2 lg:items-center">
        
        <div className="img lg:h-72 lg:w-80 relative flex items-center">
          <div className="lg:hidden overlap h-60 w-80 absolute z-10 bg-black opacity-60"></div>
        <img src="https://preview.redd.it/zfohxnf8t3pa1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=0f660e0a56476991ee3b97f2885d8c010fec5b97" alt="" className="rounded-lg h-60 w-80"/>
        </div>
        <div className="info text-black lg:flex flex-col items-start gap-2 max-lg:absolute max-lg:bottom-2 max-lg:left-2 z-20">
        <p className="text-gray-100 text-xl font-semibold">Published on: <span className="text-lg text-gray-300">13 jun 2022</span></p>
        <p className="text-gray-100 text-xl font-semibold">Author: <span className="text-lg text-gray-300">Bibke samal</span></p>
        <h1 className="text-gray-100 text-xl font-semibold">How to become a good dev</h1>
        <button className="px-6 py-2 rounded-xl text-xl bg-indigo-500 font-semi-bold text-gray-100 hover:bg-indigo-600 hover:text-white">Read</button>
        </div>
      </div>
      
      
          
      </div>
    </section>
  )
}

export default AllBlog
