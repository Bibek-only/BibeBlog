import { useEffect,useState } from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getUserInfoService } from "../services/getUserInfoService";
import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { fullNameAtom } from "../store/atom/userInfoAtom";
import getMyBlogService from "../services/getMyblogService";
import { myBlogAtom } from "../store/atom/myBlogAtom";
import AllblogSkeliton from "../skelitons/AllblogSkeliton";
import { useNavigate } from "react-router-dom";
import Loader from "../skelitons/Loader";

const MyBlog = () => {

  const setfullName = useSetRecoilState(fullNameAtom);
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const [showSkeliton, setShowSkeliton] = useState(true);
  const [showLoader, setShowLoader] = useState(false)
  const [myBlog,setMyBlogAtom] = useRecoilState(myBlogAtom)
  const navigate = useNavigate();



  //set the user is loged in or not
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogedin(true)
      getUserInfoService()
        .then((res) => {
          
          setfullName(res);
        })
        .catch((error) => {
          console.log(error);
        });

        //set the my blogs
        getMyBlogService()
        .then((res)=>{
          
          setMyBlogAtom(res);
          setShowSkeliton(false);
        }).catch((err)=>{
          console.log("some error in the my blog service",err)
        })
    }else{
      setIsLogedin(false)
      navigate("/signin")
    }
  },[])

  async function delay() {
    await new Promise((res, rej) => {
      setTimeout(() => {
        res("delay resolved");
      }, 1000);
    });
  }
  async function readblog(e:any){
    setShowLoader(true);
    await delay();
    setShowLoader(false)
    navigate(`read-blog/${e}`);
  }


  if(showSkeliton){
    return(<AllblogSkeliton></AllblogSkeliton>)
  }else{
    return (
      <>
      {(showLoader)? <Loader /> : <></>}
      <section className="w-full min-h-screen md:w-9/12 mx-auto ">
        {
          myBlog.map((e:any)=>{
            return(
              <div key={e.id} id={e.id} className="blog  border-b h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4">
        <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
          <div className="title text-xl">{e.title}</div>
          <p className="h-24 overflow-hidden w-full text-sm flex items-center">{e.content}</p>
          <div className="btns flex items-center gap-4">
            <p className="flex items-center gap-2 "><AiFillLike></AiFillLike>{e._count.likes}</p>
            {/* <button className=" text-indigo-500 hover:text-indigo-600" onClick={()=>{
             
            }}><FaRegEdit></FaRegEdit></button> */}
            <button className=" text-indigo-500 hover:text-indigo-600  hover:underline" onClick={()=>{
             
            }}><FaTrash></FaTrash></button>
          <button className="flex gap-2 items-center text-indigo-500 hover:text-indigo-600 hover:underline" onClick={(event)=>{
           const btnTarget =  event.target as HTMLButtonElement;
           btnTarget.disabled = true; //disabled the button

           readblog(e.id);
          }}>Read more <FaArrowRight></FaArrowRight></button>
          </div>
        </div>
        <div className="image h-36 w-36 md:h-48 md:w-48 rounded-full bg-slate-500 relative">
          <img src={(e.coverImage)?e.coverImage:"https://tse2.mm.bing.net/th?id=OIP.NfYZ6yGINT_NzZDDzEwskQHaEK&pid=Api&P=0&w=300&h=300"} alt="blogimgx" className="h-full w-full rounded-full object-center object-cover" />
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

export default MyBlog
