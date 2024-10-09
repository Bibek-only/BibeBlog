import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>();

app.get('/', (c) => {
  
  return c.text('Hello Hono!')
})

export default app