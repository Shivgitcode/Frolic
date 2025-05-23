import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { v4 as uuidv4 } from "uuid";
import { putVideo } from "../multer/middleware";
import { addJobs } from "../redis";
import { formSchema } from "../schemas/schema";
import { db } from "../database/client";
import { video } from "../database/drizzle/schema";
import type { auth } from "../utils/auth";

type Variables = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
};

interface JobData {
	bucket: string;
	key: string;
	accessKey: string;
	secretaccessKey: string;
	userId: string;
	videoId: string;
}

const factory = createFactory<{ Variables: Variables }>();
export const uploadVideo = factory.createHandlers(
	zValidator("form", formSchema),
	async (c) => {
		const user = c.get("user");
		console.log("User from context:", user); // Debug log

		if (!user) {
			console.log("No user found in context"); // Debug log
			return c.json({ error: "Unauthorized" }, 401);
		}

		const {
			name,
			video: videoFile,
			description,
			category,
			visibility,
		} = c.req.valid("form");

		console.log("Form data:", { name, description, category, visibility }); // Debug log
		console.log("User ID:", user.id); // Debug log

		const videobuffer = Buffer.from(await videoFile.arrayBuffer());
		const key = `uploads/${uuidv4()}-${videoFile.name}`;
		const data = await putVideo(key, "shivn-video-bucket-v2", videobuffer);

		// Create video record in database
		const videoId = uuidv4();
		try {
			await db.insert(video).values({
				id: videoId,
				title: name,
				description: description || null,
				category: category || "uncategorized",
				visibility: visibility || "public",
				status: "PENDING",
				userId: user.id,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			console.log("Video record created successfully"); // Debug log
		} catch (error) {
			console.error("Error creating video record:", error); // Debug log
			return c.json({ error: "Failed to create video record" }, 500);
		}

		// Add job to queue with videoId
		const jobData: JobData = {
			bucket: "shivn-video-bucket-v2",
			key,
			accessKey: process.env.ACCESS_KEY,
			secretaccessKey: process.env.SECRET_ACCESS_KEY,
			userId: user.id,
			videoId,
		};

		try {
			await addJobs(jobData);
			console.log("Job added to queue successfully"); // Debug log
		} catch (error) {
			console.error("Error adding job to queue:", error); // Debug log
			return c.json({ error: "Failed to add job to queue" }, 500);
		}

		return c.json(
			{
				message: "video uploaded",
				videoId,
				userId: user.id, // Include userId in response
			},
			201,
		);
	},
);
