import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function getUserInformation(c: any) {
  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: c.get("useId"),
        email: c.get("email"),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        middleName: true,
        LastName: true,
      },
    });

    if (!userInfo) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Can't get the use info"));
    }

    c.status(200); //send the response with data
    return c.json(
      new apiresponse(true, 200, "Successfully get the user info", userInfo)
    );

  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Can't get the use info"));
  }
  
}
export default getUserInformation;
