import { Hono } from "hono";

import prisma from "../../../db/prisma";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.get("", async (c) => {
  const id = Number(c.req.param("id"));

  try {
    const film = await prisma.film.findUnique({ where: { id } });

    if (film) {
      return c.json({ data: film }, 200);
    }

    return c.json({ error: "Film not found", payload: null }, 404);
  } catch (err) {
    return c.json({ error: "Something went wrong.", payload: null }, 500);
  }
});

const updateFilmSchema = z.object({
  title: z.string().trim().min(1, "Title must be filled"),
  description: z.string().trim().optional(),
  image_thumbnail: z.string().url("Image thumbnail URL must be valid"),
});

app.put(
  "",
  zValidator("json", updateFilmSchema, (result, c) => {
    if (!result.success) {
      const err = result.error.flatten();

      return c.json({ error: err.fieldErrors }, 400);
    }
  }),
  async (c) => {
    const id = Number(c.req.param("id"));

    const payload = await c.req.json();

    try {
      const film = await prisma.film.update({ where: { id }, data: payload });

      return c.json({ data: film, error: null }, 200);
    } catch (err) {
      return c.json({ error: "Cannot update film", data: null }, 400);
    }
  }
);

app.delete("", async (c) => {
  const id = Number(c.req.param("id"));

  try {
    await prisma.film.delete({ where: { id } });

    return c.json("", 204);
  } catch (err) {
    return c.json({ error: "Cannot delete film.", payload: null }, 400);
  }
});

export default app;
