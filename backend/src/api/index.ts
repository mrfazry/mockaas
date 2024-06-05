import { Hono } from "hono";

import films from "./films";
import users from "./users";

const app = new Hono();

app.route("/films", films);
app.route("/users", users);

export default app;
