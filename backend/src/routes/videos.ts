import { Hono } from "hono";
import { db } from "../database/client";
import { video as videoTable } from "../database/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import type { auth } from "../utils/auth";

const videoRouter = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

// Get all videos
videoRouter.get("/videos", async (c) => {
	try {
		const videos = await db
			.select()
			.from(videoTable)
			.orderBy(desc(videoTable.createdAt));
		return c.json(videos, 200);
	} catch (error) {
		console.error("Error fetching videos:", error);
		return c.json({ error: "Failed to fetch videos" }, 500);
	}
});

// Get video by ID
videoRouter.get("/videos/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const result = await db
			.select()
			.from(videoTable)
			.where(eq(videoTable.id, id))
			.limit(1);
		const videoData = result[0];

		if (!videoData) {
			return c.json({ error: "Video not found" }, 404);
		}

		return c.json(videoData, 200);
	} catch (error) {
		console.error("Error fetching video:", error);
		return c.json({ error: "Failed to fetch video" }, 500);
	}
});

export default videoRouter;
