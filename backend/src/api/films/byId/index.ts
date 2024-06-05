import { Hono } from "hono";

const app = new Hono();

app.get("", (c) => {
  return c.json("retrieving film by id", 200);
});

app.put("", (c) => {
  return c.json("update film by id", 200);
});

app.delete("", (c) => {
  return c.json(204);
});

export default app;
