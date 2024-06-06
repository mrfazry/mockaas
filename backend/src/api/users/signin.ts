import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import prisma from "../../db/prisma";
import { comparePasswords } from "../../utils/bcrypt";
import { sign } from "hono/jwt";

const signin = new Hono();

const schema = z.object({
  email: z.string().trim().email("Email must be valid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

signin.post(
  "",
  zValidator("json", schema, (result, c) => {
    if (!result.success) {
      const err = result.error.flatten();

      return c.json({ error: err.fieldErrors }, 400);
    }
  }),
  async (c) => {
    const payload = await c.req.json();

    try {
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        return c.json(
          { error: { email: "No user found with that email" } },
          404
        );
      }

      const doesPasswordMatch = await comparePasswords(
        payload.password,
        user.password
      );

      if (doesPasswordMatch) {
        const jwtPayload = {
          sub: user.id,
          email: user.email,
          username: user.username,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        };

        const token = await sign(jwtPayload, process.env.JWT_SECRET as string);

        return c.json({ token });
      } else {
        return c.json({ error: { password: "Wrong credentials" } }, 404);
      }
    } catch (err) {}

    return c.json("signing in the user", 200);
  }
);

export default signin;
