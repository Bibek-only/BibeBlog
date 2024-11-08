import { signupType } from "@bibek-samal/bibeblog-common"
import axios from "axios";
export async function signupService(obj:signupType){
    // do the api call for register the user
    // console.log("your data reached")
    // console.log(obj);
    // const res = await axios.post(`/api/user/signup/`);
    // console.log(res);
    const res2 = await axios.get('/api/h');
    console.log(res2);
    return "sucessfull"
}