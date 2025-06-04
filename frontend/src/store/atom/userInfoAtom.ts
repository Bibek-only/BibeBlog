import {atom, selector} from "recoil"
import { getUserInfoService } from "../../services/getUserInfoService"

export const logedinUserInfoAtom = atom({
    key: "logedinUserInfoAtom",
    default:selector({
        key: "logedinUserInfoSelecto",
        get: async ()=> {
            //fetch userinformation at first
            if(localStorage.getItem("token")){
                const userInfo = await getUserInfoService();
                return userInfo
            }else{
                return null
            }
        }
    })
})