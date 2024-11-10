import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const AllBlog = () => {
  //redirectio code if the user is not signed up
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/signup");
  };
  useEffect(() => {
    const tid = setTimeout(() => {
      if (!localStorage.getItem("token")) {
        redirect();
      }
    }, 500);
    return () => clearTimeout(tid);
  }, []);

  return (
    <section className="min-h-screen w-full md:w-9/12 m-auto  pt-4 md:px-16 ">
      <div className="blog h-80  flex flex-col-reverse  text-white md:flex-row border-b mb-4">
        <div className="content h-1/2 md:h-full flex flex-col gap-2 items-start md:justify-center">
          <h1 className="text-2xl md:text-4xl font-bold">This is title</h1>
          <p className="text-xl md:text-2xl font-thin h-20 md:h-24 w-full overflow-hidden text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eveniet nobis laborum iste eius optio itaque eum, recusandae nemo in nulla voluptates? Fugit ipsam voluptatibus voluptatum commodi vitae, necessitatibus eaque?</p>
          <button className="text-xl font-bold py-1 cursor-pointer hover:underline text-indigo-500 hover:text-indigo-600 duration-300">read more</button>
        </div>
        <div className="image h-1/2 md:h-full w-full flex items-center justify-center "> <div className="img h-36  w-36 md:w-48 md:h-48 bg-slate-500 rounded-full"></div> </div>
      </div>
      <div className="blog h-80  flex flex-col-reverse  text-white md:flex-row border-b mb-4">
        <div className="content h-1/2 md:h-full flex flex-col gap-2 items-start md:justify-center">
          <h1 className="text-2xl md:text-4xl font-bold">This is title</h1>
          <p className="text-xl md:text-2xl font-thin h-20 md:h-24 w-full overflow-hidden text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eveniet nobis laborum iste eius optio itaque eum, recusandae nemo in nulla voluptates? Fugit ipsam voluptatibus voluptatum commodi vitae, necessitatibus eaque?</p>
          <button className="text-xl font-bold py-1 cursor-pointer hover:underline text-indigo-500 hover:text-indigo-600 duration-300">read more</button>
        </div>
        <div className="image h-1/2 md:h-full w-full flex items-center justify-center "> <div className="img h-36  w-36 md:w-48 md:h-48 bg-slate-500 rounded-full"></div> </div>
      </div>
    </section>
  );
};

export default AllBlog;
