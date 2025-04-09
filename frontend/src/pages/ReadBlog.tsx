import { useEffect, useState } from "react";
import { useRecoilState,  useSetRecoilState } from "recoil";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useNavigate, useParams } from "react-router-dom";
import getBlogInfoService from "../services/getBlogInfo";
import { blogAtom } from "../store/atom/blogAtom";

import { AiFillLike } from "react-icons/ai";
import { GoBookmarkFill } from "react-icons/go";
import { GoBookmarkSlashFill } from "react-icons/go";

import Loader from "../skelitons/Loader";
import ReadblogSkeliton from "../skelitons/ReadblogSkeliton";

import addLikeService from "../services/addLike";
import savedBlogService from "../services/savedBlogService";
import unsaveBlogService from "../services/unsaveBlog";


import { allBlogAtom } from "../store/atom/allBlogAtom";

import toast from 'react-hot-toast';
import getAllBlogService from "../services/getAllBlogService";
import getMyBlogService from "../services/getMyblogService";
import getSavedBlogService from "../services/getSavedBlogService";
import { myBlogAtom } from "../store/atom/myBlogAtom";
import { savedBlogAtom } from "../store/atom/savedBlogAtom";

const ReadBlog = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showSkeliton, setShowSkeliton] = useState(true);
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const params = useParams();

const [blogInfo, setBlogInfo] = useRecoilState(blogAtom);
const [likeCount, setLikeCount] = useState(0);

//update the all blog if do like or dislike or save or unsave
const setAllBlogs = useSetRecoilState(allBlogAtom);
const setMyBlogs = useSetRecoilState(myBlogAtom)
const setSavedBlogs = useSetRecoilState(savedBlogAtom)
const navigate = useNavigate();

async function delay() {
  await new Promise((res) => {
    setTimeout(() => {
      res("delay resolved");
    }, 500);
  });
}

  //set the user is loged in or not and find the blogs
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogedin(true)
      console.log(params.blogid)
      //fetch the bog details
      getBlogInfoService(params.blogid)
      .then((res)=>{

        setBlogInfo(res);
        
        setLikeCount(parseInt(res._count));

        setShowSkeliton(false)
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      setIsLogedin(false)
    }
  },[likeCount])

  //like blog serveice
  async function doLike(btn:any){
    setShowLoader(true);
    const res = await addLikeService(parseInt(params.blogid!));
    if(res?.success === true){
      if(res.for === "like"){

        //update the all blog
        getAllBlogService()
        .then((res)=>{
          setAllBlogs(res);
        })

        //update my blog if make like
        getMyBlogService()
        .then((res)=>{
          setMyBlogs(res)
        })

        //update saved blog if make like
        getSavedBlogService()
        .then((res)=>{
          setSavedBlogs(res);
        })
        
        setLikeCount(likeCount+1);
      }else{
        //update the all blog
        getAllBlogService()
        .then((res)=>{
          setAllBlogs(res);
        })
        //update my blog if make like
        getMyBlogService()
        .then((res)=>{
          setMyBlogs(res)
        })
        //update saved blog if make like
        getSavedBlogService()
        .then((res)=>{
          setSavedBlogs(res);
        })
        setLikeCount(likeCount-1);
        
      }
    }
    setShowLoader(false);
    btn.disabled = false;
  }
  
  //save the blog service
  async function saveBlog(btn: any){
    setShowLoader(true);
    const res = await savedBlogService(parseInt(params.blogid!));
    if(res?.success === true){
      //update saved blog if save th bl
      getSavedBlogService()
      .then((res)=>{
        setSavedBlogs(res);
      })
      
      toast.success(res?.msg);
      
      await delay();
      // navigate to the save blog section ater delay
      navigate("/saved-blog")
    }
    else{
      toast.error((res?.msg)? res.msg: "can't save the blog");
      setShowLoader(false);
      
      
      
    }
    btn.disabled=false;
    
  }
  
  //unsave the blog service
  async function unSaveBlog(btn: any){
    setShowLoader(true);
    const res = await unsaveBlogService(parseInt(params.blogid!));
    if(res?.success === true){
      //update saved blog if save th bl
      getSavedBlogService()
      .then((res)=>{
        setSavedBlogs(res);
      })
      toast.success(res?.msg);
      await delay();
      navigate("/saved-blog")
    }
    else{
      toast.error((res?.msg)? res.msg: "Blog unsave fail");
      setShowLoader(false);

      
      
    }
    btn.disabled=false;
  }
  
  if(showSkeliton){
    return (
      <ReadblogSkeliton></ReadblogSkeliton>
    )
  }else{

  }
  return (
    <>
    {showLoader && <Loader></Loader>}
    <section className="w-full md:w-9/12  m-auto min-h-screen flex itmes-center  text-white flex-col gap-4 md:px-6 px-2 py-4">
      <h1 className=" text-center text-4xl font-bold">{blogInfo.title}</h1>
      <div className="img w-full h-80 md:h-96 bg-black">
        <img className="w-full h-full object-cover object-center" src={(blogInfo.coverImage)?blogInfo.coverImage:"https://tse2.mm.bing.net/th?id=OIP.NfYZ6yGINT_NzZDDzEwskQHaEK&pid=Api&P=0&w=300&h=300"} alt="" />
      </div>
      <p className="w-full md:px-8 px-4  text-lg font-semibold">{blogInfo.content}</p>
      <p className="md:px-8 px-4">Published by: {blogInfo.fullName}</p>
      <div className="btns w-full md:px-8 px-4 flex py-6 gap-6">
        
        <button className="text-lg font-bold flex items-center gap-2 text-indigo-500 hover:text-indigo-600 hover:underline" onClick={(e)=>{
          const btn = e.target as HTMLButtonElement;
          btn.disabled = true;
          doLike(btn);
        }}><AiFillLike />{`${likeCount}`}</button>
        
        <button className="text-lg font-bold text-indigo-500 hover:text-indigo-600"
        onClick={(e)=>{
          const btn = e.target as HTMLButtonElement;
          btn.disabled = true;
          saveBlog(btn);
        }}
        ><GoBookmarkFill /></button>
        <button className="text-lg font-bold text-indigo-500 hover:text-indigo-600"
         onClick={(e)=>{
          const btn = e.target as HTMLButtonElement;
          btn.disabled = true;
          unSaveBlog(btn);
        }}
        ><GoBookmarkSlashFill /></button>
        
      </div>
    </section>
    </>
  )

}

export default ReadBlog
