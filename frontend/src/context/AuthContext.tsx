import type { ReactNode } from "@tanstack/react-router";
// import { createAuthClient } from "better-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
export interface UserProps {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}
export interface AuthContextProps {
	user: UserProps | null;
	setUser: (user: UserProps) => void;
	isAuthenticated: boolean;
	isPending: boolean;
	error: Error | null;
	refetch: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthContextProvider({
	children,
}: { children: ReactNode }) {
	const [user, setUser] = useState<UserProps | null>(null);
	const { data: session, isPending, error, refetch } = useSession();

	useEffect(() => {
		if (!session) return setUser(null);
		setUser(session.user as UserProps);
	}, [session]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isPending,
				isAuthenticated: !!user,
				setUser,
				error,
				refetch,
			}}
		>
			{isPending ? (
				<div className="h-100dvh flex justify-content align-content">
					Loading....
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthContextProvider");
	}
	return context;
};
