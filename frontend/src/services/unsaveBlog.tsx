import axios from "axios";

export default async function unsaveBlogService(id: number){
    const token = localStorage.getItem('token')?.split(" ")[1];
    try {
        const unsaveBlogRes = await axios.delete(`/api/v1/blog/removefromsavedblog?id=${id}`,{
            headers:{
                Authorization: token
            }
        });

        console.log(unsaveBlogRes)

        if(unsaveBlogRes.data.success === true){
            return {msg: "blog unsave successfuly", success:true};
        }
        else{
            return {msg: "blog unSaved failed", success:false};
            
        }
        
    } catch (error) {
        console.log(error)
        return {msg: "blog unsaved failed", success:false};
    }
}