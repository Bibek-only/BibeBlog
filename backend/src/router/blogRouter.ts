import { Hono } from "hono"
import authMiddleware from "../middleware/authMiddleware";
import createBlog from "../controller/createBlog";
import updateBlog from "../controller/updateBlog";
import deleteBlog from "../controller/deleteBlog";
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

export default blogRouter