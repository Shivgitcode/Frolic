import { Queue } from "bullmq";
import { accepts } from "hono/accepts";
import { connection } from "./server";

const myqueue = new Queue("videos", { connection: connection });
export async function addJobs({
	bucket,
	key,
	accessKey,
	secretaccessKey,
}: {
	bucket: string;
	key: string;
	accessKey: string;
	secretaccessKey: string;
}) {
	await myqueue.add("add video", { bucket, key, accessKey, secretaccessKey });
}
