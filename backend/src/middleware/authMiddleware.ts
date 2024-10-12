import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import apiresponse from "../utils/apiResopnse";
async function authMiddleware(c:any,next:any){

    const token = c.req.headers("authorization"); //get the token
    if(!token){
        c.status(411)
        return c.json(
            new apiresponse(false,411,"Ther user is not authorized")
        )
    }
    const tokenvalue = await verify(token,c.env.JWT_SECERAT)

    // if(!userId || !email){
    //     c.status(411)
    //     return c.json(
    //         new apiresponse(false,411,"Ther user is not authorized")
    //     )
    // }

    //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {

    const user = await prisma.user.findUnique({
        where:{
             
        }
    })
    
  } catch (error) {
    console.log("error in authmiddleware",error)
    c.status(400)
    return c.json(
        new apiresponse(false,400,"error in auth middleware")
    )
  }


    
}

export default authMiddleware
// get the token form backend
// extract the userid and the email
// verifyed the email and id exist in the database or not
// add the userId and the Email in the context