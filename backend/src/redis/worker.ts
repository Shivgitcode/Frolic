import { Worker } from "bullmq";
import { connection } from "./server";
import { getVideo } from "../multer/middleware";

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
