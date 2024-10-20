

const MyBlog = () => {
  return (
    <section className="min-h-screen w-full  lg:w-10/12  m-auto  ">
      
      <div className="Allblog w-3/4 lg:pl-2  m-auto ">
      <h1 className="text-indigo-500 text-xl font-bold">My blog's</h1>
      <div className="blog-card lg:h-72 relative bg-black lg:bg-gray-950  lg:flex lg:gap-2 lg:items-center p-2">
        
        <div className="img lg:h-72 lg:w-80 relative flex items-center">
          <div className="lg:hidden overlap h-60 w-80 absolute z-10 bg-black opacity-60"></div>
        <img src="https://preview.redd.it/zfohxnf8t3pa1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=0f660e0a56476991ee3b97f2885d8c010fec5b97" alt="" className="rounded-lg h-60 w-80"/>
        </div>
        <div className="info text-black lg:flex flex-col items-start gap-2 max-lg:absolute max-lg:bottom-4 max-lg:left-4  z-20">
        <p className="text-gray-100 text-xl font-semibold max-lg:text-lg">Published on: <span className="text-lg max-lg:text-sm text-gray-300">13 jun 2022</span></p>
        <p className="text-gray-100 text-xl font-semibold max-lg:text-lg">Author: <span className="text-lg text-gray-300 max-lg:text-sm">Bibke samal</span></p>
        <h1 className="text-gray-100 text-xl font-semibold max-lg:text-lg">How to become a good dev</h1>
        <div className="btns flex gap-3">
        <button className="px-6 py-2 rounded-xl text-xl max-lg:text-lg bg-indigo-500 font-semi-bold text-gray-100 hover:bg-indigo-600 hover:text-white">Read</button>
        <button className="px-6 py-2 rounded-2xl text-xl max-lg:text-lg bg-indigo-500 font-semi-bold text-gray-100 hover:bg-indigo-600 hover:text-white">Published</button>
        </div>
        </div>
      </div>
      
      
          
      </div>
    </section>
  )
}

export default MyBlog
