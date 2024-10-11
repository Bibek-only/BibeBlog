import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupType } from "@bibek-samal/bibeblog-common";

async function signup(c: any) {
  
    const body: signupType = await c.req.json(); //extract body
  

  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
    data: body,
    });

    const jwtToken = await sign(
      {
        id: user.id,
        email: user.email,
      },
      c.env.JWT_SECREAT
    );

    c.status(200);
    return c.json({
      msg: "user created",
      data: {
        token: jwtToken,
      },
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("cannot create the user");
  }
}
export default signup;
