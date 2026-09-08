import { useState } from "react";
import { AuthContext } from "../contexts/index";
import type { Auth } from "../utils/types";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<Auth | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
