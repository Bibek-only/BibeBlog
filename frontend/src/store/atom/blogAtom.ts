import { atom } from "recoil"

export const blogAtom  = atom ({
    key: "blogAtom",
    default: {title: "", content: "", coverImage:"", _count:{likes:""}, fullName: "", userName: "", email: ""}
})