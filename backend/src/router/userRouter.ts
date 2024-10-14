import { Hono } from "hono";
import signup from "../controller/signupController";
import signin from "../controller/signInController";
import authMiddleware from "../middleware/authMiddleware";
import getUserInformation from "../controller/getUserInformationController";
const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECREAT:string
    }
  }>();

userRouter.use("/getuserinfo",async (c,next)=>{
    
    return await authMiddleware(c,next)
})

userRouter.post("/signup",(c)=>{
 return signup(c)
})

userRouter.get("/signin",(c)=>{
    return signin(c)
})


userRouter.get("/getuserinfo",(c)=>{
    // console.log("hii")
    return getUserInformation(c)
})


export default userRouter;