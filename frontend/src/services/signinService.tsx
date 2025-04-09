import { signinType } from "@bibek-samal/bibeblog-common";
import axios from "axios";
import { api } from "../api";
export async function signinService(data: signinType) {
  try {
    const signinRes = await axios.post(`${api}/api/v1/user/signin`, data);
    if (signinRes.data.success === true) {
      //set the token in localstorage
      localStorage.setItem("token", `bearer ${signinRes.data.data.token}`);
      return { success: true, message: signinRes.data.message };
    }

    if (signinRes.data.sucess === false) {
      return { success: false, message: signinRes.data.message };
    }
  } catch (error:any) {
    console.log("signin process failed in api call", error);
    return { success: false, message: "signin process failed", error: error };
  }
}
