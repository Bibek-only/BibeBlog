import {atom, selector} from 'recoil';
import getAllBlogService from '../../services/getAllBlogService';
export const allBlogAtom = atom({
    key: "allBlogAtom",
    default: selector({
        key: "allblogselector",
        get:async ()=>{
            const res = await getAllBlogService();
            return res;
        }
    })
})