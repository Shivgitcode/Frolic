import { Worker } from "bullmq";
import { connection } from "./server";
import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { config } from "dotenv";
config();
const ecsclient = new ECSClient({
  region: "eu-north-1",
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
};
const worker = new Worker(
  "videos",
  async (job) => {
    console.log("this is worker", job.data);

    const data: Job = job.data;
    try {
      const runecscommand = new RunTaskCommand({
        taskDefinition:
          "arn:aws:ecs:eu-north-1:340752827955:task-definition/transcoder-task:1",
        cluster:
          "arn:aws:ecs:eu-north-1:340752827955:cluster/transcoder-cluster",
        launchType: "FARGATE",
        networkConfiguration: {
          awsvpcConfiguration: {
            assignPublicIp: "ENABLED",
            securityGroups: ["sg-0bc788ebb322a9782"],
            subnets: [
              "subnet-03d54a50eac9e8617",
              "subnet-0bd0ac89a35f895b7",
              "subnet-069cf47900fb0383a",
            ],
          },
        },
        overrides: {
          containerOverrides: [
            {
              name: "transcoder-img",
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
              ],
            },
          ],
        },
      });
      await ecsclient.send(runecscommand);
      console.log("task running");
    } catch (err: any) {
      throw new Error(err);
    }
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

worker.on("failed", (job, err) => {
  console.log("inside failed");
  console.log(job?.id);
  console.log(err.message);
  console.log(job?.data);
});
