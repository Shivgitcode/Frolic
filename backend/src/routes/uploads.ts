import { Hono } from "hono";
import { uploadVideo } from "../controllers/upload";
import type { auth } from "../utils/auth";
const videoupload = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

videoupload.post("/uploads", ...uploadVideo);

export default videoupload;
