import { cn } from "@/lib/utils";

interface VideoCardProps {
	title: string;
	channel: string;
	thumbnailUrl: string;
	views: string;
	timestamp: string;
	channelImageUrl: string;
	duration: string;
	className?: string;
}

const VideoCard = ({
	title,
	channel,
	thumbnailUrl,
	views,
	timestamp,
	channelImageUrl,
	duration,
	className,
}: VideoCardProps) => {
	return (
		<div className={cn("space-y-2 hover-scale group", className)}>
			<div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
				<img
					src={thumbnailUrl}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					loading="lazy"
				/>
				<div className="absolute bottom-2 right-2 py-0.5 px-1.5 bg-black/80 text-white text-xs font-medium rounded">
					{duration}
				</div>
			</div>

			<div className="flex gap-3">
				<div className="flex-shrink-0">
					<div className="w-9 h-9 rounded-full overflow-hidden">
						<img
							src={channelImageUrl}
							alt={channel}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>
				</div>

				<div>
					<h3 className="font-medium line-clamp-2 text-foreground">{title}</h3>
					<p className="text-sm text-muted-foreground">{channel}</p>
					<p className="text-sm text-muted-foreground">
						{views} • {timestamp}
					</p>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
