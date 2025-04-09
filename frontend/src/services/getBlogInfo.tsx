import axios from "axios"
import { api } from "../api";
export default async function getBlogInfoService(blogId: any){

    const token = localStorage.getItem('token')?.split(" ")[1];

    //getch the blog details
    try {
        const axiosRes = await axios.get(`${api}/api/v1/blog/getspeceficblog?id=${blogId}`,{
            headers:{
                Authorization: token,
            }
        })
        const data = axiosRes.data.data;
        console.log("xx",data);
        return {title: data.title, content: data.content, coverImage:data.coverImage, _count:data._count.likes, fullName:data.author.fullName, userName: data.author.userName, email: data.author.email};
    } catch (error) {
        console.log(error)
        return {title: null, content: null, coverImage:null, _count:null, fullName:null, userName: null, email: null}
    }
    
}