import { Hono } from "hono";

const signin = new Hono();

signin.post("", (c) => {
  return c.json("signing in the user", 200);
});

export default signin;
