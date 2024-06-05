import { Hono } from "hono";

import register from "./register";
import signin from "./signin";

const app = new Hono();

app.route("/register", register);
app.route("/signin", signin);

export default app;
