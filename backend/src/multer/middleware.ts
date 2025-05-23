import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { config } from "dotenv";
config();

const s3client = new S3Client({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});

export async function putVideo(key: string, bucket: string, body: Buffer) {
	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: key,
		Body: body,
	});
	const response = await s3client.send(command);
	return response;
}

export async function getVideo(key: string, bucket: string) {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key,
	});
	const result = await s3client.send(command);
	return result;
}
