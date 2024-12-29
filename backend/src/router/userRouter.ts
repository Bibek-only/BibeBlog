import { Hono } from "hono";
import signup from "../controller/signupController";
import signin from "../controller/signInController";
import authMiddleware from "../middleware/authMiddleware";
import getUserInformation from "../controller/getUserInformationController";
import deleteUser from "../controller/deleteUser";
import updateUser from "../controller/updateUser";
import getAllUser from "../controller/getAllUser";
const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECREAT:string,
      CLOUD_NAME:string,
      CLOUD_URL:string,
    }
  }>();


//setup the middleware for different routes

userRouter.use("/getuserinfo",async (c,next)=>{
    
    return await authMiddleware(c,next)
})

userRouter.use("/deleteuser",async (c,next)=>{
    
    return await authMiddleware(c,next)
})
userRouter.use("/updateuser",async (c,next)=>{
  return await authMiddleware(c,next)
})
userRouter.use("/getalluser",async (c,next)=>{
  return await authMiddleware(c,next)
})

//setup the controller for different routes
userRouter.post("/signup",(c)=>{
 return signup(c)
})

userRouter.post("/signin",(c)=>{
    return signin(c)
})


userRouter.get("/getuserinfo",(c)=>{
    
    return getUserInformation(c)
})

userRouter.delete("/deleteuser",(c)=>{
  return deleteUser(c)
})
userRouter.put("/updateuser",(c)=>{
  return updateUser(c)
})

userRouter.get("/getalluser",(c)=>{
  return getAllUser(c)
})

export default userRouter;