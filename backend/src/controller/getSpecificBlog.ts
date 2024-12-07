import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";


async function getSpecificBlog(c:any){
    const id = parseInt(c.req.query("id"));
    
    if(!id){
        c.status(404)
        return c.json(
            new apiresponse(false,404,"no id found of the blog")
        )
    }
    

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      
    try {
        const blog = await prisma.blog.findUnique({
            where:{
                id: id,
                // authorId: c.get("userId")
            }
        })
        
        if(!blog){
            c.status(404)
            return c.json(
                new apiresponse(false,404,"no blog found")
            )
        }

        c.status(200)
        return c.json(
            new apiresponse(true,200,"Sucessfully get the blog",blog)
        )
    } catch (error) {
        c.status(404)
            return c.json(
                new apiresponse(false,404,"no blog found")
            )
    }


}

export default getSpecificBlog;