import { AuthLayout } from "../components/AuthLayout";

export function LoginPage() {
    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Your people and your inspiration are right where you left them."
        >
            <form className="mt-8 space-y-5">
                <label className="block text-sm font-bold">
                    Email address
                    <input
                        type="email"
                        placeholder="hello@example.com"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Password
                    <input
                        type="password"
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
                <button
                    type="button"
                    className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200"
                >
                    Sign in
                </button>
                <div className="flex items-center gap-3 py-1 text-xs text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
                    OR
                </div>
                <button
                    type="button"
                    className="w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold"
                >
                    Continue with Google
                </button>
                <p className="pt-2 text-center text-sm text-slate-500">
                    New to Mosaic?{" "}
                    <button
                        type="button"
                        className="font-bold text-fuchsia-600"
                    >
                        Create an account
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
}
