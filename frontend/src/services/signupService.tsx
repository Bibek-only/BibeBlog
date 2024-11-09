import { signupType } from "@bibek-samal/bibeblog-common"
import axios from "axios";
export async function signupService(obj:signupType){
    
   try {
    const signupRes = await axios.post("/api/v1/user/signup",obj)
    if(signupRes.data.success === true){
        //set the token in localstorage
        localStorage.setItem('token',`bearer ${signupRes.data.data.token}`)
        return {success:true, message: signupRes.data.message}
    }

    if(signupRes.data.sucess === false){
        return {success:false, message: signupRes.data.message}
    }

    
   } catch (error:any) {
   
    console.log("signup process failed in api call",error)
    return {success:false,message:"signup process failed",error:error}
   
   }
    
    
}