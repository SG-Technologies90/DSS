"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [view, setView] = useState("login"); // 'login' or 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  // State for form inputs and API handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  // 2. Updated handleLogin function to use NextAuth
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(""); // Clear any previous errors

    try {
      // Use NextAuth's signIn function
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Set to false so we can handle errors manually on this page
      });

      if (res?.error) {
        // Show the error message thrown by our authorize function in NextAuth
        setErrorMsg(res.error);
      } else if (res?.ok) {
        // Success! Push to dashboard and refresh the router to update the session state
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-[calc(110vh-80px)] bg-slate-50 font-sans">
      
      {/* Left Side: Branding Banner */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center p-8 lg:p-16">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-12 -left-12 w-72 h-72 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg flex flex-col gap-6">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck size={32} />
            <span className="text-2xl font-bold tracking-wider">AdminPanel</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Manage your content <br /> securely & efficiently.
          </h1>
          <p className="text-indigo-100 text-lg">
            Log in to access your dashboard, write new blog posts, and manage your website settings from one centralized location.
          </p>
          <div className="text-indigo-200 text-sm mt-8">
            &copy; {new Date().getFullYear()} AdminPanel. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl lg:shadow-none lg:bg-transparent lg:p-0 border border-slate-100 lg:border-none relative overflow-hidden">
          
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 text-indigo-600 mb-8 lg:hidden">
            <ShieldCheck size={32} />
            <span className="text-2xl font-bold tracking-wider text-slate-800">AdminPanel</span>
          </div>

          {/* ----- LOGIN VIEW ----- */}
          <div className={`transition-all duration-500 ease-in-out transform ${view === 'login' ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'}`}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
              <p className="text-slate-500">Please enter your details to sign in.</p>
            </div>

            {/* Display Error Message if it exists */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                {errorMsg}
              </div>
            )}

            {/* Attach onSubmit handler */}
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={email} // Bind value to state
                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-black border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} // Bind value to state
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setView('forgot')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Update Button to handle Loading State */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg shadow-md transition-colors"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>

          {/* ----- FORGOT PASSWORD VIEW ----- */}
          <div className={`transition-all duration-500 ease-in-out transform ${view === 'forgot' ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'}`}>
            <button 
              onClick={() => setView('login')}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to login
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h2>
              <p className="text-slate-500">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}