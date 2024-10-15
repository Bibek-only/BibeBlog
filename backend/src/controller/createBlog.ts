import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema } from "@bibek-samal/bibeblog-common";
import apiresponse from "../utils/apiResopnse";

async function createBlog(c: any) {
  const body = await c.req.json();
  const isValid = createBlogSchema.safeParse(body);
  if (!isValid.success) {
    c.status(400);
    return c.json(
      new apiresponse(false, 400, "Can't create the blog inputs are invalid")
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        coverImage: body.coverImage ? body.coverImage : null,
        authorId: c.get("userId"),
      },
    });

    if (!blog) {
      c.status(400);
      return c.json(new apiresponse(false, 400, "Can't create the blog"));
    }
    c.status(200);
    return c.json(new apiresponse(true, 200, "Sucessfully create the blog"));
  } catch (error) {
    c.status(400);
    return c.json(new apiresponse(false, 400, "Can't create the blog"));
  }
}

export default createBlog;
