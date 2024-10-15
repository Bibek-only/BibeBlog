import { Hono } from "hono"
import authMiddleware from "../middleware/authMiddleware";
import createBlog from "../controller/createBlog";
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

export default blogRouter