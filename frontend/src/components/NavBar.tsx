import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { logedinUserInfoAtom } from "../store/atom/userInfoAtom";

import { useRecoilStateLoadable } from "recoil";
import delay from "../services/delay";
import { disableClick, enableClick } from "../services/clickDesEnb";
import { loadingAtom } from "../store/atom/loadingAtom";
import { allBlogAtom } from "../store/atom/allBlogAtom";
import { savedBlogAtom } from "../store/atom/savedBlogAtom";
import { myBlogAtom } from "../store/atom/myBlogAtom";



const NavBar = () => {
  const navigate = useNavigate();
  const [isLogedin,setIsLogedin] = useRecoilState(isLogedinAtom);

  const [userinfo,setUserinfo] =  useRecoilStateLoadable(logedinUserInfoAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  
const setAllBlogs = useSetRecoilState(allBlogAtom);
const setSavedBlogs = useSetRecoilState(savedBlogAtom);
const setMyBlogs = useSetRecoilState(myBlogAtom);

  //logout function
async  function logout(e: React.MouseEvent<HTMLButtonElement>){
  toast.error("logout the user")
  setLoading(true);
  disableClick(); //disable the click
  await delay();
  localStorage.removeItem("token");
  setUserinfo(null)
  setAllBlogs([]);
  setMyBlogs([]);
  setSavedBlogs([])
  enableClick();
  setLoading(false);
  navigate("/signin")


  
  
}

  

  return (
    // <!-- component -->
    <nav className="bg-black  shadow  w-100 px-8 md:px-auto sticky top-0 z-50">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap ">
        {/* <!-- Logo --> */}
        <NavLink
          to=""
          className="text-indigo-600 cursor-pointer md:order-1 text-2xl font-bold"
          
        >
          BibeBlog
        </NavLink>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          {/* return navbar based on user login or not */}
            {
            (isLogedin===true)? <ul className="flex justify-between text-lg font-bold ">
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/home"
              style={({ isActive}) => {
                return {
                  color: isActive ? "rgb(79 70 229)" : "rgb(107 114 128)",
                  
                };
              }}
              >Home</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/my-blog"
              style={({ isActive}) => {
                return {
                  color: isActive ? "rgb(79 70 229)" : "rgb(107 114 128)",
                  
                };
              }}
              >my'blog</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
            <NavLink to="/saved-blog"
            style={({ isActive}) => {
              return {
                color: isActive ? "rgb(79 70 229)" : "rgb(107 114 128)",
                
              };
            }}
            >Save'd blog</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/create-blog"
              style={({ isActive}) => {
                return {
                  color: isActive ? "rgb(79 70 229)" : "rgb(107 114 128)",
                  
                };
              }}
              >Create</NavLink>
            </li>
            <li className="hidden md:block md:px-4 md:py-2 hover:text-indigo-500">
              <button onClick={(e)=>{logout(e)}} >Log out</button>
            </li>
          </ul> : <div></div>
          
          }
          
        </div>
        <div className="order-2 md:order-3 md:w-60  flex items-center justify-center">
          {
            (isLogedin)?<div className="profile  flex items-center"><div className="px-2 text-xl text-gray-500 font-bold cursor-pointer hover:text-indigo-600 duration-200 hover:underline">{(userinfo.contents === null)?"":userinfo.contents.fullName}</div><div className="img border cursor-pointer h-12 w-12 rounded-full bg-[#16181c] text-indigo-500 hover:text-indigo-600 flex items-center justify-center text-2xl font-bold">{ (userinfo.contents == null)?"":<img src={userinfo.contents. profilePhoto} className="h-12 w-12 object-center object-cover rounded-full" alt=""/>}</div></div>:<NavLink to="/signin" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 font-bold">
            Log in
          </NavLink>
          }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
