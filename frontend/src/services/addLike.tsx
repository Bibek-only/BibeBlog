import axios from "axios";

export default async function addLikeService(id: number){
    const token = localStorage.getItem('token')?.split(" ")[1];
    
    try {
        const likeRes = await axios.post(`/api/v1/blog/likeblog?id=${id}`,{},{
            headers:{
                Authorization: token
            }
        });
        console.log(likeRes);
        if(likeRes.data.success === true){
            return {success: true, msg: "like added",for: likeRes.data.data.for}
        }

        return {msg: "like failed ",success: false};
    } catch (error) {
        console.log(error)
        return {msg: "like failed ",success: false};
    }


}