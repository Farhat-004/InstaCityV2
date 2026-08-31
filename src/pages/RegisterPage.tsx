import { useFormStatus } from "react-dom";
import { AuthLayout } from "../components/AuthLayout";
import { useRef } from "react";

export function RegisterPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = async () => {
        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const userData = {
            fullName: formData.get("fullName") as string,
            email: formData.get("email") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                },
            );
            const data = await response.json();
            console.log("register Data", data);
            return data;
        } catch (error) {
            console.error(
                error?.data?.message ||
                    "An error occurred during registration.",
            );
        }
    };
    return (
        <AuthLayout
            title="Create your space"
            subtitle="A fresh page for all the pieces that make you, you."
        >
            <form
                className="mt-8 space-y-4"
                ref={formRef}
                action={handleSubmit}
            >
                <label className="block text-sm font-bold">
                    Full name
                    <input
                        placeholder="Your name"
                        name="fullName"
                        id="fullName"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Email address
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="hello@example.com"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Username
                    <input
                        placeholder="Choose a username"
                        name="username"
                        id="username"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Create a password"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="flex gap-2 pt-1 text-xs leading-5 text-slate-500">
                    <input
                        type="checkbox"
                        className="mt-1 accent-fuchsia-600"
                    />{" "}
                    I agree to Mosaic's Terms of Use and Privacy Policy.
                </label>
                <SubmitButton />
                <p className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="font-bold text-fuchsia-600"
                    >
                        Sign in
                    </button>
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
            className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200"
        >
            {pending ? "Creating account..." : "Create account"}
        </button>
    );
};
