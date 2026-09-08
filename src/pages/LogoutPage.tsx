import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function LogoutPage() {
    const navigate = useNavigate();
    const { setAuth } = useAuth() as {
        setAuth: (auth: null) => void;
    };

    const handleLogout = () => {
        setAuth(null);
        navigate("/");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Logout</h1>
            <p className="mt-2 text-slate-400">
                Are you sure you want to logout?
            </p>
            <button
                onClick={handleLogout}
                className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
                Logout
            </button>
            <button
                onClick={() => navigate(-1)}
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-red-600"
            >
                Go back
            </button>
        </div>
    );
}
