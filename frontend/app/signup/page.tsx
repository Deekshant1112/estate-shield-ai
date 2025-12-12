"use client";

import { useState, useEffect } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // REDIRECT if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/analyze";
  }, []);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0D1C] via-[#12162B] to-[#070A14] text-white relative overflow-hidden">

      {/* AI ORBS */}
      <div className="absolute top-[-150px] left-[-100px] w-[420px] h-[420px] bg-purple-600/25 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-[-140px] w-[500px] h-[500px] bg-blue-500/20 blur-[170px] rounded-full"></div>

      {/* FORM CONTAINER */}
      <section className="pt-28 relative z-20 flex justify-center px-6">
        <div className="w-full max-w-md bg-[#101527]/80 p-10 rounded-2xl border border-purple-500/20 shadow-xl backdrop-blur-xl">

          {/* HEADING */}
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
            Create Your Account
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Get instant AI-powered property insights, risk assessment, and EstateShield Score™.
          </p>

          {/* NAME */}
          <label className="text-gray-300 text-sm mb-2 block">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full p-4 rounded-xl mb-5 bg-[#0C1020] border border-purple-500/30 
                       focus:border-purple-400 focus:outline-none text-white placeholder-gray-500"
          />

          {/* EMAIL */}
          <label className="text-gray-300 text-sm mb-2 block">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            onChange={handleChange}
            className="w-full p-4 rounded-xl mb-5 bg-[#0C1020] border border-purple-500/30 
                       focus:border-purple-400 focus:outline-none text-white placeholder-gray-500"
          />

          {/* PASSWORD */}
          <label className="text-gray-300 text-sm mb-2 block">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
            className="w-full p-4 rounded-xl mb-6 bg-[#0C1020] border border-purple-500/30 
                       focus:border-purple-400 focus:outline-none text-white placeholder-gray-500"
          />

          {/* SIGNUP BUTTON */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-4 rounded-xl text-lg font-semibold
            bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition shadow-lg shadow-blue-500/30 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-purple-300 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
