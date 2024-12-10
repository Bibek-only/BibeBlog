import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { singinSchema,signinType } from "@bibek-samal/bibeblog-common"
import { sign } from "hono/jwt";
import apiresponse from "../utils/apiResopnse";
async function signin(c: any){

    const body:signinType = await c.req.json()
    const validation = singinSchema.safeParse(body);
    if(! validation.success){
      const msg = validation.error.errors[0].message;
      c.status(400)
      return c.json(
        new apiresponse(false,400,(msg)?msg:"The provided inputs are incorrect for signin")
      )
    }

    //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    
   try {
    const user = await prisma.user.findUnique({
        where:{
            email:body.email,
            password: body.password
        }
    })

    if(user){

        const jwtToken = await sign(
            {
              id: user.id,
              email: user.email,
              fullName: user.fullName
            },
            c.env.JWT_SECREAT
          );

          c.status(200)
          return c.json(
            new apiresponse(true,200,"User signed in sucessfully",{token:jwtToken})
          )
    }else{
        c.status(400)
        return c.json(
          new apiresponse(false,400,"Provided email and password does not match any user")
        )
    }

   } catch (error) {
    
    c.status(500)
    return c.json(
      new apiresponse(false,500,"Internal server error in signin end pint")
    )
   } 
}

export default signin