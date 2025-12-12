"use client";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B0F1C] via-[#11142A] to-[#080A14] text-white relative overflow-hidden">

      {/* GLOW ORBS */}
      <div className="absolute top-[-150px] left-[-100px] w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[140px]"></div>
      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[160px]"></div>

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6 relative z-30">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            EstateShield.AI
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-gray-300 text-lg">
          <a href="/analyze" className="hover:text-white transition">Analyze</a>
          <a href="/login" className="hover:text-white transition">Login</a>

          <a
            href="/signup"
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:opacity-90 transition font-medium"
          >
            Sign Up
          </a>
        </nav>

        {/* MOBILE BURGER BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </header>

      {/* MOBILE NAV MENU */}
      {open && (
        <div className="md:hidden bg-[#11142A] border-t border-purple-500/20 px-6 py-4 space-y-4 text-lg text-gray-300 animate-slideDown">
          <a href="/analyze" className="block hover:text-white">Analyze</a>
          <a href="/login" className="block hover:text-white">Login</a>

          <a
            href="/signup"
            className="block text-center px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:opacity-90 transition font-medium"
          >
            Sign Up
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-28 text-center max-w-5xl mx-auto px-4 md:px-6 relative z-20">

        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 md:mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300">
            AI That Understands Real Estate
          </span>
          <br className="hidden md:block" />
          <span className="md:mt-4 md:block">And Protects Your Decisions</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
          EstateShield.AI scans any property link and reveals  
          <span className="text-purple-300 font-medium"> price fairness, hidden risks, locality intelligence,</span>
          and a complete <span className="text-blue-300 font-semibold">EstateShield Score™</span>.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <a
            href="/analyze"
            className="px-8 md:px-10 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-blue-500/40 hover:opacity-90 transition text-center"
          >
            Analyze Property
          </a>

          <a
            href="/signup"
            className="px-8 md:px-10 py-4 rounded-xl text-lg font-semibold border border-purple-400 text-purple-300 hover:bg-purple-500/10 transition text-center"
          >
            Create Account
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-20">

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 md:mb-16 bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
          What Your AI Reveals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          <div className="p-6 md:p-8 bg-[#13172B] border border-purple-500/20 rounded-2xl shadow-md hover:shadow-purple-700/20 transition hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-semibold text-purple-300 mb-3">📊 Price Fairness</h3>
            <p className="text-gray-300">
              AI compares your property with hundreds of listings to detect  
              <span className="text-purple-200"> overpricing or fair value.</span>
            </p>
          </div>

          <div className="p-6 md:p-8 bg-[#13172B] border border-blue-500/20 rounded-2xl shadow-md hover:shadow-blue-700/20 transition hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-3">🛡 EstateShield Score™</h3>
            <p className="text-gray-300">
              A powerful AI-driven score combining <span className="text-blue-200">safety, growth, builder trust, crime index,</span> and more.
            </p>
          </div>

          <div className="p-6 md:p-8 bg-[#13172B] border border-purple-500/20 rounded-2xl shadow-md hover:shadow-purple-700/20 transition hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-semibold text-purple-300 mb-3">🌍 Locality Intelligence</h3>
            <p className="text-gray-300">
              Get insights on flood zones, crime, schools, commute, hospitals, metro expansion & future potential.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-purple-700/20 relative z-20">
        © {new Date().getFullYear()} EstateShield.AI — Smarter Real Estate, Powered by AI.
      </footer>

    </main>
  );
}
