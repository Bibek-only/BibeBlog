import axios from "axios";
export async function getUserInfoService(){
    const token = localStorage.getItem('token')?.split(" ")[1];
    
    
    try {
        const axiosRes = await axios.get("/api/v1/user/getuserinfo", {
            headers: {
              Authorization:token
            },
          })
        return axiosRes.data.data;
    } catch (error) {
        console.log("error in getuserInfo service")
        console.log(error)
        return
    }
}