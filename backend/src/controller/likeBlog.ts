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
              new apiresponse(false,400,"like faliled")
            )

          }

          return c.json(
            new apiresponse(true,200,"like success",{for: "like"})
          )
    } catch (error) {
      //dislike the blog
      try {
        const dislikeRes = await prisma.like.delete({
          where:{
            userId_blogId: {
              userId: c.get("userId"),
              blogId: blogId,
            },
          }
        });

        if(!dislikeRes){
          return c.json(
            new apiresponse(false,400,"Dislike failed")
        )
        }
        return c.json(
          new apiresponse(true,200,"dislike success",{for: "dislike"})
        )
  
      } catch (error) {
        return c.json(
        new apiresponse(false,400,"dislike failed")
      )
      }
      
        return c.json(
        new apiresponse(false,400,"like failed")
    )
    }


}
export default likeBlog