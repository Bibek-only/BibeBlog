import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";
async function getAllBlogs(c: any) {
  //getnerate prisam client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.blog.findMany({
      where: {
        authorId: {
          not: c.get("userId"),
        },
        
      },
      include: {
        _count: {
          select: { likes: true }, // Count the number of likes for each blog
        },
        author: {
          select: { // include the user author information of the user
            email: true,
            userName: true,
            fullName: true,
          },
        },

      },
    });
    if (!allBlogs) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Can't get the blogs"));
    }

    c.status(200);
    return c.json(
      new apiresponse(true, 200, "Sucessfully get all the Blogs", allBlogs)
    );
  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Can't get the blogs"));
  }
}
export default getAllBlogs