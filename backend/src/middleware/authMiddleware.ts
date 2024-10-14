import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import apiresponse from "../utils/apiResopnse";
async function authMiddleware(c: any, next: any) {
  const token = c.req.header("Authorization"); //extract the token from the head

  if (!token) {
    c.status(401);
    return c.json(
      new apiresponse(
        false,
        401,
        "Ther user is not authorized, auth token must need"
      )
    );
  }

  try {
    const tokenvalue = await verify(token, c.env.JWT_SECREAT);

    //initialize the prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        id: tokenvalue.id as number,
        email: tokenvalue.email as string,
      },
    });
    if (!user) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Provided token is not authorized"));
    } else {
      //set the userId and the email in the context
      c.set("userId", user.id);
      c.set("email", user.email);
      c.status(200);
      await next();

    }
  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "not authorized"));
  }
}

export default authMiddleware;

