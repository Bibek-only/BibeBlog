import axios from "axios";
export default async function getAllBlogService(){
    
    const token = localStorage.getItem('token')?.split(" ")[1];
    try {
        const blogs = await axios.get("/api/v1/blog/getallblog",{
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
        return []
    }
   
}