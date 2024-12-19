import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";


 async function getSavedBlogs(c: any) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  

  try {
    const savedBlogs = await prisma.user.findUnique({
      where: {
        id: c.get("userId")
      },
      include: {
        savedBlogs: {
          include: {
            blog: true, // To fetch the associated blog details
          },
        },
      },
    });
    if (!savedBlogs) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Can't get the saved blogs"));
    }
   
    c.status(200);
    return c.json(
      new apiresponse(true, 200, "Sucessfully get all the saved Blogs", savedBlogs.savedBlogs)
    );
  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Can't get the saved blogs"));
  }
}

export default getSavedBlogs