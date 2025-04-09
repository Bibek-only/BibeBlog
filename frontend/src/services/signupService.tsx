import {signupTypeFrontend } from "@bibek-samal/bibeblog-common"
import axios from "axios";
import { api } from "../api";
export async function signupService(obj:signupTypeFrontend){

    const {email,userName,fullName,password} = obj;
    const image:any = obj.ProfilePhoto;
    const formData = new FormData();
    formData.append("email",email);
    formData.append("userName",userName);
    formData.append("fullName",fullName);
    formData.append("password", password);
    formData.append("ProfilePhoto",image[0]); //add file
    
    

   try {
    const signupRes = await axios.post(`${api}/api/v1/user/signup`,formData);
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