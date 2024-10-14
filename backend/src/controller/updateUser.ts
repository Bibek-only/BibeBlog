import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { singupSchema, signupType } from "@bibek-samal/bibeblog-common";
import apiresponse from "../utils/apiResopnse";
import { sign } from "hono/jwt";
async function updateUser(c: any) {
  const body: signupType = await c.req.json(); //extract body
  const validation = singupSchema.safeParse(body);

  if (!validation.success) {
    const msg = validation.error.errors[0].message;
    c.status(400);
    return c.json(
      new apiresponse(
        false,
        400,
        msg ? msg : "The provided inputs are incorrect for signup"
      )
    );
  }

  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: c.get("userId"),
        email: c.get("email"),
      },
      data: body,
    });

    if (!updatedUser) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Can't update the user"));
    }
    const jwtToken = await sign(
      //create the jwt token
      {
        id: updatedUser.id,
        email: updatedUser.email,
      },
      c.env.JWT_SECREAT
    );
    c.status(200);
    return c.json(
      new apiresponse(true, 200, "user information updated sucessfully", {
        token: jwtToken,
      })
    );
  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Can't update the user"));
  }
}

export default updateUser;
