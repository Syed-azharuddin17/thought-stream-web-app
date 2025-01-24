import { signInValidation, signUpValidation } from '@syedazharuddin0081/thought-stream-commons';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';


export const userRoutes = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string
    }
}>;


userRoutes.post('/signup', async (c) => {
  const body = await c.req.json();

  // Validate the request body
  const { success } = signUpValidation.safeParse(body);

  if (!success) {
    return c.json({
      msg: "Validation failed!",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the salt rounds

    // Store the user in the database with the hashed password
    const users = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword, // Store the hashed password
        name: body.name,
      },
    });

    // Generate a JWT token for the user
    const token = await sign(
      {
        id: users.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      msg: 'User created successfully!',
      token: token,
      name:users.name
      
      
    });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return c.text('Something went wrong !!!');
  }
});
  
userRoutes.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signInValidation.safeParse(body);

  if (!success) {
    return c.json({
      msg: "Validation failed!",
    });
  }

  try {
    // Find the user by username
    const signInUser = await prisma.user.findFirst({
      where: {
        username: body.username,
      }
    });

    if (!signInUser) {
      return c.json({ msg: "User not found!" });
    }

    // Compare the password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(body.password, signInUser.password);

    if (!isPasswordValid) {
      return c.json({ msg: "Invalid password!" });
    }

    // Generate a JWT token for the user
    const token = await sign({
      id: signInUser.id
    }, c.env.JWT_SECRET);

    return c.json({
      token: token,
      name: signInUser.name
    });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    c.status(403);
    return c.text("Failed to login !!!");
  }
});