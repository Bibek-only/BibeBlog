import {atom, selector} from 'recoil';
import getSavedBlogService from '../../services/getSavedBlogService';


export const savedBlogAtom = atom({
    key: "savedBlogAtom",
    default: selector({
        key: "savedBlogSelector",
        get:async ()=>{
            const res = await getSavedBlogService();
            return res;
        }
    })
})