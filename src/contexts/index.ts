import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Auth } from "../utils/types";

type AuthContextValue = {
	auth: Auth | null;
	setAuth: Dispatch<SetStateAction<Auth | null>>;
};

export const AuthContext = createContext<AuthContextValue>({
	auth: null,
	setAuth: () => undefined,
});