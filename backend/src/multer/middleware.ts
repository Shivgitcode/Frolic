import { HonoS3Storage } from "@hono-storage/s3";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
config();
const s3client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export const storage = new HonoS3Storage({
  key: (_, file) => `${file.originalname}-${uuidv4()}.${file.extension}`,
  bucket: "shivn-video-bucket",
  client: s3client,
});
