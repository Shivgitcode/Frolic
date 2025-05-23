import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import VideoCard from "./VideoCard";

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

export default function VideoGrid() {
	const {
		data: videos,
		isLoading,
		error,
	} = useQuery<Video[]>({
		queryKey: ["videos"],
		queryFn: async () => {
			const response = await api.get("/videos");
			return response.data;
		},
	});

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="aspect-video bg-secondary animate-pulse rounded-lg"
					/>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">Failed to load videos</p>
			</div>
		);
	}

	if (!videos?.length) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No videos found</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{videos.map((video) => (
				<VideoCard key={video.id} video={video} />
			))}
		</div>
	);
}
