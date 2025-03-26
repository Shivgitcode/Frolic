import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import "../App.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		component: () => (
			<div className=" font-inter min-w-full h-full">
				<Outlet />
			</div>
		),
	},
);
