import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import AuthContextProvider, { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: { queryClient, auth: undefined },
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultPreloadStaleTime: 0,
});
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<AuthContextProvider>
				<QueryClientProvider client={queryClient}>
					<RouterContextWrapper />
					<Toaster position="top-center" />
				</QueryClientProvider>
			</AuthContextProvider>
		</StrictMode>,
	);
}

function RouterContextWrapper() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}
