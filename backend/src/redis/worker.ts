import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { Worker } from "bullmq";
import { config } from "dotenv";
import { connection } from "./server";
import { db } from "../database/client";
import { video } from "../database/drizzle/schema";
import { eq } from "drizzle-orm";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

config();
const ecsclient = new ECSClient({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});

const s3client = new S3Client({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});

type Job = {
	bucket: string;
	key: string;
	accessKey: string;
	secretaccessKey: string;
	userId: string;
	videoId: string;
};

const worker = new Worker(
	"videos",
	async (job) => {
		console.log("Worker started processing job:", job.id);
		console.log("Job data:", job.data);

		const data: Job = job.data;
		try {
			// Update video status to processing
			await db
				.update(video)
				.set({
					status: "PROCESSING",
					updatedAt: new Date(),
				})
				.where(eq(video.id, data.videoId));

			const runecscommand = new RunTaskCommand({
				taskDefinition: process.env.TASK_ARN,
				cluster: process.env.CLUSTER_ARN,
				launchType: "FARGATE",
				networkConfiguration: {
					awsvpcConfiguration: {
						assignPublicIp: "ENABLED",
						securityGroups: ["sg-08d4c3de8b568f9ed"],
						subnets: [
							"subnet-0b81dc64a815c2a05",
							"subnet-0dca2006179f8fd2c",
							"subnet-0a5abf0b2e0c71ec7",
						],
					},
				},
				overrides: {
					containerOverrides: [
						{
							name: "video-transcoder",
							environment: [
								{
									name: "BUCKET",
									value: data.bucket,
								},
								{
									name: "KEY",
									value: data.key,
								},
								{
									name: "SECRET_ACCESS_KEY",
									value: data.secretaccessKey,
								},
								{
									name: "ACCESS_KEY",
									value: data.accessKey,
								},
								{
									name: "USER_ID",
									value: data.userId,
								},
							],
						},
					],
				},
			});

			console.log("Starting ECS task...");
			await ecsclient.send(runecscommand);
			console.log("ECS task started successfully");

			// Wait for the transcoding to complete
			console.log("Waiting for transcoding to complete...");
			await new Promise((resolve) => setTimeout(resolve, 300000)); // Wait 5 minutes for transcoding

			// Get transcoded URLs from S3
			const listCommand = new ListObjectsV2Command({
				Bucket: "shivn-transcoded-bucket-v2",
				Prefix: `users/${data.userId}/videos/${data.key.split("/").pop()?.split(".")[0]}`,
			});

			const { Contents } = await s3client.send(listCommand);
			const transcodedUrls: { [key: string]: string } = {};

			if (Contents) {
				for (const item of Contents) {
					if (item.Key?.endsWith(".m3u8")) {
						const resolution = item.Key.match(/output_(\d+)p/)?.[1];
						if (resolution) {
							transcodedUrls[`${resolution}p`] =
								`https://shivn-transcoded-bucket-v2.s3.us-east-1.amazonaws.com/${item.Key}`;
						}
					}
				}
			}

			console.log("Found transcoded URLs:", transcodedUrls);

			if (Object.keys(transcodedUrls).length === 0) {
				throw new Error("No transcoded URLs found");
			}

			// Update the video record with the streaming URLs
			await db
				.update(video)
				.set({
					streamingUrls: transcodedUrls,
					status: "READY",
					updatedAt: new Date(),
				})
				.where(eq(video.id, data.videoId));

			console.log("Video record updated successfully");
		} catch (err: any) {
			console.error("Error in worker:", err);
			// Update video status to failed
			await db
				.update(video)
				.set({
					status: "FAILED",
					updatedAt: new Date(),
				})
				.where(eq(video.id, data.videoId));
			throw err;
		}
	},
	{
		connection,
	},
);

worker.on("completed", (job) => {
	console.log("Job completed successfully:", job.id);
	console.log("Job data:", job.data);
});

worker.on("failed", (job, err) => {
	console.error("Job failed:", job?.id);
	console.error("Error:", err.message);
	console.error("Job data:", job?.data);
});

// Handle process termination
process.on("SIGTERM", async () => {
	console.log("SIGTERM received, closing worker...");
	await worker.close();
	process.exit(0);
});

process.on("SIGINT", async () => {
	console.log("SIGINT received, closing worker...");
	await worker.close();
	process.exit(0);
});
