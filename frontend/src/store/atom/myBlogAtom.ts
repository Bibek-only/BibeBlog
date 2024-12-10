import {atom} from 'recoil';
export const myBlogAtom = atom({
    key: "myBlogAtom",
    default: [{id:"",title:"",content:"",coverImage:""}]
})