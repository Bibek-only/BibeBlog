import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { allBlogAtom } from "../store/atom/allBlogAtom";
import { savedBlogAtom } from "../store/atom/savedBlogAtom";
import { myBlogAtom } from "../store/atom/myBlogAtom";
import { logedinUserInfoAtom } from "../store/atom/userInfoAtom";

type Inputs = {
  reason: string;
  password: string;
};

const DeleteAccount = () => {
  const setUserinfo = useSetRecoilState(logedinUserInfoAtom);
  const setAllBlogs = useSetRecoilState(allBlogAtom);
  const setSavedBlogs = useSetRecoilState(savedBlogAtom);
  const setMyBlogs = useSetRecoilState(myBlogAtom);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = () => {
    localStorage.removeItem("token");
    setUserinfo(null);
    setAllBlogs([]);
    setMyBlogs([]);
    setSavedBlogs([]);
    navigate("/");
  };

  return (
    <div className="w-full md:py-32 flex  justify-center">
      <form
        className="max-w-sm md:w-full mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter reason
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("reason", {
              required: {
                value: true,
                message: "Reason required",
              },
            })}
          />
          <p className="text-rose-500">
            {errors.reason && errors.reason.message}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter password
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <p className="text-rose-500">
            {errors.password && errors.password.message}
          </p>
        </div>

        <button
          type="submit"
          className="text-white w-full flex border    rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
