import axios from "axios";

export async function getUserInfoService(){
    const token = localStorage.getItem('token')?.split(" ")[1];
    if(!token){
      return null
    }
    else{

      try {
          const axiosRes = await axios.get("/api/v1/user/getuserinfo", {
              headers: {
                Authorization:token
              },
            })
          if(axiosRes.data.success === true){
            return axiosRes.data.data;
          }
          return null
      } catch (error) {
          console.log("error in getuserInfo service")
          console.log(error)
          return null
      }
    }

  }








