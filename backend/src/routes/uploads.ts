import { Hono } from "hono";
import { uploadVideo } from "../controllers/upload";

const videoupload = new Hono();

videoupload.post("/uploads", ...uploadVideo);

export default videoupload;
