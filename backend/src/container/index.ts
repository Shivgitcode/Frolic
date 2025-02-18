import fs from "node:fs/promises";
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import ffmpeg from "fluent-ffmpeg";

console.log(process.env.SECRET_ACCESS_KEY);
console.log(process.env.ACCESS_KEY);
const client = new S3Client({
	region: "eu-north-1",
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
	const command = new GetObjectCommand({
		Bucket: process.env.BUCKET,
		Key: process.env.KEY,
	});
	const originalFilePath = `original-video.mp4`;
	const result = await client.send(command);
	console.log(result);
	await fs.writeFile(originalFilePath, result.Body as any);
	const promises = resolutions.map(async ({ height, bitrate, name }) => {
		const output = `output_${height}p.m3u8`;
		return new Promise((resolve) => {
			ffmpeg(originalFilePath)
				.output(output)
				.outputOptions([
					`-vf scale=-2:${height}`, // Scale to the specified height, maintaining aspect ratio
					`-b:v ${bitrate}`, // Set the video bitrate
					"-c:v libx264", // Set the video codec to H.264
					"-preset veryfast", // Set the encoding speed/quality tradeoff
					"-c:a aac", // Set the audio codec to AAC
					"-b:a 128k", // Set the audio bitrate
					"-hls_time 10", // Set the segment duration
					"-hls_list_size 0", // Keep all segments in the playlist
					"-f hls", // Specify the output format
				])
				.on("end", async () => {
					const command = new PutObjectCommand({
						Bucket: "shivn-transcoded-bucket",
						Key: output,
					});
					await client.send(command);
					console.log(`uploaded ${output}`);
				})
				.on("error", (err) => {
					console.error(`Error transcoding to ${height}p: ${err.message}`);
				})
				.run();
		});
	});
	await Promise.all(promises);
}
transcode();
