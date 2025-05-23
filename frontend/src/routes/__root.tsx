import type { QueryClient } from "@tanstack/react-query";
import {
	Outlet,
	createRootRouteWithContext,
	redirect,
} from "@tanstack/react-router";
import "../App.css";
import type { AuthContextProps } from "@/context/AuthContext";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	auth: AuthContextProps;
}>()({
	beforeLoad: ({ context, location }) => {
		console.log(context.auth);
		// const publicRoutes = [
		// 	"/",
		// 	"/signin",
		// 	"/signup",
		// 	"explore",
		// 	"/cart",
		// 	"wishlist",
		// ];
		// if (!publicRoutes.includes(location.pathname)) {
		// 	if (!context.auth.isAuthenticated) {
		// 		throw redirect({
		// 			to: "/login",
		// 			search: {
		// 				redirect: location.pathname,
		// 			},
		// 		});
		// 	}
		// }
	},
	component: () => (
		<div className=" font-inter min-w-full h-full">
			<Outlet />
		</div>
	),
});
