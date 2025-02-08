import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { formSchema } from "../schemas/schema";
import { storage } from "../multer/middleware";

const factory = createFactory();
export const uploadVideo = factory.createHandlers(
  zValidator("form", formSchema),
  storage.single("video", { sign: { expiresIn: 3600 } }),
  async (c) => {
    const { name, email } = c.req.valid("form");
    const { video } = c.var.signedURLs;
    return c.json(
      {
        message: "video uploaded",
      },
      201
    );
  }
);
