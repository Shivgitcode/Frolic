import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageSquare, Share, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

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

export const Route = createFileRoute("/video/$videoId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { videoId } = Route.useParams();
	const navigate = Route.useNavigate();
	const videoRef = useRef<HTMLVideoElement>(null);

	const {
		data: video,
		isLoading,
		error,
	} = useQuery<Video>({
		queryKey: ["video", videoId],
		queryFn: async () => {
			const response = await api.get(`/videos/${videoId}`);
			return response.data;
		},
	});

	useEffect(() => {
		if (video?.streamingUrls?.["720p"] && videoRef.current) {
			const videoUrl = video.streamingUrls["720p"];
			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(videoUrl);
				hls.attachMedia(videoRef.current);
			} else if (
				videoRef.current.canPlayType("application/vnd.apple.mpegurl")
			) {
				videoRef.current.src = videoUrl;
			}
		}
	}, [video?.streamingUrls]);

	if (isLoading) {
		return (
			<div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
				<div className="aspect-video bg-secondary animate-pulse rounded-lg" />
			</div>
		);
	}

	if (error || !video) {
		return (
			<div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
				<div className="text-center py-8">
					<p className="text-muted-foreground">Failed to load video</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
			<Button
				variant="ghost"
				size="sm"
				className="mb-4 flex items-center gap-1"
				onClick={() => navigate({ to: "/home" })}
			>
				<ArrowLeft className="h-4 w-4" />
				<span>Back</span>
			</Button>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Video player column */}
				<div className="lg:col-span-2">
					{/* Video player */}
					<div className="relative aspect-video bg-secondary rounded-lg overflow-hidden mb-4">
						{video.status === "READY" ? (
							<video
								ref={videoRef}
								controls
								className="w-full h-full"
								poster={video.streamingUrls?.["720p"]?.replace(".m3u8", ".jpg")}
							>
								<track kind="captions" src="" label="English" />
							</video>
						) : (
							<div className="absolute inset-0 flex items-center justify-center">
								<p className="text-lg text-muted-foreground">
									{video.status === "PROCESSING"
										? "Video is being processed..."
										: "Video is not available"}
								</p>
							</div>
						)}
					</div>

					{/* Video info */}
					<h1 className="text-2xl font-bold mb-2">{video.title}</h1>
					<div className="flex items-center justify-between mb-4">
						<span className="text-muted-foreground">
							{new Date(video.createdAt).toLocaleDateString()}
						</span>

						<div className="flex space-x-2">
							<Button
								variant="ghost"
								size="sm"
								className="flex items-center gap-1"
							>
								<ThumbsUp className="h-5 w-5" />
								<span>Like</span>
							</Button>

							<Button
								variant="ghost"
								size="sm"
								className="flex items-center gap-1"
							>
								<MessageSquare className="h-5 w-5" />
								<span>Comment</span>
							</Button>

							<Button variant="ghost" size="sm">
								<Share className="h-5 w-5" />
							</Button>
						</div>
					</div>

					<Separator className="my-4" />

					{/* Video description */}
					<div className="bg-secondary/50 p-4 rounded-lg">
						<p className="text-foreground">
							{video.description || "No description available"}
						</p>
					</div>

					{/* Comments section */}
					<div className="mt-8">
						<h3 className="text-lg font-semibold mb-4">Comments</h3>
						<div className="text-center py-4">
							<p className="text-muted-foreground">Comments coming soon</p>
						</div>
					</div>
				</div>

				{/* Related videos column */}
				<div>
					<h3 className="text-lg font-semibold mb-4">Related Videos</h3>
					<div className="text-center py-4">
						<p className="text-muted-foreground">Related videos coming soon</p>
					</div>
				</div>
			</div>
		</div>
	);
}
