import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		component: () => (
			<div className=" font-Inter">
				<Link to="/login">login</Link>
				<Link to="/signup">signup</Link>
				<Outlet />
			</div>
		),
	},
);
