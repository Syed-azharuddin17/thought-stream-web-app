import z, { string } from 'zod'

export const signUpValidation = z.object({
    username : z.string(),
    password:z.string().min(5),
    name:string()

})

export const signInValidation = z.object({
    username : z.string(),
    password:z.string().min(5)
})

export const createBlogValidation = z.object({
    title : z.string(),
    content : z.string()
})

export const updateBlogValidation = z.object({
    title : z.string(),
    content : z.string()
})


export type signUpValidationType = z.infer<typeof signUpValidation>
export type signInValidationType = z.infer<typeof signInValidation>
export type createBlogValidationType = z.infer<typeof createBlogValidation>
export type updateBlogValidationType = z.infer<typeof updateBlogValidation>
