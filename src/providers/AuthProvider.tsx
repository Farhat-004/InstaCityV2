import { useState } from "react";
import { AuthContext } from "../contexts/index";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
