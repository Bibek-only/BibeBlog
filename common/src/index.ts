import {z} from "zod";

const singupSchema = z.object({

    email: z.string().email(),
    userName: z.string().max(20,{message:"username must be under 20 char"}),
    firstName: z.string(),
    middleName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().min(8,{message:"password must have at least 8  chars"}),
    profilePhoto: z.string().url().optional(),

})

export type signupType = z.infer<typeof singupSchema>;

const singinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export type signinType = z.infer<typeof singinSchema>

const createBlogSchema = z.object({
    title: z.string().max(50,{message:"Title must be under 50 char"}),
    content: z.string(),
    coverImage: z.string().url().optional()
})

export type createBlogType = z.infer<typeof createBlogSchema>;

const updateBlogSchema = z.object({
    id: z.number(),
    title: z.string().max(50,{message:"Title must be under 50 char"}),
    content: z.string(),
    coverImage: z.string().url().optional()
});

export type updateBlogType = z.infer<typeof updateBlogSchema>;