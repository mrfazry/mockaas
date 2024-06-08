import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prisma from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { hashPassword } from "../../utils/bcrypt";

const register = new Hono();

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/gi,
      "Username must only contain alphanumeric characters and without space"
    ),
  email: z.string().trim().email("Email must be valid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

register.post(
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
      const { hashedPassword, error } = await hashPassword(payload.password);

      if (error) {
        return c.json({ error: { password: error } }, 400);
      }

      const user = await prisma.user.create({
        data: { ...payload, password: hashedPassword },
      });
    } catch (err) {
      console.log(err);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (err.code === "P2002") {
          const fields = err.meta?.target;

          let errPayload: { [k in string]: string } = {};

          if (Array.isArray(fields)) {
            fields.map((f) => {
              errPayload[f] = `"${f}" has already been taken`;
            });
          }

          return c.json(
            {
              error: errPayload,
            },
            400
          );
        }
      }

      return c.json({ error: "Something went wrong" }, 500);
    }

    return c.json(
      { error: null, message: "User is successfully created" },
      201
    );
  }
);

export default register;
