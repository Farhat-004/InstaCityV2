import { Link } from "react-router";
const ForceLogin = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-2xl font-bold text-slate-600">
                Please log in to view the content.
            </p>
            <Link
                to="/login"
                className="ml-4 rounded bg-fuchsia-600 px-4 py-2 text-white"
            >
                Log In
            </Link>
        </div>
    );
};
export default ForceLogin;
