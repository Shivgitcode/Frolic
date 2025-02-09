import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { formSchema } from "../schemas/schema";
import { addJobs } from "../redis";
import { v4 as uuidv4 } from "uuid";
import { putVideo } from "../multer/middleware";

const factory = createFactory();
export const uploadVideo = factory.createHandlers(
  zValidator("form", formSchema),
  async (c) => {
    const { name, email, video } = c.req.valid("form");
    const videobuffer = Buffer.from(await video.arrayBuffer());
    const key = `uploads/${uuidv4()}-${video.name}`;
    const data = await putVideo(key, "shivn-video-bucket", videobuffer);
    addJobs({ bucket: "shivn-video-bucket", key });

    return c.json(
      {
        message: "video uploaded",
      },
      201
    );
  }
);
