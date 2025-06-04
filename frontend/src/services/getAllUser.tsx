import axios from "axios";
import { api } from "../api";


export default async function getAllUserService(){
   const token = localStorage.getItem('token')?.split(" ")[1];
   
   try {
        const allUser = await axios.get(`${api}/api/v1/user/getalluser`,{
            headers:{
                Authorization: token,
            }
        });
        if(allUser.data.success === true){

            return allUser.data.data;
        }
           return []
    } catch (error) {
        console.log("error in alluser service")
        return []
    }
}