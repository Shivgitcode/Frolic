import type { ReactNode } from "@tanstack/react-router";
import { createContext } from "react";

interface UserProps {
	id: string;
	username: string;
	email: string;
}
interface AuthContextProps {
	user: UserProps;
	setUser: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthContextProvider({
	children,
}: { children: ReactNode }) {}
