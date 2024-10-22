import { Hono } from "hono"
import authMiddleware from "../middleware/authMiddleware";
import createBlog from "../controller/createBlog";
import updateBlog from "../controller/updateBlog";
import deleteBlog from "../controller/deleteBlog";
import getAllBlogs from "../controller/getAllBlog";
import getMyBlogs from "../controller/getMyBlogs";
import getSpecificBlog from "../controller/getSpecificBlog";
const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECREAT:string
    }
  }>();

blogRouter.use("/*",async (c,next)=>{
    return await authMiddleware(c,next)
})

blogRouter.post("/create",(c)=>{
    return createBlog(c);
})

blogRouter.put("/update",(c)=>{
  return updateBlog(c)
})

blogRouter.delete("/deleteblog",(c)=>{
  return deleteBlog(c)
})

blogRouter.get("/getallblog",(c)=>{
  return getAllBlogs(c)
})

blogRouter.get("/getmyblog",(c)=>{
  return getMyBlogs(c)
})

blogRouter.get("/getspeceficblog",(c)=>{
  return getSpecificBlog(c);
})
export default blogRouter