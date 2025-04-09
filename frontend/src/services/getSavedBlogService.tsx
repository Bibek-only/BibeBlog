import axios from "axios";
import { api } from "../api";

export default async function getSavedBlogService(){




    
    const token = localStorage.getItem('token')?.split(" ")[1];
   try {
    const savedBlogs = await axios.get(`${api}/api/v1/blog/getsavedblog`,{
        headers:{
            Authorization: token
        }
    })
    
    
    if(savedBlogs.data.success === true){
        return savedBlogs.data.data;
    }else{
        return []
    }
   } catch (error) {
    console.log(error)
    return []
   }

    
}