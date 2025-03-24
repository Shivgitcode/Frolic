import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Video, Play } from "lucide-react";

const HeroSection = () => {
	return (
		<div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20 pt-24 pb-32">
			{/* Background Elements */}
			<div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70" />
			<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="text-center lg:text-left animate-fade-in">
						<div className="inline-block mb-4 py-1 px-3 bg-accent/20 rounded-full">
							<div className="flex items-center gap-1.5">
								<Video className="h-4 w-4 text-accent" />
								<span className="text-sm font-medium text-accent-foreground">
									Next-Gen Streaming Platform
								</span>
							</div>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
							Your Content.
							<br />
							Your Audience.
							<br />
							Your Way.
						</h1>

						<p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0">
							StreamScape gives you the tools to create, share, and monetize
							your video content with a global audience. Start streaming today
							and turn your passion into a thriving channel.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<Link to="/signup">
								<Button size="lg" className="w-full sm:w-auto">
									Get Started for Free
								</Button>
							</Link>
							<Button
								variant="outline"
								size="lg"
								className="w-full sm:w-auto group"
							>
								<Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
								See how it works
							</Button>
						</div>
					</div>

					<div className="relative animate-fade-in animation-delay-300">
						<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video glass-card">
							<img
								src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
								alt="Streaming content"
								className="w-full h-full object-cover opacity-90"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
								<div className="text-white">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/70">
											<img
												src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
												alt="Creator"
												className="w-full h-full object-cover"
											/>
										</div>
										<span className="font-medium">Sarah's Tech Stream</span>
									</div>
									<h3 className="text-xl font-semibold">
										Building Your First React Application
									</h3>
									<div className="text-sm text-white/80 mt-1">
										1.2K viewers • Live now
									</div>
								</div>
							</div>
						</div>

						<div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full filter blur-xl" />
						<div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/20 rounded-full filter blur-xl" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
