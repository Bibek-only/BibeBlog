import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
const Signup = () => {
    const [showPass,setShowPass] = useState(false);
  return (
    <section className="bg-black lg:w-9/12 md:w-10/12 w-full m-auto  grid md:grid-cols-2 grid-cols-1 relative h-screen  my-4">
      <div className="img h-full relative   overflow-hidden ">
        <div className="img-con h-full relative">
          <img src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg" alt="" className="h-full w-full object-cover"/>
        </div>
        <div className="overlap absolute h-full w-full top-0 bg-gradient-to-t from-black to-transparent opacity-95 hover:opacity-100  duration-500"></div>
        <div className="text absolute w-full h-1/3 bottom-0 text-white flex justify-center hover:bottom-5 duration-700">
        <div>
          <h1 className="text-4xl mb-4 font-bold">Signup to Bibeblog</h1>
          <p className="text-center text-xl font-semibold">Create and explore blogs</p>
        </div>
        </div>
        
      </div>
      <div className="form    h-full relative text-white flex ">
        

      <div className="form  lg:w-11/12 m-auto w-full px-2 mt-4 md:mt-0  flex flex-col gap-4">
        <div className="heading mb-4">
          <h1 className="lg:text-4xl font-bold text-xl mb-2">Signup to BibeBlog</h1>
          <p className="text-lg font-thin text-gray-300">Already have account <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer  hover:underline ">signin</span></p>
        </div>
        <div className="full-name flex flex-col gap-2">
          <label className="lg:text-xl text-lg">Full Name</label>
          <div className="ip-outer">
            <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
              <div className="logo lg:text-2xl text-xl font-bold px-2 "><IoPerson />
              </div>
              <input type="text" className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent " placeholder="Enter full name"/>
            </div>
            <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 invisible">this is error message</div>
          </div>
        </div>
        <div className="email flex flex-col gap-2">
          <label className="lg:text-xl text-lg">Email</label>
          <div className="ip-outer">
            <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
              <div className="logo lg:text-2xl text-xl font-bold px-2 "><MdEmail />
              </div>
              <input type="text" className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent" placeholder="Enter email address"/>
            </div>
            <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 invisible">this is error message</div>
          </div>
        </div>
        <div className="password flex flex-col gap-2">
          <label className="lg:text-xl text-lg">Password</label>
          <div className="ip-outer">
            <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
              <button className="logo lg:text-2xl text-xl font-bold px-2 cursor-pointer text-indigo-500 hover:text-indigo-600 duration-300" onClick={()=>{setShowPass(!showPass)}}>{(showPass)? <IoEyeSharp />: <IoEyeOffSharp/>}
              </button>
              <input type={(showPass)?"text":"password"} className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent" placeholder="Enter password" />
            </div>
            <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 invisible">this is error message</div>
          </div>
        </div>

        {/* button for signup */}
        <button className="bg-indigo-500 py-2 lg:text-2xl text-xl font-bold text-gray-300 hover:text-white hover:bg-indigo-600 duration-300">Sign up</button>
        <button className="bg-indigo-500 py-2 lg:text-2xl text-xl font-bold text-gray-300 hover:text-white hover:bg-indigo-600 duration-300 relative ">
        <div className="gle-lgo h-full top-0 left-4 absolute flex items-center ">
        <FaGoogle />
        </div>
        
        signup using google
        </button>
      </div>

      

      </div>
    </section>
  );
};

export default Signup;
