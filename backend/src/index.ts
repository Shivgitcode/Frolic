import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";
import authRouter from "./routes/auth";
import videoupload from "./routes/uploads";
import { auth } from "./utils/auth";

config();
const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.route("/api/v1", videoupload);
app.route("/api/v1", authRouter);
app.get("/", (c) => {
	return c.text("hello");
});

serve(
	{
		fetch: app.fetch,
		port: process.env.PORT,
	},
	(i) => {
		console.log(`server running on port ${i.port}`);
	},
);
