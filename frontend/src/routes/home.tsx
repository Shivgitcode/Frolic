import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import VideoGrid from "@/components/Video/VideoGrid";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import CategoryPill from "@/components/ui/CategoryPill";
export const Route = createFileRoute("/home")({
	component: Index,
});

const categories = [
	"All",
	"Music",
	"Gaming",
	"Programming",
	"Design",
	"Photography",
	"Science",
	"Education",
	"Finance",
	"Cooking",
	"Sports",
	"Travel",
];

export default function Index() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState("All");
	const [showScrollShadow, setShowScrollShadow] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (e.currentTarget.scrollLeft > 10) {
			setShowScrollShadow(true);
		} else {
			setShowScrollShadow(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (sidebarOpen && !target.closest("aside") && window.innerWidth < 1024) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [sidebarOpen]);

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar toggleSidebar={toggleSidebar} />

			<div className="flex flex-1">
				<Sidebar isOpen={sidebarOpen} />

				<main className="flex-1 lg:ml-64 px-4 md:px-8 pt-8 pb-16 transition-all duration-300">
					<div className="relative mb-6">
						<div
							className="flex gap-3 overflow-x-auto pb-4 scrollbar-none"
							onScroll={handleScroll}
						>
							{categories.map((category) => (
								<CategoryPill
									key={category}
									label={category}
									active={activeCategory === category}
									onClick={() => setActiveCategory(category)}
								/>
							))}
						</div>

						{/* Gradient shadow for scroll indication */}
						<div
							className={`absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity duration-300 ${showScrollShadow ? "opacity-100" : "opacity-0"}`}
						/>
					</div>

					<VideoGrid />
				</main>
			</div>
		</div>
	);
}
