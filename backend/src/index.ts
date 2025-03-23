import { Hono } from "hono";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { config } from "dotenv";
import videoupload from "./routes/uploads";
import { auth } from "./utils/auth";
import authRouter from "./routes/auth";
import { devlogger } from "./logger/log";
import { cors } from "hono/cors";

config();
const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

app.use(logger());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	c.set("user", session.user);
	c.set("session", session.session);
	return next();
});
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
		devlogger.info(`server running on port ${i.port}`, { label: "server" });
	},
);
