import { z } from "zod";
declare const singupSchema: z.ZodObject<{
    email: z.ZodString;
    userName: z.ZodString;
    firstName: z.ZodString;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    profilePhoto: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    userName: string;
    firstName: string;
    password: string;
    middleName?: string | undefined;
    lastName?: string | undefined;
    profilePhoto?: string | undefined;
}, {
    email: string;
    userName: string;
    firstName: string;
    password: string;
    middleName?: string | undefined;
    lastName?: string | undefined;
    profilePhoto?: string | undefined;
}>;
export type signupType = z.infer<typeof singupSchema>;
declare const singinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signinType = z.infer<typeof singinSchema>;
declare const createBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    coverImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    coverImage?: string | undefined;
}, {
    title: string;
    content: string;
    coverImage?: string | undefined;
}>;
export type createBlogType = z.infer<typeof createBlogSchema>;
declare const updateBlogSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodString;
    coverImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
    coverImage?: string | undefined;
}, {
    title: string;
    content: string;
    id: number;
    coverImage?: string | undefined;
}>;
export type updateBlogType = z.infer<typeof updateBlogSchema>;
export {};
