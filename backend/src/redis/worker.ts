import { Worker } from "bullmq";
import { connection } from "./server";

const worker = new Worker(
  "videos",
  async (job) => {
    console.log("this is worker", job.data);
    const data = job.data;
    return {
      data,
      message: "done",
    };
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log("inside completed");
  console.log(`${job.id}`);
  console.log(job.data);
});
// worker.on("failed", (job, err) => {
//   console.log("inside failed");
//   console.log(`${job?.id} has failed with ${err.message}`);
// });
// worker.on("progress", (job) => {
//   console.log("inside progress");
//   console.log(`${job.id} -> ${job.data}`);
// });
