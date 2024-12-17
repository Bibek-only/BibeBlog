import axios from "axios";

export default async function addLikeService(id: number){
    const token = localStorage.getItem('token')?.split(" ")[1];
    console.log(token)
    try {
        const likeRes = await axios.post(`/api/v1/blog/likeblog?id=${id}`,{},{
            headers:{
                Authorization: token
            }
        });
        console.log(likeRes);
        if(likeRes.data.success === true){
            return {success: true, msg: "like added"}
        }

        return {msg: "like failed ",success: false};
    } catch (error) {
        console.log(error)
        console.log("error in like blog");
    }


}