import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { signupService } from "../services/signupService";
import { signupType } from "@bibek-samal/bibeblog-common";

const Signup = () => {
  //handel the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>();

  //handel submition of form
  const onSubmit: SubmitHandler<signupType> = async (data) => {
    const signupRes = await signupService(data);
    console.log(signupRes);
  }
  

  const [showPass, setShowPass] = useState(false);

  return (
    <section className="bg-black lg:w-9/12 md:w-10/12 w-full m-auto  grid md:grid-cols-2 grid-cols-1 relative h-max  my-4 ">
      <div className="img h-screen relative    overflow-hidden ">
        <div className="img-con h-full relative ">
          <img
            src="https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="overlap absolute h-full w-full top-0 bg-gradient-to-t from-black to-transparent opacity-95 hover:opacity-100  duration-500"></div>
        <div className="text absolute w-full h-1/3 bottom-0 text-white flex justify-center hover:bottom-5 duration-700">
          <div>
            <h1 className="text-4xl mb-4 font-bold">Signup to Bibeblog</h1>
            <p className="text-center text-xl font-semibold">
              Create and explore blogs
            </p>
          </div>
        </div>
      
      </div>
      <div className="form    h-full relative text-white flex ">
        {/* formstart */}
        <form
          className="form  lg:w-11/12 m-auto w-full px-2 mt-4 md:mt-0  flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="heading mb-4">
            <h1 className="lg:text-4xl font-bold text-xl mb-2">
              Signup to BibeBlog
            </h1>
            <p className="text-lg font-thin text-gray-300">
              Already have account{" "}
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer  hover:underline ">
                signin
              </span>
            </p>
          </div>
          <div className="full-name flex flex-col gap-2">
            <label className="lg:text-xl text-lg">Full name</label>
            <div className="ip-outer">
              <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
                <div className="logo lg:text-2xl text-xl font-bold px-2 ">
                  <MdDriveFileRenameOutline />
                </div>
                <input
                  type="text"
                  className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent "
                  placeholder="Enter full name"
                  {...register("fullName", { required: true })}
                />
              </div>
              <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
                {errors.fullName && "Name is required"}
              </div>
            </div>
          </div>
          <div className="email flex flex-col gap-2">
            <label className="lg:text-xl text-lg">Email</label>
            <div className="ip-outer">
              <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
                <div className="logo lg:text-2xl text-xl font-bold px-2 ">
                  <MdEmail />
                </div>
                <input
                  type="text"
                  className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent"
                  placeholder="Enter email address"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
                {errors.email && "Email must requered"}
              </div>
            </div>
          </div>
          <div className="userName flex flex-col gap-2">
            <label className="lg:text-xl text-lg">User name</label>
            <div className="ip-outer">
              <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
                <div className="logo lg:text-2xl text-xl font-bold px-2 ">
                  <IoPerson />
                </div>
                <input
                  type="text"
                  className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent"
                  placeholder="Enter email address"
                  {...register("userName", {
                    required: {
                      value: true,
                      message: "user name must required",
                    },
                    validate: (value) =>
                      !/\s/.test(value) || "user name must not contain spaces",
                  })}
                />
              </div>
              <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
                {errors.userName && errors.userName?.message}
              </div>
            </div>
          </div>
          <div className="password flex flex-col gap-2">
            <label className="lg:text-xl text-lg">Password</label>
            <div className="ip-outer">
              <div className="ip py-4 text-gray-300 flex items-center border border-transparent focus-within:border-white focus-within:bg-inherit bg-[#16181c] transition-all duration-300">
                
                <label htmlFor="pass" className="logo lg:text-2xl text-xl font-bold px-2 cursor-pointer text-indigo-500 hover:text-indigo-600 duration-300 ">{showPass ? <IoEyeSharp /> : <IoEyeOffSharp />}</label>
                <input type="checkbox" name="pass" id="pass" className="hidden" onChange={()=>setShowPass(!showPass)}/>
                <input
                  type={showPass ? "text" : "password"}
                  className="outline-none py-1 pl-2 lg:text-xl text-lg w-full bg-transparent"
                  placeholder="Enter password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password must required",
                    },
                    minLength: { value: 8, message: "password is too sort" },
                    validate: (value) =>
                      !/\s/.test(value) || "Password must not contain spaces",
                  })}
                />
              </div>
              <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
                {errors.password && errors.password?.message}
              </div>
            </div>
          </div>

          {/* button for signup */}
          <button
            className="bg-indigo-500 py-2 lg:text-2xl text-xl font-bold text-gray-300 hover:text-white hover:bg-indigo-600 duration-300"
            type="submit"
          >
            Sign up
          </button>
          <button className="bg-indigo-500 py-2 lg:text-2xl text-xl font-bold text-gray-300 hover:text-white hover:bg-indigo-600 duration-300 relative ">
            <div className="gle-lgo h-full top-0 left-4 absolute flex items-center ">
              <FaGoogle />
            </div>
            signup using google
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
