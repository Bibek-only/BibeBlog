import { z } from "zod";
export declare const singupSchema: z.ZodObject<{
    email: z.ZodString;
    userName: z.ZodString;
    fullName: z.ZodString;
    password: z.ZodString;
    profilePhoto: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    profilePhoto?: string | undefined;
}, {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    profilePhoto?: string | undefined;
}>;
export type signupType = z.infer<typeof singupSchema>;
export declare const singupSchemaFrontend: z.ZodObject<{
    email: z.ZodString;
    userName: z.ZodString;
    fullName: z.ZodString;
    password: z.ZodString;
    ProfilePhoto: z.ZodEffects<z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>, File, File>;
}, "strip", z.ZodTypeAny, {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    ProfilePhoto: File;
}, {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    ProfilePhoto: File;
}>;
export type signupTypeFrontend = z.infer<typeof singupSchemaFrontend>;
export declare const singinSchema: z.ZodObject<{
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
export declare const createBlogSchema: z.ZodObject<{
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
export declare const createBlogSchemaFrontend: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    coverImage: z.ZodEffects<z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>, File, File>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    coverImage: File;
}, {
    title: string;
    content: string;
    coverImage: File;
}>;
export type createBlogTypeFrontend = z.infer<typeof createBlogSchemaFrontend>;
export declare const updateBlogSchema: z.ZodObject<{
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
