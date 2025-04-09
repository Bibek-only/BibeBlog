import { useEffect} from "react";
import { isLogedinAtom } from "../store/atom/isloginatom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getUserInfoService } from "../services/getUserInfoService";

import createBlogService from "../services/createBlogService";
import toast from "react-hot-toast";
import Loader from "../skelitons/Loader";
import { useForm, SubmitHandler } from "react-hook-form";

import { createBlogTypeFrontend } from "@bibek-samal/bibeblog-common";

import { useRecoilStateLoadable } from "recoil";

import { logedinUserInfoAtom } from "../store/atom/userInfoAtom";
import { myBlogAtom } from "../store/atom/myBlogAtom";

import getMyBlogService from "../services/getMyblogService";
import { disableClick, enableClick } from "../services/clickDesEnb";

const CreateBlog = () => {
  const navigate = useNavigate();
  const setIsLogedin = useSetRecoilState(isLogedinAtom);

  //fetch the user information
  const [logedinUserInfo, setLogedinUserInfo] =
    useRecoilStateLoadable(logedinUserInfoAtom);

  //update the my blog if create a blog
  const setMyBlogs = useSetRecoilState(myBlogAtom);

  //handel the create blog
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createBlogTypeFrontend>();

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

  //handel submition of form
  const onSubmit: SubmitHandler<createBlogTypeFrontend> = async (data) => {
    disableClick(); //disable any click
    const createBlogRes = await createBlogService(data);
    if (createBlogRes?.success === true) {
      toast.success("Blog created successfully");
      getMyBlogService().then((res) => {
        setMyBlogs(res);
        enableClick(); //enable the click
        navigate("/my-blog");
      });
    }

    toast.error(
      createBlogRes?.error.response.data.message
        ? createBlogRes?.error.response.data.message
        : "can't do the operation"
    );
  };

  return (
    <>
      {isSubmitting && <Loader></Loader>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 max-lg:w-full lg:h-screen my-6  m-auto flex flex-col gap-4 items-start"
      >
        <div className="ipouter w-full">
          <input
            type="text"
            placeholder="Title"
            className="text-4xl max-lg:text-2xl font-roboto rounded-xl
    outline-none p-4 bg-[#16181c] text-white w-full"
            {...register("title", {
              required: {
                value: true,
                message: "Title must required",
              },
              maxLength: {
                value: 50,
                message: "Title must be under 50 charecter",
              },
            })}
          />
          <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
            {errors.title && errors.title?.message}
          </div>
        </div>

        <div className="ipouter w-full">
          <textarea
            id=""
            placeholder="Content"
            className="text-gray-300 min-h-80 p-4 text-2xl max-lg:text-xl font-roboto italic bg-[#16181c] outline-none w-full rounded-xl"
            {...register("content", {
              required: {
                value: true,
                message: "content must required",
              },
            })}
          ></textarea>
          <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
            {errors.content && errors.content?.message}
          </div>
        </div>
        <div className="btns flex flex-col  md:flex-row items-center md:gap-4 gap-8">
          <div className="file-upload">
            <label
              htmlFor="file-up"
              id="coverImg"
              className="bg-indigo-500 hover:bg-indigo-600 text-lg  w- py-2 rounded-2xl font-bold text-gray-300 hover:text-white max-lg:ml-2 max-lg:text-xl flex justify-center w-52 "
            >
              cover Image
            </label>
            <input
              type="file"
              id="file-up"
              className="hidden"
              {...register("coverImage", {
                required: {
                  value: true,
                  message: "cover Image must Required",
                },
                validate: {
                  fileType: (value: any) => {
                    const file = value[0];
                    return (
                      (file &&
                        (file.type === "image/jpeg" ||
                          file.type === "image/png" ||
                          file.type === "image/jpg")) ||
                      "Only .jpg/.jpeg or .png files are allowed"
                    );
                  },
                  fileSize: (value: any) => {
                    const file = value[0];
                    return (
                      (file && file.size <= 2 * 1024 * 1024) ||
                      "File size must be under 2MB"
                    );
                  },
                },
              })}
            />
          </div>
          <label htmlFor="sub">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-lg  py-2 rounded-2xl font-bold text-gray-300 hover:text-white max-lg:ml-2 max-lg:text-xl w-52"
              name="subbmit"
            >
              Create
            </button>
          </label>
          <input
            type="submit"
            id="sub"
            name="sub"
            className="hidden"
            disabled={isSubmitting}
          />
        </div>
        <div className="error bg-black h-6 font-thin text-red-400 pl-6 duration-500 ">
          {errors.coverImage && errors.coverImage?.message}
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
