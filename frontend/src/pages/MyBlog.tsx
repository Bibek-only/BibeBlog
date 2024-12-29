import { useEffect,useState } from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable, useSetRecoilState, useRecoilValue } from "recoil";
import { getUserInfoService } from "../services/getUserInfoService";
import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

import getMyBlogService from "../services/getMyblogService";
import { myBlogAtom } from "../store/atom/myBlogAtom";

import { useNavigate } from "react-router-dom";
import Loader from "../skelitons/Loader";

import delay from "../services/delay";

import AllblogSkeliton from "../skelitons/AllblogSkeliton";

import { logedinUserInfoAtom } from "../store/atom/userInfoAtom";

import { loadingAtom } from "../store/atom/loadingAtom";

import { enableClick, disableClick } from "../services/clickDesEnb";


const MyBlog = () => {

 const showLoader = useRecoilValue(loadingAtom);

  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  
  const myBlogs = useRecoilValueLoadable(myBlogAtom);
  
  const navigate = useNavigate();

  const [logedinUserInfo, setLogedinUserInfo] = useRecoilStateLoadable(logedinUserInfoAtom)

  //set the user is loged in or not
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogedin(true);
      //based on conditaion set the userinfo
      if(logedinUserInfo.state === "hasValue" && logedinUserInfo.contents === null){
            
        getUserInfoService()
        .then( (res)=>{
            setLogedinUserInfo(res);
        })
    
}

      

        
    }else{
      setLogedinUserInfo(null);
        setIsLogedin(false);
        navigate("/")
    }
  },[])

  
 


  if(myBlogs.state === "loading"){
    return(<AllblogSkeliton></AllblogSkeliton>)
  }else{
    return (
      <>
      {(showLoader)? <Loader /> : <></>}
      <section className="w-full min-h-screen md:w-9/12 mx-auto border-x border-x-[#6B7280] md:px-8">
      <h1 className="px-4 text-xl font-bold text-indigo-500 underline">My blog's</h1>
        <BlogCards></BlogCards>
        
      </section>
      </>
    )
  }
}

export default MyBlog

function BlogCards(){

  const myBlogs = useRecoilValueLoadable(myBlogAtom);
  
  if(myBlogs.state === "hasValue"){
    
    return(

      <>
        {
          myBlogs.contents.map((blg:any)=>{
            
            return(
              
              <div key={blg.id} id={blg.id} className="blog border-b border-b-[#6B7280]  h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4">
        <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
          <div className="title text-xl">{blg.title}</div>
          <p className="md:h-24 h-8 overflow-hidden w-full text-sm flex items-center">{blg.content}</p>
          <div className="btns flex items-center gap-4">
            <p className="flex items-center gap-2 "><AiFillLike></AiFillLike>{blg._count.likes}</p>
            {/* <button className=" text-indigo-500 hover:text-indigo-600" onClick={()=>{
             
            }}><FaRegEdit></FaRegEdit></button> */}
            <button className=" text-indigo-500 hover:text-indigo-600  hover:underline" onClick={()=>{
             
            }}><FaTrash></FaTrash></button>
          <ReadBlog prop={{id:blg.id}} />
          </div>
        </div>
        <div className="image h-36 w-full md:h-48 md:w-48 md:rounded-full bg-slate-500 relative">
          <img src={(blg.coverImage)?blg.coverImage:"https://tse2.mm.bing.net/th?id=OIP.NfYZ6yGINT_NzZDDzEwskQHaEK&pid=Api&P=0&w=300&h=300"} alt="blogimgx" className="h-full w-full md:rounded-full object-center object-cover" />
        </div>
      </div>
            )
          
        })
        }
      </>

    )
  }else{
    return <></>
  }
}

function ReadBlog({prop}:any){
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingAtom);
  
  return(
    <button className="flex gap-2 items-center text-indigo-500 hover:text-indigo-600 hover:underline"
     onClick={async ()=>{
      disableClick(); //disable the click
     setShowLoader(true);
      await delay(); //delay for 1500 second
      enableClick(); //enable the click
      setShowLoader(false);

      //navigate to the read blog section
      navigate(`/read-blog/${prop.id}`)
     
     }}
     >
      Read more <FaArrowRight></FaArrowRight></button>
    
  )
}