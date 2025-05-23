import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000/",
	credentials: "include",
	refreshInterval: 1000 * 60 * 5, // Refresh every 5 minutes
});

export const { useSession } = authClient;
