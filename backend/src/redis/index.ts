import { Queue } from "bullmq";
import { connection } from "./server";

const myqueue = new Queue("videos", { connection: connection });
export async function addJobs({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) {
  await myqueue.add("add video", { bucket, key });
}
