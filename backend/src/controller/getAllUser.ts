import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function getAllUser(c:any){
    //getnerate prisam client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allUser = await prisma.user.findMany({
        where:{
            id:{
                not: c.get("userId")
            }
        },
        select:{
            id: true,
            email: true,
            userName: true,
            fullName: true,
            profilePhoto: true,
            _count:{
                select:{
                    followers: true,
                }
            }
        },
        
    })

    if(!allUser){
        return c.json(
            new apiresponse(false, 400, "can't get the users",[])
        )
    }
    
    return c.json(
        new apiresponse(true, 200, "sucessfully get the users",allUser)
    )
    
} catch (error) {
      return c.json(
          new apiresponse(false, 400, "can't get the users",[])
      )
    
  }

}

export default getAllUser;