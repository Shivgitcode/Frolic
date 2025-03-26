import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { Video } from "lucide-react";

export const Route = createFileRoute("/_pathLessLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/10 via-background  to-accent/10 flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="flex flex-col items-center justify-center text-center">
					<Link to="/" className="flex items-center gap-2 mb-8">
						<Video className="h-8 w-8 text-primary" />
						<span className="text-2xl font-semibold tracking-tight">
							StreamScape
						</span>
					</Link>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
