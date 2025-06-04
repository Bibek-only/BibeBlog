

import {atom, selector} from "recoil";
import getAllUserService from "../../services/getAllUser";

export const allUserAtom = atom({
    key: "userAtom",
    default: selector({
        key: "userSelector",
        get: async()=>{
           const res = await getAllUserService();
           return res;
        }
    })
})