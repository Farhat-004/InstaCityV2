import { AuthLayout } from "../components/AuthLayout";

export function RegisterPage() {
    return (
        <AuthLayout
            title="Create your space"
            subtitle="A fresh page for all the pieces that make you, you."
        >
            <form className="mt-8 space-y-4">
                <label className="block text-sm font-bold">
                    Full name
                    <input
                        placeholder="Your name"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Email address
                    <input
                        type="email"
                        placeholder="hello@example.com"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Username
                    <input
                        placeholder="Choose a username"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400"
                    />
                </label>
                <label className="block text-sm font-bold">
                    Password
                    <input
                        type="password"
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
                <button
                    type="button"
                    className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200"
                >
                    Create account
                </button>
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
