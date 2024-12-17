import axios from "axios"
export default async function getBlogInfoService(blogId: any){

    const token = localStorage.getItem('token')?.split(" ")[1];

    //getch the blog details
    try {
        const axiosRes = await axios.get(`/api/v1/blog/getspeceficblog?id=${blogId}`,{
            headers:{
                Authorization: token,
            }
        })
        return axiosRes.data.data;
    } catch (error) {
        console.log(error)
        return {title: null, content: null, coverImage:null, _count:{likes:0}}
    }
    
}