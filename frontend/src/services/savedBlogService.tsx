import axios from "axios";

export default async function savedBlogService(id: number){
    const token = localStorage.getItem('token')?.split(" ")[1];
    try {
        const savedBlogRes = await axios.post(`/api/v1/blog/addinsavedblog?id=${id}`,{},{
            headers:{
                Authorization: token
            }
        });

        if(savedBlogRes.data.success === true){
            return {msg: "blog saved successfuly", success:true};
        }
        else{
            return {msg: "blog saved failed", success:false};
            
        }
        
    } catch (error) {
        
        return {msg: "blog saved failed", success:false};
    }
}