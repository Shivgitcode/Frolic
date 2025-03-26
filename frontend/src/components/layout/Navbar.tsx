import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Home, LogIn, Menu, Search, User, Video, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
	const [searchFocused, setSearchFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false); // This would normally come from auth context
	const location = useLocation();
	const isHomePage = location.pathname === "/home";

	return (
		<header className="sticky top-0 z-50 w-full glass-effect py-3">
			<div className="container mx-auto px-4 flex items-center justify-between">
				<div className="flex items-center gap-4">
					{isHomePage && (
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							onClick={toggleSidebar}
						>
							<Menu className="h-5 w-5" />
						</Button>
					)}

					<Link to="/" className="flex items-center gap-2">
						<Video className="h-6 w-6 text-primary" />
						<span className="text-xl font-semibold tracking-tight">
							StreamScape
						</span>
					</Link>
				</div>

				{isHomePage && (
					<div
						className={cn(
							"fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center lg:static lg:inset-auto lg:bg-transparent lg:backdrop-blur-none lg:z-auto lg:flex-1 lg:max-w-xl lg:mx-8 transition-all duration-300",
							!searchFocused && "hidden lg:flex",
						)}
					>
						<div
							className={cn(
								"relative w-full max-w-md lg:max-w-full animate-fade-in",
								!searchFocused && "lg:animate-none",
							)}
						>
							{searchFocused && (
								<Button
									variant="ghost"
									size="icon"
									className="absolute left-2 top-1/2 -translate-y-1/2 lg:hidden"
									onClick={() => setSearchFocused(false)}
								>
									<X className="h-5 w-5" />
								</Button>
							)}

							<div className="relative w-full">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<input
									type="text"
									placeholder="Search videos..."
									className="w-full py-2 pl-10 pr-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
									onFocus={() => setSearchFocused(true)}
									onBlur={() => setSearchFocused(false)}
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>
					</div>
				)}

				<div className="flex items-center gap-2">
					{isHomePage && (
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							onClick={() => setSearchFocused(true)}
						>
							<Search className="h-5 w-5" />
						</Button>
					)}

					{isHomePage ? (
						<>
							{isAuthenticated ? (
								<>
									<Button variant="ghost" size="icon">
										<Bell className="h-5 w-5" />
									</Button>

									<Button variant="ghost" size="icon" className="rounded-full">
										<User className="h-5 w-5" />
									</Button>
								</>
							) : (
								<div className="flex items-center gap-2">
									<Link to="/login">
										<Button
											variant="ghost"
											size="sm"
											className="hidden md:flex items-center gap-1"
										>
											<LogIn className="h-4 w-4" />
											<span>Login</span>
										</Button>
									</Link>
									<Link to="/signup">
										<Button size="sm" className="hidden md:inline-flex">
											Sign up
										</Button>
									</Link>
									<Link to="/login" className="md:hidden">
										<Button variant="ghost" size="icon">
											<LogIn className="h-5 w-5" />
										</Button>
									</Link>
								</div>
							)}
						</>
					) : (
						<div className="flex items-center gap-2">
							<Link to="/home">
								<Button
									variant="ghost"
									size="sm"
									className="hidden md:flex items-center gap-1"
								>
									<Home className="h-4 w-4" />
									<span>Explore Videos</span>
								</Button>
							</Link>
							<Link to="/login">
								<Button
									variant="ghost"
									size="sm"
									className="hidden md:flex items-center gap-1"
								>
									<LogIn className="h-4 w-4" />
									<span>Login</span>
								</Button>
							</Link>
							<Link to="/signup">
								<Button size="sm" className="hidden md:inline-flex">
									Sign up
								</Button>
							</Link>
							<Link to="/home" className="md:hidden">
								<Button variant="ghost" size="icon">
									<Home className="h-5 w-5" />
								</Button>
							</Link>
							<Link to="/login" className="md:hidden">
								<Button variant="ghost" size="icon">
									<LogIn className="h-5 w-5" />
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
