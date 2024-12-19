import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";
async function getMyBlogs(c: any) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.blog.findMany({
      where: {
        authorId: c.get("userId")
      },
      include: {
        _count: {
          select: { likes: true }, // Count the number of likes for each blog
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
export default getMyBlogs