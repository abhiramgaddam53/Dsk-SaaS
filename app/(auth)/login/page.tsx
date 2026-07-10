"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signInWithGoogle } from "@/app/lib/firebase/authUtils";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { role } = await loginUser(email, password);
      redirectBasedOnRole(role);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { role } = await signInWithGoogle();
      redirectBasedOnRole(role);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const redirectBasedOnRole = (role: string) => {
    if (role === 'Super-admin') router.push('/sa/gen/overview');
    else if (role === 'valuator') router.push('/sa/gen/overview');
    else if (role === 'drafter') router.push('/d/dashboard');
    else router.push('/s/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-zinc-900">Sign In</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <form onSubmit={handleEmailLogin} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              placeholder="Email address"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-zinc-500">Or continue with</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Google
        </button>

        <p className="mt-2 text-center text-sm text-zinc-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-black hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}