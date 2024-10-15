import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema } from "@bibek-samal/bibeblog-common";
import apiresponse from "../utils/apiResopnse";

async function updateBlog(c: any) {
  const body = await c.req.json();
  const blogId = parseInt(c.req.query("blogId"));
  const isValid = createBlogSchema.safeParse(body);

  if (!isValid.success) {
    c.status(400);
    return c.json(
      new apiresponse(false, 400, "Can't update the Blog inputs are invalid")
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId as number,
        authorId: c.get("userId"),
      },
      data: {
        title: body.title,
        content: body.content,
        coverImage: body.coverImage ? body.coverImage : null,
      },
    });

    if (!updatedBlog) {
      c.status(400);
      return c.jons(new apiresponse(false, 400, "Cann't update the blog"));
    }

    c.status(200);
    return c.json(new apiresponse(true, 200, "Blog updated sucessfully"));
  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Can't update the Blog"));
  }
}

export default updateBlog;
