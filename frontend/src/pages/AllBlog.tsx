import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilStateLoadable,
  // useRecoilState,
} from "recoil";

import AllblogSkeliton from "../skelitons/AllblogSkeliton";
import Loader from "../skelitons/Loader";

import { isLogedinAtom } from "../store/atom/isloginatom";
import { allBlogAtom } from "../store/atom/allBlogAtom";
import { allUserAtom } from "../store/atom/allUserAtom";
import { loadingAtom } from "../store/atom/loadingAtom";
import { logedinUserInfoAtom } from "../store/atom/userInfoAtom";
import { searcBloghAtom, searcUserhAtom } from "../store/atom/inputAtom";

import { getUserInfoService } from "../services/getUserInfoService";

import delay from "../services/delay";

//buttondisabler
import { disableClick, enableClick } from "../services/clickDesEnb";

import { FaArrowRight } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";

const AllBlog = () => {
  const setIsLogedin = useSetRecoilState(isLogedinAtom);
  const showLoader = useRecoilValue(loadingAtom);

  const navigate = useNavigate();

  //fetch all user
  const allUsers = useRecoilValueLoadable(allUserAtom);
  //fetch all blog
  const allBlogs = useRecoilValueLoadable(allBlogAtom);

  //fetch the user information
  const [logedinUserInfo, setLogedinUserInfo] =
    useRecoilStateLoadable(logedinUserInfoAtom);

  //set the input
  const setSearchUser = useSetRecoilState(searcUserhAtom);
  const setSearchBlog = useSetRecoilState(searcBloghAtom);

  const [inputUser, setInputUser] = useState("");
  const [inputBlog, setInputBlog] = useState("");

  //useEffect to setthe user
  useEffect(() => {
    const tid = setTimeout(() => {
      setSearchUser(inputUser);
    }, 500);

    return () => clearTimeout(tid);
  }, [inputUser]);

  useEffect(() => {
    const tid = setTimeout(() => {
      setSearchBlog(inputBlog);
    }, 500);

    return () => clearTimeout(tid);
  }, [inputBlog]);

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

  if (allBlogs.state === "loading" || allUsers.state === "loading") {
    return <AllblogSkeliton></AllblogSkeliton>;
  } else {
    return (
      <>
        {showLoader && <Loader></Loader>}
        <section className="w-full md:px-20 md:w-11/12 m-auto">
          <div className="  grid grid-cols-1 lg:grid-cols-3  min-h-screen">
            <div className="   lg:col-span-2 md:border-l md:border-l-[#6B7280] md:px-4">
              {/* show the blog card here */}
              <h1 className="px-4 text-xl font-bold text-indigo-500 underline">
                Blog's
              </h1>
              <div className="ipouter  flex items-center">
                <IoSearch className="text-lg" />
                <input
                  className="flex bg-transparent outline-none py-2 px-4"
                  type="text"
                  placeholder="Search blog"
                  onChange={(e) => {
                    setInputBlog(e.target.value);
                  }}
                />
              </div>
              <BlogCards></BlogCards>
            </div>
            <div className=" md:border-x md:border-x-[#6B7280] md:px-2">
              {/* display all the user present in the server */}
              <h1 className="px-4 text-xl font-bold text-indigo-500 underline">
                Creator's
              </h1>
              <div className="hidden ipouter  md:flex items-center">
                <IoSearch className="text-lg" />
                <input
                  className="hidden md:flex bg-transparent outline-none py-2 px-4"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    setInputUser(e.target.value);
                  }}
                />
              </div>
              <UserCards></UserCards>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default AllBlog;

function UserCards() {
  const allUser = useRecoilValueLoadable(allUserAtom);
  //get the search
  const searchUser = useRecoilValue(searcUserhAtom);

  if (allUser.state === "hasValue" && allUser.contents.length != 0) {
    console.log("the full name = ", allUser.contents);
    return (
      <div>
        {allUser.contents.map((e: any) => {
          if (
            e.fullName.toLowerCase().startsWith(searchUser) ||
            e.userName.toLowerCase().startsWith(searchUser) ||
            e.email.toLowerCase().startsWith(searchUser)
          ) {
            return (
              <div className=" user-card flex items-center space-x-4 p-3   rounded-lg transition-all duration-500 hover:border-[#6B7280] border border-transparent mb-2">
                <img
                  src={e.profilePhoto}
                  className="w-12 h-12 rounded-full border-2 border-indigo-800 dark:border-blue-900"
                />
                <div className="">
                  <h3 className="text-lg font-semibold text-indigo-800 dark:text-white">
                    {e.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {e.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Followers: {e._count.followers}
                  </p>
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    );
  } else {
    return <></>;
  }
}

function BlogCards() {
  const searchBlog = useRecoilValue(searcBloghAtom);

  const allBlogs = useRecoilValueLoadable(allBlogAtom);
  if (allBlogs.state === "hasValue" && allBlogs.contents.length != 0) {
    console.log("----", allBlogs.contents);
    return (
      <div>
        {allBlogs.contents.map((blg: any) => {
          if (
            blg.title.toLowerCase().startsWith(searchBlog) ||
            blg.content.toLowerCase().startsWith(searchBlog)
          ) {
            return (
              <div
                className="blog border-b border-b-[#6B7280] h-72 flex flex-col-reverse justify-around items-center  md:flex-row mb-4"
                id={blg.id}
                key={blg.id}
              >
                <div className="content w-96 md:w-2/3  flex flex-col  items-start pl-2 md:pl-0">
                  <div className="title text-xl">{blg.title}</div>
                  <p>Author : {blg.author?.fullName}</p>
                  <p className="hidden  md:py-2 h-24  w-full text-sm md:flex items-center">
                  {
                    (blg.content.length > 40)?`${blg.content.slice(0,300)} ......`:blg.content
                  }
                  
                  </p>
                  <div className="btns flex items-center gap-4">
                    <p className="flex items-center gap-2 ">
                      <AiFillLike />
                      {blg._count.likes}
                    </p>

                    <ReadBlog prop={{ id: blg.id }} />
                  </div>
                </div>
                <div className="image h-36 w-full md:h-48 md:w-48 md:rounded-full bg-slate-500 relative">
                  <img
                    src={blg.coverImage}
                    alt="blogimg"
                    className="h-full w-full md:rounded-full object-center object-cover"
                  />
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
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
