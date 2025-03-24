import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/landing/HeroSection";
import FeatureCard from "@/components/landing/FeatureCard";
import {
	Video,
	Shield,
	Globe,
	Zap,
	Users,
	MonitorPlay,
	ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	return (
		<div className="min-h-screen">
			<HeroSection />

			<section className="py-20 px-4">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Stream Your Way
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Discover why creators and viewers choose StreamScape for the best
							streaming experience
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<FeatureCard
							icon={<MonitorPlay className="h-8 w-8 text-primary" />}
							title="HD Streaming"
							description="Enjoy crystal clear video quality with our advanced streaming technology"
						/>
						<FeatureCard
							icon={<Globe className="h-8 w-8 text-primary" />}
							title="Global Reach"
							description="Connect with viewers from around the world with our global CDN network"
						/>
						<FeatureCard
							icon={<Zap className="h-8 w-8 text-primary" />}
							title="Ultra Low Latency"
							description="Experience real-time interaction with viewers with our low-latency streaming"
						/>
						<FeatureCard
							icon={<Shield className="h-8 w-8 text-primary" />}
							title="Secure Platform"
							description="Your content is protected with enterprise-grade security and encryption"
						/>
						<FeatureCard
							icon={<Users className="h-8 w-8 text-primary" />}
							title="Community Building"
							description="Grow your audience with integrated community and engagement tools"
						/>
						<FeatureCard
							icon={<Video className="h-8 w-8 text-primary" />}
							title="Content Library"
							description="Build your library of content that viewers can watch anytime"
						/>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Ready to Start Streaming?
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto mb-8">
						Join thousands of creators who have already made StreamScape their
						home for content creation.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/signup">
							<Button size="lg" className="w-full sm:w-auto">
								Sign up for free
								<ChevronRight className="h-4 w-4 ml-1" />
							</Button>
						</Link>
						<Link to="/login">
							<Button variant="outline" size="lg" className="w-full sm:w-auto">
								Log in to your account
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-muted/30 py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center mb-8">
						<div className="flex items-center gap-2 mb-6 md:mb-0">
							<Video className="h-6 w-6 text-primary" />
							<span className="text-xl font-semibold tracking-tight">
								StreamScape
							</span>
						</div>
						<div className="flex gap-8">
							<Link
								to="/"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								About
							</Link>
							<Link
								to="/"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Features
							</Link>
							<Link
								to="/"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Help
							</Link>
							<Link
								to="/"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Contact
							</Link>
						</div>
					</div>
					<div className="border-t border-border pt-6 text-center text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()} StreamScape. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
