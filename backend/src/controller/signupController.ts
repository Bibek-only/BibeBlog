import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupType, singupSchema } from "@bibek-samal/bibeblog-common";
import apiresponse from "../utils/apiResopnse";
async function signup(c: any) {
  
    const body:signupType = await c.req.json(); //extract body
    
    const validation = singupSchema.safeParse(body);
    
    if(! validation.success){
      const msg = validation.error.errors[0].message;
      c.status(400)
      return c.json(
        new apiresponse(false,400,(msg)?msg:"The provided inputs are incorrect for signup")
      )
    }

  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {

    const findUser = await prisma.user.findUnique({
      where:{
        email: body.email,
        userName: body.userName
      }
    })

    if(findUser){
      c.status(400)
      return c.json(
        new apiresponse(false,400,"Provided email/username already taken")
      )
    }

    const user = await prisma.user.create({ //create the user
    data: body
    });

    const jwtToken = await sign( //create the jwt token
      {
        id: user.id,
        email: user.email,
      },
      c.env.JWT_SECREAT
    );

    c.status(200);
    return c.json(
      new apiresponse(true,200,"User created sucessfully",{token:jwtToken})
    );

  } catch (error) {
    
    c.status(500);
    return c.json(
      new apiresponse(false,500,"Can't register the user check email or user name")
    )
  }
}
export default signup;
