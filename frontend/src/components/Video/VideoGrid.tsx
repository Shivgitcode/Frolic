import VideoCard from "./VideoCard";

const videos = [
	{
		id: 1,
		title: "Creating a Minimal UI Design System from Scratch",
		channel: "Design Essentials",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
		views: "120K views",
		timestamp: "3 days ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
		duration: "18:24",
	},
	{
		id: 2,
		title: "Advanced CSS Animation Techniques for Modern Web Applications",
		channel: "CSS Mastery",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		views: "254K views",
		timestamp: "1 week ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
		duration: "24:16",
	},
	{
		id: 3,
		title: "The Future of JavaScript: What's New in ES2023",
		channel: "JavaScript Guru",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		views: "87K views",
		timestamp: "2 days ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
		duration: "15:42",
	},
	{
		id: 4,
		title: "How to Create a Stunning Photography Portfolio Website",
		channel: "Creative Corner",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2136&q=80",
		views: "43K views",
		timestamp: "5 days ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
		duration: "22:07",
	},
	{
		id: 5,
		title: "Building Responsive Layouts with CSS Grid and Flexbox",
		channel: "Web Wizards",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		views: "156K views",
		timestamp: "2 weeks ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
		duration: "16:39",
	},
	{
		id: 6,
		title: "UX Design Principles That Will Improve Your User Satisfaction",
		channel: "UX Matters",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		views: "78K views",
		timestamp: "4 days ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
		duration: "20:14",
	},
	{
		id: 7,
		title: "Mastering Color Theory for Digital Designers",
		channel: "Design Academy",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2139&q=80",
		views: "92K views",
		timestamp: "1 month ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
		duration: "28:53",
	},
	{
		id: 8,
		title: "The Complete Guide to React Hooks in 2023",
		channel: "React Masters",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		views: "214K views",
		timestamp: "3 weeks ago",
		channelImageUrl:
			"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
		duration: "32:17",
	},
];

const VideoGrid = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
			{videos.map((video) => (
				<VideoCard
					key={video.id}
					title={video.title}
					channel={video.channel}
					thumbnailUrl={video.thumbnailUrl}
					views={video.views}
					timestamp={video.timestamp}
					channelImageUrl={video.channelImageUrl}
					duration={video.duration}
				/>
			))}
		</div>
	);
};

export default VideoGrid;
