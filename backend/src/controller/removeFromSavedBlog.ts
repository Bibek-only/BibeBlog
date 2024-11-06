import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function removeFromSavedBlog(c: any) {
  const savedBlogId = parseInt(c.req.query("id"));

  if (!savedBlogId) {
    return c.jons(new apiresponse(false, 400, "No blog id found"));
  }

  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //remove the blog from saved Blog
  try {
    const removeBlogRes = await prisma.savedBlog.delete({
        where:{
            id: savedBlogId
        }
    })

    if(!removeBlogRes){
        return c.json(
            new apiresponse(false,400,"Blog dont get removed")
        )
    }

    return c.json(
        new apiresponse(true, 200, "Blog removed Sucessfully")
    )
  } catch (error) {
    
    return c.json(
        new apiresponse(false,400,"Blog dont get removed")
    )
  }

  
}
export default removeFromSavedBlog;

//need savedBlogId in params ex-> ?id=3
