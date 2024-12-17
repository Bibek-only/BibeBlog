import { useEffect } from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useSetRecoilState } from "recoil";

import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
const SavedBlog = () => {
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  //set the user is loged in or not
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogedin(true)
    }else{
      setIsLogedin(false)
    }
  },[])
  return (
    <section className="w-full min-h-screen md:w-9/12 mx-auto ">
        
              <div  className="blog  border-b h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4">
        <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
          <div className="title text-xl">Hello i am title</div>
          <p className="h-24 overflow-hidden w-full text-sm flex items-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore cumque, earum explicabo voluptatum maiores molestiae laudantium sunt ipsa sed iusto illum ea soluta quidem! Dolore commodi asperiores natus iusto.</p>
          <div className="btns flex items-center gap-4">
            <p className="flex items-center gap-2 "><AiFillLike></AiFillLike>100</p>
            {/* <button className=" text-indigo-500 hover:text-indigo-600" onClick={()=>{
             
            }}><FaRegEdit></FaRegEdit></button> */}
            <button className=" text-indigo-500 hover:text-indigo-600  hover:underline" onClick={()=>{
             
            }}><FaTrash></FaTrash></button>
          <button className="flex gap-2 items-center text-indigo-500 hover:text-indigo-600 hover:underline" onClick={(event)=>{
           const btnTarget =  event.target as HTMLButtonElement;
           btnTarget.disabled = true; //disabled the button

           
          }}>Read more <FaArrowRight></FaArrowRight></button>
          </div>
        </div>
        <div className="image h-36 w-36 md:h-48 md:w-48 rounded-full bg-slate-500 relative">
          <img src={"https://tse2.mm.bing.net/th?id=OIP.NfYZ6yGINT_NzZDDzEwskQHaEK&pid=Api&P=0&w=300&h=300"} alt="blogimgx" className="h-full w-full rounded-full object-center object-cover" />
        </div>
      </div>
            
       
        
      </section>
  )
}

export default SavedBlog
