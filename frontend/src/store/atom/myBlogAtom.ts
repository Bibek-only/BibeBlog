import {atom, selector} from 'recoil';
import getMyBlogService from '../../services/getMyblogService';
export const myBlogAtom = atom({
    key: "myBlogAtom",
    default: selector({
        key: "myblogselector",
        get:async ()=>{
            const res = await getMyBlogService();
            return res;
        }
    })
})