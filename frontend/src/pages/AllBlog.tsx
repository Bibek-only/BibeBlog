import { useEffect,useState } from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import AllblogSkeliton from "../skelitons/AllblogSkeliton";
import Loader from "../skelitons/Loader";
import getAllBlogService from "../services/getAllBlogService";
import { allBlogAtom } from "../store/atom/allBlogAtom";


import { fullNameAtom } from "../store/atom/userInfoAtom";
import { getUserInfoService } from "../services/getUserInfoService";

import { FaArrowRight } from "react-icons/fa";
const AllBlog = () => {
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const setfullName = useSetRecoilState(fullNameAtom);
  const [allBlog,setAllBlog] = useRecoilState(allBlogAtom);
  const [showLoader, setShowLoader] = useState(false);
  const [showSkeliton, setShowSkeliton] = useState(true);
  const navigate = useNavigate();

  async function delay() {
    await new Promise((res, rej) => {
      setTimeout(() => {
        res("delay resolved");
      }, 1000);
    });
  }

  //set the user is loged in or not
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogedin(true);
      //set the use information
      getUserInfoService()
        .then((res) => {
          
          setfullName(res.fullName);
        })
        .catch((error) => {
          console.log(error);
        });

        //set userblogs
        getAllBlogService()
        .then(async (res)=>{
          await delay();
          setShowSkeliton(false);
          setAllBlog(res);
        })
        .catch((err)=>{
          console.log("some error in the get blog service")
          setAllBlog([])
        })
    } else {
      (async () => {
        await delay();
        navigate("/signin");
      })();
      setIsLogedin(false);
    }
  }, []);

  async function readblog(e:any){
    setShowLoader(true);
    await delay();
    setShowLoader(false)
    navigate(`read-blog/${e}`);
  }

  return (
    <>
    
    {(showLoader)? <Loader /> : <></>}
    <section className="  w-full min-h-screen md:w-9/12 mx-auto">
      {/* dummy blog card */}
      {/* <div className="blog  border-b h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4">
        <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
          <div className="title text-xl">hello titile</div>
          <p className="h-24 overflow-hidden w-full text-sm flex items-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusantium quaerat, facilis, ut repudiandae doloribus aliquam, nemo sint porro quae obcaecati rem illum rerum architecto quia qui voluptates! At, perferendis</p>
          <button className="flex gap-2 items-center" onClick={()=>{
            alert("maacuda")
          }}>Read more <FaArrowRight></FaArrowRight></button>
        </div>
        <div className="image h-36 w-36 md:h-48 md:w-48 rounded-full bg-slate-500 relative">
          <img src="https://tse4.mm.bing.net/th?id=OIP.7ITF2gx8_a3s4NbnDOpZzAHaHa&pid=Api&P=0&h=180" alt="blogimg" className="h-full w-full rounded-full object-center object-cover" />
        </div>
      </div> */}
      {
        allBlog.map((e:any)=>{
          if(showSkeliton){
            
            return(
              <AllblogSkeliton></AllblogSkeliton>
            )
          }else{
            return(
              <div className="blog  border-b h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4" id={e.id}>
          <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
            <div className="title text-xl">{e.title}</div>
            <p className="h-24 overflow-hidden w-full text-sm flex items-center">{e.content}</p>
            <button className="flex gap-2 items-center text-indigo-500 hover:text-indigo-600 hover:underline" onClick={()=>{
              readblog(e.id);
            }}>Read more <FaArrowRight></FaArrowRight></button>
          </div>
          <div className="image h-36 w-36 md:h-48 md:w-48 rounded-full bg-slate-500 relative">
            <img src="https://tse4.mm.bing.net/th?id=OIP.7ITF2gx8_a3s4NbnDOpZzAHaHa&pid=Api&P=0&h=180" alt="blogimg" className="h-full w-full rounded-full object-center object-cover" />
          </div>
        </div>
            )
          }
        })
      }
    </section>
    </>
  );
};

export default AllBlog;
