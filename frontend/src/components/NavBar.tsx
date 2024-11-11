import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useRecoilState } from "recoil";


const NavBar = () => {
  const navigate = useNavigate();
  const [isLogedin,setIsLogedin] = useRecoilState(isLogedinAtom);

  //logout function
   function logout(e: React.MouseEvent<HTMLButtonElement>){
  const button = e.target as HTMLButtonElement;
  button.disabled = true;
  toast.error("logging out",{
    duration: 500
  })
  setTimeout(()=>{
    localStorage.removeItem('token')
    setIsLogedin(false)
    navigate("/signup")
  },500)
  }

  

  return (
    // <!-- component -->
    <nav className="bg-black  shadow  w-100 px-8 md:px-auto sticky top-0 z-50">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap ">
        {/* <!-- Logo --> */}
        <NavLink
          to=""
          className="text-indigo-500 md:order-1 text-2xl font-bold"
        >
          BibeBlog
        </NavLink>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          {/* return navbar based on user login or not */}
            {
            (isLogedin===true)? <ul className="flex justify-between text-lg font-bold ">
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="">Home</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/my-blog">my'blog</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
            <NavLink to="/saved-blog">Save'd blog</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/create-blog">Create</NavLink>
            </li>
            <li className="hidden md:block md:px-4 md:py-2 hover:text-indigo-400">
              <button onClick={(e)=>{logout(e)}} >Log out</button>
            </li>
          </ul> : <div></div>
          
          }
          
        </div>
        <div className="order-2 md:order-3">
          {
            (isLogedin === true)?<div className="profile  flex items-center"><div className="px-2 text-xl text-gray-500 font-bold cursor-pointer hover:text-indigo-400 duration-200 hover:underline">Bibek samal</div><div className="img cursor-pointer h-12 w-12 rounded-full bg-[#16181c] text-indigo-500 hover:text-indigo-600 flex items-center justify-center text-2xl font-bold">B</div></div>:<NavLink to="/signin" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 font-bold">
            Log in
          </NavLink>
          }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
