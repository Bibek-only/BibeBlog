import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinType } from "@bibek-samal/bibeblog-common"
import { sign } from "hono/jwt";
async function signin(c: any){

    const body:signinType = await c.req.json()

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
            },
            c.env.JWT_SECREAT
          );

          c.status(200)
          return c.json({
            msg:"user signed in sucessfully",
            data:{
                token: jwtToken
            }
          })
    }else{
        c.status(400)
        return c.text("provided email and password are not found")
    }

   } catch (error) {
    console.log(error)
    c.status(400)
    return c.text("error in signin")
   } 
}

export default signin