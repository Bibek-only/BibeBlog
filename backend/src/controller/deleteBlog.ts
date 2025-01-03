import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


import apiresponse from "../utils/apiResopnse";

async function deleteBlog(c: any) {
  //configuration the cloudinart



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
      select:{
        coverImage: true,
        
      }
    });
    console.log(deletedBlog)
    if(!deletedBlog){
        c.status(400)
        return c.json(
            new apiresponse(false,400,"Can't delete the blog")
        )
    }

    console.log("the cover image 1",deletedBlog.coverImage)
    //delete the blog image form cloudinary
    if(deletedBlog.coverImage !=null && deletedBlog.coverImage != ""){
      console.log("controll reached", deletedBlog.coverImage)
      try {
        const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
        const match = deletedBlog.coverImage.match(regex);
        const publicId:any =  match ? match[1] : null;
        
        //delete image using api
        // const result = await axios.post(
        //   `https://api.cloudinary.com/v1_1/${c.env.CLOUD_NAME}/image/destroy`,
        //   { public_id: publicId }, // Send the public_id of the image
        //   {
        //     auth: {
        //       username: c.env.API_KEY, // API key
        //       password: c.env.API_SECREATE, // API secret
        //     },
        //     headers: {
        //       'Content-Type': 'application/json', // Ensure proper headers
        //     },
        //   }
        // );

        
      } catch (error) {
        console.error('Error deleting image:', error);
        
      }
    }

    c.status(200)
    return c.json(
        new apiresponse(true,200,"Sucessfully delete the user",{imageUrl: deletedBlog.coverImage})
    )
  } catch (error) {

    c.status(400)
        return c.json(
            new apiresponse(false,400,"Can't delete the blog")
        )
  }
}

export default deleteBlog
