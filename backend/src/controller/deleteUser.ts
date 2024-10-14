import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function deleteUser(c: any) {
  const body = await c.req.json();

  if (!body || !body.password) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Password must need"));
  }

  const password = body.password;

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.delete({
      where: {
        id: c.get("userId"),
        email: c.get("email"),
        password: password,
      },
    });

    if (!user) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Password is incorrect"));
    }

    c.status(200);
    return c.json(new apiresponse(true, 200, "Sucessfully delete the user"));

  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Password is incorrect"));
  }
}
export default deleteUser;
