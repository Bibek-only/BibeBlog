import axios from "axios"
import { createBlogTypeFrontend } from "@bibek-samal/bibeblog-common";
export default async function createBlogService(obj:createBlogTypeFrontend){
  const token = localStorage.getItem('token')?.split(" ")[1];


  const title = obj.title;
  const content = obj.content;
  const image:any = obj.coverImage;
  

    const formData = new FormData();
    formData.append('coverImage', image[0]); // Add file
    formData.append('title', title);
    formData.append('content', content);

    try {

      const createBlogRes = await axios.post('api/v1/blog/create', formData, {
          headers: {
            Authorization: token,
           
          },
        })

        if(createBlogRes.data.success === true){
          
          return {success:true, message:(createBlogRes.data.message)?createBlogRes.data.message:"Blog created successfully"}
      }
  
      if(createBlogRes.data.sucess === false){
          return {success:false, message:(createBlogRes.data.message)?createBlogRes.data.message: "can't create the blog"}
      }
      
    } catch (error:any) {
       console.log("create Blog process failed: ",error)
    return {success:false,message:"create blog failed",error:error}
    }


    

}