import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function deleteBlog(c: any) {
  const blogId = parseInt(c.req.query("blogId"));

  if (!blogId) {
    c.statsu(400);
    return c.json(new apiresponse(false, 400, "cannot find the blogId"));
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: blogId as number,
        authorId: c.get("userId"),
      },
    });
    
    if(!deletedBlog){
        c.status(400)
        return c.json(
            new apiresponse(false,400,"Can't delete the blog")
        )
    }

    c.status(200)
    return c.json(
        new apiresponse(true,200,"Sucessfully delete the user")
    )
  } catch (error) {

    c.status(400)
        return c.json(
            new apiresponse(false,400,"Can't delete the blog")
        )
  }
}

export default deleteBlog
