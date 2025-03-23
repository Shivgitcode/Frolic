import { Hono } from "hono";
import type { auth } from "../utils/auth";
const authRouter = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

authRouter.get("/session", async (c) => {
	const session = c.get("session");
	const user = c.get("user");
	return c.json(
		{
			session,
			user,
		},
		200,
	);
});

export default authRouter;
