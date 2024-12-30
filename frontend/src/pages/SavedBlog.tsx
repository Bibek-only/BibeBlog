import { useEffect } from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import {
  useRecoilStateLoadable,
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilValue,
} from "recoil";
import { savedBlogAtom } from "../store/atom/savedBlogAtom";
import { useNavigate } from "react-router-dom";

import { getUserInfoService } from "../services/getUserInfoService";

import { loadingAtom } from "../store/atom/loadingAtom";

import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import Loader from "../skelitons/Loader";

import delay from "../services/delay";

import { disableClick, enableClick } from "../services/clickDesEnb";

import { logedinUserInfoAtom } from "../store/atom/userInfoAtom";
import AllblogSkeliton from "../skelitons/AllblogSkeliton";

const SavedBlog = () => {
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const savedBlogs = useRecoilValueLoadable(savedBlogAtom);
  //fetch the user information
  const [logedinUserInfo, setLogedinUserInfo] =
    useRecoilStateLoadable(logedinUserInfoAtom);
  const loader = useRecoilValue(loadingAtom);

  const navigate = useNavigate();

  //set the user is loged in or not
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogedin(true);

      //based on conditaion set the userinfo
      if (
        logedinUserInfo.state === "hasValue" &&
        logedinUserInfo.contents === null
      ) {
        getUserInfoService().then((res) => {
          setLogedinUserInfo(res);
        });
      }

      //set the new updated blog
    } else {
      setLogedinUserInfo(null);
      setIsLogedin(false);
      navigate("/");
    }
  }, []);

  if (savedBlogs.state === "loading") {
    return <AllblogSkeliton />;
  } else {
    return (
      <>
        {loader && <Loader></Loader>}
        <section className="w-full min-h-screen md:w-9/12 mx-auto border-x border-x-[#6B7280] md:px-8">
          <h1 className="px-4 text-xl font-bold text-indigo-500 underline">
            Saved blog's
          </h1>
          <BlogCards></BlogCards>
        </section>
      </>
    );
  }
};

export default SavedBlog;

function BlogCards() {
  const savedBlogs = useRecoilValueLoadable(savedBlogAtom);
  if (savedBlogs.state === "hasValue" && savedBlogs.contents.length != 0) {
    return (
      <>
        {savedBlogs.contents.map((blg: any) => {
          return (
            <div className="blog  border-b border-b-[#6B7280] h-80 flex flex-col-reverse justify-around items-center  md:flex-row mb-4">
              <div className="content w-96 md:w-2/3  flex flex-col gap-2 items-start pl-2 md:pl-0">
                <div className="title text-xl">{blg.blog?.title}</div>
                <p>Author: {blg.blog?.author?.fullName}</p>
                <p className="h-8 md:h-24 overflow-hidden w-full text-sm flex items-center">
                  {blg.blog?.content}
                </p>
                <div className="btns flex items-center gap-4">
                  {/* <p className="flex items-center gap-2 "><AiFillLike></AiFillLike>100</p> */}
                  {/* <button className=" text-indigo-500 hover:text-indigo-600" onClick={()=>{
                 
                }}><FaRegEdit></FaRegEdit></button> */}

                  <ReadBlog prop={{ id: blg.blog.id }}></ReadBlog>
                </div>
              </div>
              <div className="image h-36 w-full md:h-48 md:w-48 md:rounded-full bg-slate-500 relative">
                <img
                  src={
                    blg.blog.coverImage
                  }
                  alt="blogimgx"
                  className="h-full w-full md:rounded-full object-center object-cover"
                />
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
}

function ReadBlog({ prop }: any) {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingAtom);

  return (
    <button
      className="flex gap-2 items-center text-indigo-500 hover:text-indigo-600 hover:underline"
      onClick={async () => {
        disableClick(); //disable the click
        setShowLoader(true);
        await delay(); //delay for 1500 second
        enableClick(); //enable the click
        setShowLoader(false);

        //navigate to the read blog section
        navigate(`/read-blog/${prop.id}`);
      }}
    >
      Read more <FaArrowRight></FaArrowRight>
    </button>
  );
}
