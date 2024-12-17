import { z } from "zod";
export const singupSchema = z.object({
    email: z.string().email(),
    userName: z.string().max(20, { message: "username must be under 20 char" }),
    fullName: z.string(),
    password: z.string().min(8, { message: "password must have at least 8  chars" }),
    profilePhoto: z.string().url().optional(),
});
export const singinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
export const createBlogSchema = z.object({
    title: z.string().max(50, { message: "Title must be under 50 char" }),
    content: z.string(),
    coverImage: z.string().url().optional()
});
export const createBlogSchemaFrontend = z.object({
    title: z.string().max(50, { message: "Title must be under 50 characters" }),
    content: z.string(),
    coverImage: z
        .instanceof(File)
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), { message: "Only .jpg and .png file types are allowed" })
        .refine((file) => file.size <= 2 * 1024 * 1024, { message: "File size must be less than or equal to 2MB" }),
});
export const updateBlogSchema = z.object({
    id: z.number(),
    title: z.string().max(50, { message: "Title must be under 50 char" }),
    content: z.string(),
    coverImage: z.string().url().optional()
});
