import { Hono } from "hono";

const register = new Hono();

register.post("", (c) => {
  return c.json("registering the user", 201);
});

export default register;
