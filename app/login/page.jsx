"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; 

const supabase = createClient(
  "https://kbvpjhjgxogmezhtskaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnBqaGpneG9nbWV6aHRza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTI4NzcsImV4cCI6MjA1NDU2ODg3N30.WLMitaLDmC_cZY2erKfyzlpBIkNiHIZF0Xm3xQHicuc"
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Login Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      console.error("GitHub login error:", error);
    }
  };

  // Sign-Up Function
  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Account created! Check your email for confirmation.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gradient-to-b from-teal-100 to-teal-50">
      <div className="flex flex-col justify-center items-center p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700">
            PROJECT <span className="text-blue-600">SPHERE</span>
          </h1>
        </div>
        <div className="w-full max-w-md bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* GitHub Login */}
          <div className="mt-4 text-center text-gray-500">Or continue with</div>
          <button
            onClick={handleGithubLogin}
            className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login with GitHub
          </button>

          {/* Sign-Up Section */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={handleSignUp}
              className="text-blue-600 hover:underline"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </p>
        </div>
      </div>

      {/* Illustration on the Right Side */}
      <div className="hidden lg:flex justify-center items-center bg-gray-100">
        <img
          src="/login.png"
          alt="ProjectSphere Illustration"
          className="w-5/5 h-auto object-contain"
        />
      </div>
    </div>
  );
}
