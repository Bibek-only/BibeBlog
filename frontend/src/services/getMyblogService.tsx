import axios from "axios";

export default async function getMyBlogService(){




    
    const token = localStorage.getItem('token')?.split(" ")[1];
   try {
    const myBlog = await axios.get("/api/v1/blog/getmyblog",{
        headers:{
            Authorization: token
        }
    })

    if(myBlog.data.success === true){
        return myBlog.data.data;
    }else{
        return []
    }
   } catch (error) {
    console.log("error at my blog service",error)
    return []
   }

    
}