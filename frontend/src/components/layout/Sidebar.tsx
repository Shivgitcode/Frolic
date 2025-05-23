import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
	Clock,
	Film,
	Flame,
	Gamepad2,
	History,
	Home,
	Lightbulb,
	Music,
	Newspaper,
	PlaySquare,
	ThumbsUp,
	Trophy,
	Upload,
	User,
} from "lucide-react";

interface SidebarProps {
	isOpen: boolean;
	className?: string;
}

const Sidebar = ({ isOpen, className }: SidebarProps) => {
	const location = useLocation();

	// Helper to check if a path is active
	const isActive = (path: string) => {
		return (
			location.pathname === path || location.pathname.startsWith(`${path}/`)
		);
	};
	const mainNavItems = [
		{ icon: Home, label: "Home", path: "/home" },
		{ icon: Flame, label: "Trending", path: "/trending" },
		{ icon: PlaySquare, label: "Subscriptions", path: "/subscriptions" },
		{ icon: Upload, label: "Upload Video", path: "/videoupload" },
		{ icon: User, label: "My Profile", path: "/profile" },
	];

	const libraryItems = [
		{ icon: History, label: "History", path: "/history" },
		{ icon: Clock, label: "Watch Later", path: "/watch-later" },
		{ icon: ThumbsUp, label: "Liked Videos", path: "/liked" },
	];

	const exploreItems = [
		{ icon: Music, label: "Music", path: "/explore/music" },
		{ icon: Film, label: "Movies", path: "/explore/movies" },
		{ icon: Gamepad2, label: "Gaming", path: "/explore/gaming" },
		{ icon: Newspaper, label: "News", path: "/explore/news" },
		{ icon: Trophy, label: "Sports", path: "/explore/sports" },
		{ icon: Lightbulb, label: "Learning", path: "/explore/learning" },
	];

	return (
		<aside
			className={cn(
				"fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg border-r lg:top-16 transition-transform duration-300 ease-in-out",
				isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
				className,
			)}
		>
			<div className="h-full py-4 px-3 overflow-y-auto">
				<nav className="space-y-6">
					<div className="space-y-1">
						{mainNavItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
									isActive(item.path)
										? "bg-primary/10 text-primary"
										: "text-foreground hover:bg-accent hover:text-accent-foreground",
								)}
							>
								<item.icon
									className={cn(
										"h-5 w-5",
										isActive(item.path) ? "text-primary" : "",
									)}
								/>
								<span>{item.label}</span>
							</Link>
						))}
					</div>

					<div className="pt-4 border-t">
						<h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
							Library
						</h3>
						<div className="space-y-1">
							{libraryItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={cn(
										"flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
										isActive(item.path)
											? "bg-primary/10 text-primary"
											: "text-foreground hover:bg-accent hover:text-accent-foreground",
									)}
								>
									<item.icon
										className={cn(
											"h-5 w-5",
											isActive(item.path) ? "text-primary" : "",
										)}
									/>
									<span>{item.label}</span>
								</Link>
							))}
						</div>
					</div>

					<div className="pt-4 border-t">
						<h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
							Explore
						</h3>
						<div className="space-y-1">
							{exploreItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={cn(
										"flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
										isActive(item.path)
											? "bg-primary/10 text-primary"
											: "text-foreground hover:bg-accent hover:text-accent-foreground",
									)}
								>
									<item.icon
										className={cn(
											"h-5 w-5",
											isActive(item.path) ? "text-primary" : "",
										)}
									/>
									<span>{item.label}</span>
								</Link>
							))}
						</div>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
