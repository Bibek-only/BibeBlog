import { atom } from "recoil";
export const isLogedinAtom = atom({
    key: 'isLogedinAtom',
    default: (localStorage.getItem("token"))? true: false
})