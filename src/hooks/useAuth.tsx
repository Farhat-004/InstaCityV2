import { useContext } from "react";
import { AuthContext } from "../contexts/index";

export default function useAuth() {
    return useContext(AuthContext);
}
