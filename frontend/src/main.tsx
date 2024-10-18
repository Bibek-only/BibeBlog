import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

const Signup = lazy(() => import("./pages/Signup.tsx"));
const Signin = lazy(() => import("./pages/Signin.tsx"));
const Account = lazy(() => import("./pages/Account.tsx"));
const UpdateAccount = lazy(() => import("./pages/UpdateAccount.tsx"));
const DeleteAccount = lazy(() => import("./pages/DeleteAccount.tsx"));
const CreateBlog = lazy(() => import("./pages/CreateBlog.tsx"));
const UpdateBlog = lazy(() => import("./pages/UpdateBlog.tsx"));
const MyBlog = lazy(() => import("./pages/MyBlog.tsx"));
const AllBlog = lazy(() => import("./pages/AllBlog.tsx"));
const SavedBlog = lazy(() => import("./pages/SavedBlog.tsx"));
const ReadBlog = lazy(() => import("./pages/ReadBlog.tsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route
        path=""
        element={
          <Suspense fallback={"...loading"}>
            <AllBlog></AllBlog>
          </Suspense>
        }
      ></Route>
      <Route
        path="signup/"
        element={
          <Suspense fallback={"...loading"}>
            <Signup></Signup>
          </Suspense>
        }
      ></Route>
      <Route
        path="signin/"
        element={
          <Suspense fallback={"...loading"}>
            <Signin></Signin>
          </Suspense>
        }
      ></Route>
      <Route
        path="account/"
        element={
          <Suspense fallback={"...loading"}>
            <Account></Account>
          </Suspense>
        }
      ></Route>
      <Route
        path="update-acc/"
        element={
          <Suspense fallback={"...loading"}>
            <UpdateAccount></UpdateAccount>
          </Suspense>
        }
      ></Route>
      <Route
        path="delete-acc/"
        element={
          <Suspense fallback={"...loading"}>
            <DeleteAccount></DeleteAccount>
          </Suspense>
        }
      ></Route>
      <Route
        path="create-blog/"
        element={
          <Suspense fallback={"...loading"}>
            <CreateBlog></CreateBlog>
          </Suspense>
        }
      ></Route>
      <Route
        path="update-blog/"
        element={
          <Suspense fallback={"...loading"}>
            <UpdateBlog></UpdateBlog>
          </Suspense>
        }
      ></Route>
      <Route
        path="my-blog/"
        element={
          <Suspense fallback={"...loading"}>
            <MyBlog></MyBlog>
          </Suspense>
        }
      ></Route>
      <Route
        path="saved-blog/"
        element={
          <Suspense fallback={"...loading"}>
            <SavedBlog></SavedBlog>
          </Suspense>
        }
      ></Route>
      <Route
        path="read-blog/"
        element={
          <Suspense fallback={"...loading"}>
            <ReadBlog></ReadBlog>
          </Suspense>
        }
      ></Route>
    </Route>
  )
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
