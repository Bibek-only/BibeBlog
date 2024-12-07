import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import userRouter from "./router/userRouter";
import blogRouter from "./router/blogRouter";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECREAT: string;
  };
}>();
app.use(prettyJSON());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/api/greet", (c) => {
  return c.text("Hello Hono!");
});

export default app;
