import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useParams } from "react-router-dom";
import getBlogInfoService from "../services/getBlogInfo";
import { blogAtom } from "../store/atom/blogAtom";

import { AiFillLike } from "react-icons/ai";
import { GoBookmarkFill } from "react-icons/go";
import { GoBookmarkSlashFill } from "react-icons/go";

import Loader from "../skelitons/Loader";
import ReadblogSkeliton from "../skelitons/ReadblogSkeliton";


const ReadBlog = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showSkeliton, setShowSkeliton] = useState(true);
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const params = useParams();

const [blogInfo, setBlogInfo] = useRecoilState(blogAtom);

  //set the user is loged in or not and find the blogs
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogedin(true)
      console.log(params.blogid)
      //fetch the bog details
      getBlogInfoService(params.blogid)
      .then((res)=>{
        setBlogInfo(res);
        setShowSkeliton(false)
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      setIsLogedin(false)
    }
  },[])

  //fetch params
  
  if(showSkeliton){
    return (
      <ReadblogSkeliton></ReadblogSkeliton>
    )
  }else{

  }
  return (
    <section className="w-full md:w-9/12  m-auto min-h-screen flex itmes-center  text-white flex-col gap-4 md:px-6 px-2 py-4">
      <h1 className=" text-center text-4xl font-bold">{blogInfo.title}</h1>
      <div className="img w-full h-80 md:h-96 bg-black">
        <img className="w-full h-full object-cover object-center" src={(blogInfo.coverImage)?blogInfo.coverImage:"https://tse2.mm.bing.net/th?id=OIP.NfYZ6yGINT_NzZDDzEwskQHaEK&pid=Api&P=0&w=300&h=300"} alt="" />
      </div>
      <p className="w-full md:px-8 px-4  text-lg font-semibold">{blogInfo.content}</p>
      <div className="btns w-full md:px-8 px-4 flex py-6 gap-6">
        <button className="text-lg font-bold flex items-center gap-2">100<AiFillLike /></button>
        
        <button className="text-lg font-bold text-indigo-500 hover:text-indigo-600"><GoBookmarkFill /></button>
        <button className="text-lg font-bold text-indigo-500 hover:text-indigo-600"><GoBookmarkSlashFill /></button>
        
      </div>
    </section>
  )

}

export default ReadBlog
