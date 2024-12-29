import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupType, signupTypeFrontend, singupSchema, singupSchemaFrontend } from "@bibek-samal/bibeblog-common";
import apiresponse from "../utils/apiResopnse";
async function signup(c: any) {
  
    const body:signupTypeFrontend = await c.req.parseBody(); //extract body
    
    const validation = singupSchemaFrontend.safeParse(body);
    
    if(! validation.success){
      console.log(validation.error)
      const msg = validation.error.errors[0].message;
      c.status(400)
      return c.json(
        new apiresponse(false,400,(msg)?msg:"The provided inputs are incorrect for signup")
      )
    }

    //extract the information
    const image = body.ProfilePhoto; 
    const userName = body.userName;
    const fullName = body.fullName;
    const password = body.password;
    const email = body.email;
    let imageUrl = ""

  //initialize the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  
  try {
    
    const findUser = await prisma.user.findUnique({
      where:{
        email: email,
        userName: userName
      }
    })
    
    if(findUser){
      c.status(400)
      return c.json(
        new apiresponse(false,400,"Provided email/username already taken")
      )
    }
    
    
    
    // upload the image to cloudinary
    const data = new FormData();
      data.append("file",image);
      data.append("upload_preset","bibeblog")
      data.append("cloud_name",c.env.CLOUD_NAME)
      try {
          const res = await fetch(c.env.CLOUD_URL, {
            method: "post",
            body: data,
          });
        
          if (!res.ok) {
            // throw new Error(`HTTP error! status: ${res.status}`);
            c.status(400)
          return c.json(
          new apiresponse(false,400,"failed to upload the image to cloudinary")
      )
  
          }
        
          const resData:any = await res.json();
          imageUrl = resData.url;
          
        } catch (err:any) {
          c.status(400)
          return c.json(
          new apiresponse(false,400,"failed to upload the image to cloudinary")
      )
        }

    //create the user data
    const userData:signupType = {
      email: email,
      userName: userName,
      fullName: fullName,
      password: password,
      profilePhoto: imageUrl,
    }

    //check the userdtat valid or not
    const isValid = singupSchema.safeParse(body);
  if (!isValid.success) {
    c.status(400);
    return c.json(
      new apiresponse(false, 400, "Can't create user inputs are invalid")
    );
  }

    const user = await prisma.user.create({ //create the user
    data: userData
    });

    const jwtToken = await sign( //create the jwt token
      {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      },
      c.env.JWT_SECREAT
    );

    c.status(200);
    return c.json(
      new apiresponse(true,200,"User created sucessfully",{token:jwtToken})
    );

  } catch (error) {
    
    c.status(500);
    return c.json(
      new apiresponse(false,500,"Can't register the user check email or user name")
    )
  }
}
export default signup;
