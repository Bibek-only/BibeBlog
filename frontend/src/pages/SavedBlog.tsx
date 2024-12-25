import { useEffect,useState } from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useSetRecoilState, useRecoilState } from "recoil";
import { savedBlogAtom } from "../store/atom/savedBlogAtom";
import { useNavigate } from "react-router-dom";
import { fullNameAtom } from "../store/atom/userInfoAtom";
import { getUserInfoService } from "../services/getUserInfoService";
import getSavedBlogService from "../services/getSavedBlogService";


import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import AllblogSkeliton from "../skelitons/AllblogSkeliton";
import Loader from "../skelitons/Loader";

const SavedBlog = () => {
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const setfullName = useSetRecoilState(fullNameAtom);
  const [showSkeliton, setShowSkeliton] = useState(true);
    const [showLoader, setShowLoader] = useState(false)
    const [savedBlog, setSavedBlog] = useRecoilState(savedBlogAtom)
    const navigate = useNavigate();

    async function delay() {
      await new Promise((res, rej) => {
        setTimeout(() => {
          res("delay resolved");
        }, 500);
      });
    }


  //set the user is loged in or not
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogedin(true);
      getUserInfoService()
        .then((res) => {
          
          setfullName(res);
        })
        .catch((error) => {
          
          console.log(error);
        });

        // set the blog's
        getSavedBlogService()
        .then((res)=>{
          
          setSavedBlog(res);
          setShowSkeliton(false)
        })
        .catch((err)=>{
          setSavedBlog([])
        })

    }else{
      setIsLogedin(false)
    }
  },[])

  async function readblog(e:any){
    setShowLoader(true);
    await delay();
    setShowLoader(false)
    navigate(`/read-blog/${e}`);
  }

  
  if(showSkeliton){
    return( <AllblogSkeliton />)
  }else{
    return(
      <>
      {(showLoader)?<Loader></Loader>:<></>}
        <section className="w-full min-h-screen md:w-9/12 mx-auto ">
            
        
        {
          savedBlog.map((e:any)=>{
            return(
              <div  className="blog  border-b h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4">
            <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
              <div className="title text-xl">{e.blog?.title}</div>
              <p>Author: {e.blog.author.fullName}</p>
              <p className="h-24 overflow-hidden w-full text-sm flex items-center">{e.blog?.content}</p>
              <div className="btns flex items-center gap-4">
                {/* <p className="flex items-center gap-2 "><AiFillLike></AiFillLike>100</p> */}
                {/* <button className=" text-indigo-500 hover:text-indigo-600" onClick={()=>{
                 
                }}><FaRegEdit></FaRegEdit></button> */}
                
              <button className="flex gap-2 items-center text-indigo-500 hover:text-indigo-600 hover:underline" onClick={(event)=>{
               const btnTarget =  event.target as HTMLButtonElement;
               btnTarget.disabled = true; //disabled the button
    
               readblog(e.blog?.id);
              }}>Read more <FaArrowRight></FaArrowRight></button>
              </div>
            </div>
            <div className="image h-36 w-36 md:h-48 md:w-48 rounded-full bg-slate-500 relative">
              <img src={"https://tse2.mm.bing.net/th?id=OIP.NfYZ6yGINT_NzZDDzEwskQHaEK&pid=Api&P=0&w=300&h=300"} alt="blogimgx" className="h-full w-full rounded-full object-center object-cover" />
            </div>
          </div>
            )
          })
        }
                
           
            
          </section>
          </>
      )
    
  }
}

export default SavedBlog
