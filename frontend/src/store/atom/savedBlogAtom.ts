import {atom} from 'recoil';
export const savedBlogAtom = atom({
    key: "savedBlogAtom",
    default: [{id:"",title:"",content:"",coverImage:""}]
})