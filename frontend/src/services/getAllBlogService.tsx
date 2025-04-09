import axios from "axios";
import { api } from "../api";
export default async function getAllBlogService(){
    
    const token = localStorage.getItem('token')?.split(" ")[1];
    try {
        const blogs = await axios.get(`${api}/api/v1/blog/getallblog`,{
            headers:{
                Authorization: token,
            }
        })
        if(blogs.data.success === true){
            return blogs.data.data;

        }else{
            return []
        }
    } catch (error) {
        console.log("error at get all blog service")
        return []
    }
   
}