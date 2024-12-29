
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema, createBlogSchemaFrontend } from "@bibek-samal/bibeblog-common";
import apiresponse from "../utils/apiResopnse";

import { createBlogTypeFrontend } from "@bibek-samal/bibeblog-common";
async function createBlog(c: any) {

  //validate the data
  const bodyData:createBlogTypeFrontend = await c.req.parseBody();
  
  const validation = createBlogSchemaFrontend.safeParse(bodyData);
  
  if(! validation.success){
    const msg = validation.error.errors[0].message;
    c.status(400)
    return c.json(
      new apiresponse(false,400,(msg)?msg:"The provided inputs are incorrect for create Blog")
    )
  }
  
  const image = bodyData.coverImage;
  const title = bodyData.title;
  const content = bodyData.content;
  let imageUrl = "";

  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    
    

  // upload the image to cloudinary
  const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","bibeblog")
    data.append("cloud_name",c.env.CLOUD_NAME)
    try {
        const res = await fetch(c.env.CLOUD_URL, {
          method: "post",
          body: data,
        });
      
        if (!res.ok) {
          // throw new Error(`HTTP error! status: ${res.status}`);
          c.status(400)
        return c.json(
        new apiresponse(false,400,"failed to upload the image to cloudinary")
    )

        }
      
        const resData:any = await res.json();
        imageUrl = resData.url;
        
      } catch (err:any) {
        c.status(400)
        return c.json(
        new apiresponse(false,400,"failed to upload the image to cloudinary")
    )
      }

      

    const body = {title:title, content: content, coverImage: imageUrl}
  
  const isValid = createBlogSchema.safeParse(body);
  if (!isValid.success) {
    c.status(400);
    return c.json(
      new apiresponse(false, 400, "Can't create the blog inputs are invalid")
    );
  }


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
