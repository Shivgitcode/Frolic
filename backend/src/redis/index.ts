import { Queue } from "bullmq";
import { connection } from "./server";

type JobData = {
	bucket: string;
	key: string;
	accessKey: string;
	secretaccessKey: string;
};

const myqueue = new Queue<JobData>("videos", { connection: connection });

export async function addJobs(data: JobData) {
	console.log("adding job to queue");
	await myqueue.add("add video", data);
}
