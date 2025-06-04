import axios from "axios";
import { api } from "../api";

export async function deleteBlogService(blogId: any){
    const token = localStorage.getItem('token')?.split(" ")[1];
    try {
        
        const delRes = await axios.delete(`${api}/api/v1/blog/deleteblog?blogId=${blogId}`,{
                headers:{
                    Authorization: token,
                }
            });
            if(delRes.data.success === true){
                return {success:true,msg: "blog deleted" }
            }
            return {success:false,msg: "blog deleted fail" }
        } catch (error:any) {
            console.log("error in delete blog service");
            return {success:false,msg: (error.message)?error.message:"blogdelete fail" }
    }


}