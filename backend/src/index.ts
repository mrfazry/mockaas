import { serve } from "@hono/node-server";
import { Hono } from "hono";

import api from "./api";

const app = new Hono();

app.route("/api", api);

const port = 4567;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
