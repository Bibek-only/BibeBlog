import { Hono } from "hono";
import signup from "../controller/signupController";
import signin from "../controller/signInController";
const userRouter = new Hono();
userRouter.post("/signup",(c)=>{
 return signup(c)
})

userRouter.get("/signin",(c)=>{
    return signin(c)
})

export default userRouter;