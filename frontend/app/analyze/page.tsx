"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");

const handleAnalyze = async () => {
  if (!url.trim()) {
    alert("Please enter a valid property link");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.href = "/login";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = `/analyze/result?id=${data.propertyId}`;
    } else {
      alert(data.message || "Failed to analyze property.");
    }
  } catch (error) {
    alert("Backend not reachable. Start the server first.");
  }
};


  return (
    <main className="min-h-screen bg-gradient-to-b from-[#090B18] via-[#0F1224] to-[#070812] text-white relative overflow-hidden">

      {/* AI ORBS */}
      <div className="absolute top-[-180px] left-[-120px] w-[480px] h-[480px] bg-purple-700/20 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-230px] right-[-160px] w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[170px]"></div>

      {/* CONTENT */}
      <section className="pt-32 pb-20 max-w-4xl mx-auto px-6 relative z-20">

        {/* HEADING */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text mb-6">
          Analyze Any Property  
          <span className="block text-4xl md:text-5xl mt-2">With AI-Powered Accuracy</span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-300 text-lg text-center max-w-3xl mx-auto leading-relaxed mb-14">
          Paste a real-estate listing link from MagicBricks, 99acres, or NoBroker.  
          EstateShield.AI will evaluate price fairness, locality risks, builder reputation,  
          crime index, flood exposure, future growth insights, and more — all within seconds.
        </p>

        {/* INPUT CARD */}
        <div className="bg-[#101527]/80 p-8 rounded-2xl border border-purple-500/20 shadow-lg backdrop-blur-xl">

          <label className="text-gray-300 mb-2 block font-medium">
            Property Listing URL
          </label>

          <input
            type="text"
            placeholder="Paste MagicBricks, 99acres or NoBroker link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#0C1020] border border-purple-600/40 
                       focus:border-purple-400 focus:outline-none text-white placeholder-gray-500"
          />

          <button
            onClick={handleAnalyze}
            className="w-full mt-6 py-4 rounded-xl text-lg font-semibold
            bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 
            transition shadow-lg shadow-blue-500/30"
          >
            Analyze Property
          </button>
        </div>

        {/* TRUST POINTS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="p-6 bg-[#13192F] rounded-xl border border-purple-500/20 shadow-md hover:shadow-purple-600/10 transition">
            <h3 className="text-xl font-semibold text-purple-300">🔍 Deep AI Scan</h3>
            <p className="text-gray-400 mt-2 text-sm">
              We inspect 40+ property factors including pricing anomalies, builder rating,
              safety score, crime exposure, and locality demand.
            </p>
          </div>

          <div className="p-6 bg-[#13192F] rounded-xl border border-blue-500/20 shadow-md hover:shadow-blue-600/10 transition">
            <h3 className="text-xl font-semibold text-blue-300">📊 Price Insight Engine</h3>
            <p className="text-gray-400 mt-2 text-sm">
              AI compares your listing with historical pricing, area market data, and similar
              properties to detect overpricing or undervaluation.
            </p>
          </div>

          <div className="p-6 bg-[#13192F] rounded-xl border border-purple-500/20 shadow-md hover:shadow-purple-600/10 transition">
            <h3 className="text-xl font-semibold text-purple-300">🛡 Trust & Transparency</h3>
            <p className="text-gray-400 mt-2 text-sm">
              EstateShield.AI never stores your private links without your consent.
              All analysis is secure & encrypted.
            </p>
          </div>

        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

            <div className="bg-[#101527] p-6 rounded-2xl border border-purple-500/20 shadow">
              <h3 className="text-xl font-semibold text-purple-300">1. Paste the URL</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Insert any listing link from MagicBricks, 99acres or NoBroker.
              </p>
            </div>

            <div className="bg-[#101527] p-6 rounded-2xl border border-blue-500/20 shadow">
              <h3 className="text-xl font-semibold text-blue-300">2. AI Inspects It</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Our models extract every hidden detail — pricing, risks, locality, builder trust.
              </p>
            </div>

            <div className="bg-[#101527] p-6 rounded-2xl border border-purple-500/20 shadow">
              <h3 className="text-xl font-semibold text-purple-300">3. Get Shield Score</h3>
              <p className="text-gray-400 mt-2 text-sm">
                You receive a complete EstateShield Score™ + recommendation summary.
              </p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}
