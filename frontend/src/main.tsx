import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const Signup = lazy(()=> import("./pages/Signup.tsx"))
const Signin = lazy(()=> import("./pages/Signin.tsx"))
const Account = lazy(()=> import("./pages/Account.tsx"))
const UpdateAccount = lazy(()=> import("./pages/UpdateAccount.tsx"))
const DeleteAccount = lazy(()=> import("./pages/DeleteAccount.tsx"))
const CreateBlog = lazy(()=> import("./pages/CreateBlog.tsx"))
const UpdateBlog = lazy(()=> import("./pages/UpdateBlog.tsx"))
const MyBlog = lazy(()=> import("./pages/MyBlog.tsx"))
const AllBlog = lazy(()=> import("./pages/AllBlog.tsx"))
const SavedBlog = lazy(()=> import("./pages/SavedBlog.tsx"))
const ReadBlog = lazy(()=> import("./pages/ReadBlog.tsx"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="" element={<AllBlog></AllBlog>}></Route>
      <Route path="signup/" element={<Signup></Signup>}></Route>
      <Route path="signin/" element={<Signin></Signin>}></Route>
      <Route path="account/" element={<Account></Account>}></Route>
      <Route path="update-acc/" element={<UpdateAccount></UpdateAccount>}></Route>
      <Route path="delete-acc/" element={<DeleteAccount></DeleteAccount>}></Route>
      <Route path="create-blog/" element={<CreateBlog></CreateBlog>}></Route>
      <Route path="update-blog/" element={<UpdateBlog></UpdateBlog>}></Route>
      <Route path="my-blog/" element={<MyBlog></MyBlog>}></Route>
      <Route path="saved-blog/" element={<SavedBlog></SavedBlog>}></Route>
      <Route path="read-blog/" element={<ReadBlog></ReadBlog>}></Route>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}>

   </RouterProvider>
  </StrictMode>,
)
