import axios from "axios";

export async function getUserInfoService(){
    const token = localStorage.getItem('token')?.split(" ")[1];
    if(!token){
      return "unknown"
    }
    else{

      try {
          const axiosRes = await axios.get("/api/v1/user/getuserinfo", {
              headers: {
                Authorization:token
              },
            })
          if(axiosRes){
            return axiosRes.data.data.fullName;
          }
          return "Unknown"
      } catch (error) {
          console.log("error in getuserInfo service")
          console.log(error)
          return "Unknown"
      }
    }

  }








