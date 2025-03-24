import { cn } from "@/lib/utils";
import {
	Home,
	Clock,
	ThumbsUp,
	History,
	PlaySquare,
	Flame,
	Music,
	Gamepad2,
	Film,
	Newspaper,
	Trophy,
	Lightbulb,
} from "lucide-react";

interface SidebarProps {
	isOpen: boolean;
	className?: string;
}

const Sidebar = ({ isOpen, className }: SidebarProps) => {
	const mainNavItems = [
		{ icon: Home, label: "Home", active: true },
		{ icon: Flame, label: "Trending" },
		{ icon: PlaySquare, label: "Subscriptions" },
	];

	const libraryItems = [
		{ icon: History, label: "History" },
		{ icon: Clock, label: "Watch Later" },
		{ icon: ThumbsUp, label: "Liked Videos" },
	];

	const exploreItems = [
		{ icon: Music, label: "Music" },
		{ icon: Film, label: "Movies" },
		{ icon: Gamepad2, label: "Gaming" },
		{ icon: Newspaper, label: "News" },
		{ icon: Trophy, label: "Sports" },
		{ icon: Lightbulb, label: "Learning" },
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
						{mainNavItems.map((item, index) => (
							<a
								key={index}
								href="#"
								className={cn("nav-item", item.active && "active")}
							>
								<item.icon className="sidebar-icon" />
								<span>{item.label}</span>
							</a>
						))}
					</div>

					<div className="pt-4 border-t">
						<h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
							Library
						</h3>
						<div className="space-y-1">
							{libraryItems.map((item, index) => (
								<a key={index} href="#" className="nav-item">
									<item.icon className="sidebar-icon" />
									<span>{item.label}</span>
								</a>
							))}
						</div>
					</div>

					<div className="pt-4 border-t">
						<h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
							Explore
						</h3>
						<div className="space-y-1">
							{exploreItems.map((item, index) => (
								<a key={index} href="#" className="nav-item">
									<item.icon className="sidebar-icon" />
									<span>{item.label}</span>
								</a>
							))}
						</div>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
