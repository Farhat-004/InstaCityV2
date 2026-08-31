import { useRef } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { useFormStatus } from "react-dom";
import { Link, useNavigate } from "react-router";

export function LoginPage() {
    const loginRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    //handlers
    const handleSubmit = async () => {
        const form = loginRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const userData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                },
            );
            const data = await response.json();
            if (response.ok) {
                navigate("/");
            }
        } catch (error) {
            console.error(error?.message || "An error occurred during login.");
        } finally {
            form.reset();
        }
    };
    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Your people and your inspiration are right where you left them."
        >
            <form
                className="mt-8 space-y-5"
                action={handleSubmit}
                ref={loginRef}
            >
                <label className="block text-sm font-bold">
                    Email address
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="hello@example.com"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-500">
                        <input type="checkbox" className="accent-fuchsia-600" />{" "}
                        Remember me
                    </label>
                    <button
                        type="button"
                        className="font-bold text-fuchsia-600"
                    >
                        Forgot password?
                    </button>
                </div>
                <SubmitButton />
                <div className="flex items-center gap-3 py-1 text-xs text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
                    OR
                </div>
                <button
                    type="button"
                    disabled={true}
                    className="w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold"
                >
                    Continue with Google
                </button>
                <p className="pt-2 text-center text-sm text-slate-500">
                    New to Mosaic?{" "}
                    <Link to="/register" className="font-bold text-fuchsia-600">
                        Create an account
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200"
        >
            {pending ? "Signing in..." : "Sign in"}
        </button>
    );
};
