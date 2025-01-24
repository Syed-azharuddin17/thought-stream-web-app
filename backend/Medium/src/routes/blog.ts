import { createBlogValidation, signUpValidation, updateBlogValidation } from '@syedazharuddin0081/thought-stream-commons';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from "hono"
import { verify } from 'hono/jwt';

export const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRoutes.use('/*',async (c,next)=>{
    const token = c.req.header("authorization") || " "
    const decodeToken = await verify(token,c.env.JWT_SECRET)
    if (decodeToken) {
        // @ts-ignore
        c.set("userId", decodeToken.id ); 
        await next();
    } else {
        return c.text("Please log in to view the blog !!!", 401);
    }
    
})



blogRoutes.post('/', async (c) => {

  
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const authorId = c.get("userId")

    console.log(body)
    console.log(authorId)

    const {success} = createBlogValidation.safeParse(body)


    if(!success){
      return c.json({
        msg :"Validation failed!"
      })
    }

    const blog=await prisma.blog.create({
        data:{
            content:body.content,
            title:body.title,
            authorId:parseInt(authorId)
        }
    })    

  return c.json({
    msg :"Blog created successfully!",
    id:blog.id
  })
})

blogRoutes.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const {success} = updateBlogValidation.safeParse(body)

    if(!success){
      return c.json({
        msg :"Validation failed!"
      })
    }

    console.log(body)
    const updatedData = await prisma.blog.update({
        where:{
           id:body.id 
        },
        data:{
            content:body?.content,
            title:body.title
        }
    })
    console.log(updatedData)
  return c.text('Blog updated successfully!!!')
})

blogRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
      try {
        const blogs = await prisma.blog.findMany({
          select:{
            id:true,
            title:true,
            content:true,
            author:{
              select:{
                name:true
              }
            }
          }
        })
      return c.json({
        blogs
      })
      } catch (error) {
        
        return c.text("Error in fetching blogs!")
      }
      
    })

blogRoutes.get('/:id', async (c) => {
 
  const id = c.req.param('id')  
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const blogByID = await prisma.blog.findUnique({
        where:{
            id:Number(id)
        },
        select:{
          id:true,
          title:true,
          content:true,
          author:{
            select:{
              name:true
            }
          }

        }
      })
      return c.json({
        blogs : blogByID
      })
  } catch (error) {
    return c.text("Error in fetching blog")
  }

  
})


 
