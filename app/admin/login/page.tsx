"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-5xl text-pink-600 mb-2"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Admin Portal
          </h1>
          <p
            className="text-pink-700 text-lg"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Chaya Lea Events
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-yellow-200"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                className="block text-pink-700 text-sm font-medium mb-1 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-pink-200 rounded-xl px-4 py-3 text-pink-900 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                className="block text-pink-700 text-sm font-medium mb-1 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-pink-200 rounded-xl px-4 py-3 text-pink-900 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p
                className="text-red-500 text-sm text-center"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-pink-700 transition-colors duration-200 cursor-pointer disabled:opacity-60 mt-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </form>

        <p className="text-center mt-6">
          <a
            href="/"
            className="text-pink-500 text-sm hover:text-pink-700 transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
