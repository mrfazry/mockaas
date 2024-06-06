import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import byId from "./byId";
import prisma from "../../db/prisma";

const app = new Hono();

app.route("/:id", byId);

const createFilmSchema = z.object({
  title: z.string().trim().min(1, "Title must be filled"),
  description: z.string().trim().optional(),
  image_thumbnail: z.string().url("Image thumbnail URL must be valid"),
});

app.post(
  "",
  zValidator("json", createFilmSchema, (result, c) => {
    if (!result.success) {
      const err = result.error.flatten();

      return c.json({ error: err.fieldErrors }, 400);
    }
  }),
  async (c) => {
    const payload = await c.req.json();

    try {
      const film = await prisma.film.create({ data: payload });

      return c.json({ data: film, error: null }, 201);
    } catch (err) {
      return c.json({ error: "Cannot add film", data: null }, 400);
    }
  }
);

app.get("", async (c) => {
  const films = await prisma.film.findMany();

  return c.json({ data: films, error: null }, 200);
});

export default app;
