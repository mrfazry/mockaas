import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import api from "./api";

const app = new Hono();

app.use("*", cors());

app.route("/api", api);

const port = 4567;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
