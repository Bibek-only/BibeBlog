import { Hono } from "hono";
import signup from "../controller/signupController";
import signin from "../controller/signInController";
import authMiddleware from "../middleware/authMiddleware";
const userRouter = new Hono();

// userRouter.use("/signup",async (c,next)=>{
//     return authMiddleware(c,next)
// })

userRouter.post("/signup",(c)=>{
 return signup(c)
})

userRouter.get("/signin",(c)=>{
    return signin(c)
})



export default userRouter;