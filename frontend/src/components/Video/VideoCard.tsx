import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";

interface Video {
	id: string;
	title: string;
	description: string | null;
	category: string;
	visibility: string;
	status: string;
	streamingUrls: { [key: string]: string } | null;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

interface VideoCardProps {
	video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
	const thumbnailUrl = video.streamingUrls?.["720p"]?.replace(".m3u8", ".jpg");

	return (
		<Link to="/video/$videoId" params={{ videoId: video.id }} className="group">
			<div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
				{thumbnailUrl ? (
					<img
						src={thumbnailUrl}
						alt={video.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<p className="text-sm text-muted-foreground">No thumbnail</p>
					</div>
				)}
				{video.status === "PROCESSING" && (
					<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
						<p className="text-sm text-white">Processing...</p>
					</div>
				)}
			</div>
			<div className="mt-2">
				<h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
					{video.title}
				</h3>
				<p className="text-sm text-muted-foreground mt-1">
					{formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
				</p>
			</div>
		</Link>
	);
}
