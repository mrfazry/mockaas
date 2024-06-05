import { Hono } from "hono";

import byId from "./byId";

const app = new Hono();

app.route("/:id", byId);

app.post("", (c) => {
  return c.json("create film", 201);
});

app.get("", (c) => {
  return c.json("retrieve list of films", 200);
});

export default app;
