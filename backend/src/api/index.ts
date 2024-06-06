import { Hono } from "hono";
import { jwt } from "hono/jwt";

import films from "./films";
import users from "./users";

const app = new Hono();

app.use(
  "/films/*",
  jwt({
    secret: process.env.JWT_SECRET as string,
  })
);

app.route("/films", films);
app.route("/users", users);

export default app;
