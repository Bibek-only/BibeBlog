import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function addInSaveBlog(c: any) {
  const blogId = parseInt(c.req.query("id"));

  if (!blogId) {
    return c.jons(new apiresponse(false, 400, "No blog id found"));
  }

  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //create the saved blog for the user
  try {
    const savedBlogRes = await prisma.savedBlog.create({
        data:{
            userId: c.get("userId"),
            blogId: blogId
        }
    })

    if(!savedBlogRes){
        return c.json(
            new apiresponse(false,400,"Blog was not get saved yy")
        )
    }

    return c.json(
        new apiresponse(true, 200, "Blog saved sucessfully")
    )
  } catch (error) {
    
    return c.json(
        new apiresponse(false,400,"Blog was not get saved xx")
    )
  }

  
}
export default addInSaveBlog;

//need the user id (get in the context as it go throug auth middleware)
//need blog id in params ex-> ?id=3
