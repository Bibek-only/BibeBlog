import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import apiresponse from "../utils/apiResopnse";

async function deleteUser(c: any) {
  const password: string = await c.req.json();
  //initialize the prisma client

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = prisma.user.delete({
        where:{

            id:c.get("userId"),
            email: c.get("email"),
            password: password
        }
    })

    if(!user){
        c.status(400)
        return c.json(
            new apiresponse(false,400,"Password is incorrect")
        )
    }

    c.status(200)
    return c.json(
        new apiresponse(true,200,"Sucessfully delete the user")
    )
    
  } catch (error) {
    c.status(400)
        return c.json(
            new apiresponse(false,400,"Password is incorrect")
        )
  }


}
export default deleteUser;
//check the user in authorized or not
//match the password
//if matched then delte the user
//if not send password is incorect
