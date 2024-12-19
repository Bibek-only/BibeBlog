import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

 async function likeBlog(c: any){

    //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = parseInt(c.req.query("id"));
  

  if (!blogId) {
    return c.jons(new apiresponse(false, 400, "No blog id found"));
  }

    try {

        const likeRes = await prisma.like.create({
            data: {
              userId: c.get("userId"),
              blogId: blogId,
            },
          });
          
          
          if(!likeRes){
            return c.json(
                new apiresponse(false,400,"like failed")
            )
          }
          return c.json(
            new apiresponse(true,200,"like success")
          )
    } catch (error) {
        return c.json(
        new apiresponse(false,400,"like failed")
    )
    }


}
export default likeBlog