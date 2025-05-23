import fs from "node:fs/promises";
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import ffmpeg from "fluent-ffmpeg";

if (
	!process.env.SECRET_ACCESS_KEY ||
	!process.env.ACCESS_KEY ||
	!process.env.BUCKET ||
	!process.env.KEY ||
	!process.env.USER_ID
) {
	throw new Error("Missing required environment variables");
}

const client = new S3Client({
	region: "us-east-1",
	credentials: {
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
		accessKeyId: process.env.ACCESS_KEY,
	},
});
const resolutions = [
	{ name: "360", height: 360, bitrate: "800k" },
	{ name: "480", height: 480, bitrate: "1200k" },
	{ name: "720", height: 720, bitrate: "2500k" },
	{ name: "1080", height: 1080, bitrate: "5000k" },
];
async function transcode() {
	console.log("inside function");
	console.log(process.env.BUCKET);
	console.log(process.env.KEY);
	console.log(process.env.USER_ID);

	const command = new GetObjectCommand({
		Bucket: process.env.BUCKET,
		Key: process.env.KEY,
	});
	const originalFilePath = "original-video.mp4";
	const result = await client.send(command);
	console.log(result);
	await fs.writeFile(originalFilePath, result.Body as any);

	const transcodedUrls: { [key: string]: string } = {};
	const userId = process.env.USER_ID;
	const baseKey =
		(process.env.KEY as string).split("/").pop()?.split(".")[0] || "video";

	const promises = resolutions.map(async ({ height, bitrate, name }) => {
		const output = `output_${height}p.m3u8`;
		return new Promise((resolve) => {
			ffmpeg(originalFilePath)
				.output(output)
				.outputOptions([
					`-vf scale=-2:${height}`,
					`-b:v ${bitrate}`,
					"-c:v libx264",
					"-preset veryfast",
					"-c:a aac",
					"-b:a 128k",
					"-hls_time 10",
					"-hls_list_size 0",
					"-f hls",
				])
				.on("end", async () => {
					const s3Key = `users/${userId}/videos/${baseKey}/${output}`;
					const command = new PutObjectCommand({
						Bucket: "shivn-transcoded-bucket-v2",
						Key: s3Key,
						Body: await fs.readFile(output),
						ACL: "public-read",
						ContentType: "application/x-mpegURL",
					});
					await client.send(command);

					// Upload all .ts segment files
					const files = await fs.readdir(".");
					const tsFiles = files.filter(
						(file) =>
							file.startsWith(`output_${height}p`) && file.endsWith(".ts"),
					);

					for (const tsFile of tsFiles) {
						const tsKey = `users/${userId}/videos/${baseKey}/${tsFile}`;
						const tsCommand = new PutObjectCommand({
							Bucket: "shivn-transcoded-bucket-v2",
							Key: tsKey,
							Body: await fs.readFile(tsFile),
							ACL: "public-read",
							ContentType: "video/MP2T",
						});
						await client.send(tsCommand);
						console.log(`uploaded ${tsFile}`);
					}

					transcodedUrls[`${height}p`] =
						`https://shivn-transcoded-bucket-v2.s3.us-east-1.amazonaws.com/${s3Key}`;
					console.log(`uploaded ${output}`);
					resolve(null);
				})
				.on("error", (err) => {
					console.error(`Error transcoding to ${height}p: ${err.message}`);
					resolve(null);
				})
				.run();
		});
	});

	await Promise.all(promises);
}
transcode();
