import { Hono } from "hono";
import signup from "../controller/signupController";
import signin from "../controller/signInController";
import authMiddleware from "../middleware/authMiddleware";
import getUserInformation from "../controller/getUserInformationController";
import deleteUser from "../controller/deleteUser";
const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECREAT:string
    }
  }>();

userRouter.use("/getuserinfo",async (c,next)=>{
    
    return await authMiddleware(c,next)
})

userRouter.use("/deleteuser",async (c,next)=>{
    
    return await authMiddleware(c,next)
})

userRouter.post("/signup",(c)=>{
 return signup(c)
})

userRouter.get("/signin",(c)=>{
    return signin(c)
})


userRouter.get("/getuserinfo",(c)=>{
    
    return getUserInformation(c)
})

userRouter.delete("/deleteuser",(c)=>{
  return deleteUser(c)
})

export default userRouter;