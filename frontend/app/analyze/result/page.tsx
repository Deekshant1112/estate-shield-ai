"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const token = localStorage.getItem("token");

    async function fetchReport() {
      const res = await fetch(`http://localhost:5000/api/property/${id}/ai`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    fetchReport();
  }, []);


  

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        ⏳ Generating AI Report...
      </div>
    );
  }

  if (!data?.aiReport) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        ❌ No AI report found.
      </div>
    );
  }

  const report = data.aiReport;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#090B18] via-[#0F1224] to-[#070812] text-white p-10">

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text mb-10 text-center">
        AI Property Analysis Report
      </h1>

      {/* SCORE SECTION */}
      <section className="max-w-4xl mx-auto bg-[#101527]/80 p-8 rounded-2xl border border-purple-500/20 shadow-xl mb-10">
        <h2 className="text-2xl font-bold mb-3">EstateShield Score™</h2>

        <div className="flex items-center gap-6">
          <div
            className="w-32 h-32 rounded-full flex justify-center items-center text-4xl font-bold"
            style={{
              background: `conic-gradient(
                ${
                  report.score > 75
                    ? "#4ade80"
                    : report.score > 50
                    ? "#facc15"
                    : "#f87171"
                } ${report.score * 3.6}deg,
                #1f2937 ${report.score * 3.6}deg
              )`,
            }}
          >
            <span className="bg-gray-900 rounded-full px-4 py-2">{report.score}</span>
          </div>

          <p className="text-gray-300 text-lg">{report.summary}</p>
        </div>
      </section>

      {/* PRICE AND VERDICT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        <div className="p-6 bg-[#11172C]/80 rounded-xl border border-blue-500/20 shadow">
          <h3 className="text-xl font-semibold text-blue-300">Price Range</h3>
          <p className="text-gray-300 text-lg mt-2">{report.priceRange}</p>
        </div>

        <div className="p-6 bg-[#11172C]/80 rounded-xl border border-purple-500/20 shadow">
          <h3 className="text-xl font-semibold text-purple-300">AI Verdict</h3>
          <p className="text-gray-300 text-lg mt-2">{report.verdict}</p>
        </div>
      </section>

      {/* LOCALITY INSIGHTS */}
      <section className="max-w-4xl mx-auto bg-[#101527]/80 p-8 rounded-2xl border border-purple-500/20 shadow-xl mb-10">
        <h2 className="text-2xl font-bold mb-5">Locality Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(report.localityInsights || {}).map(([key, value]) => (
            <div key={key} className="p-5 bg-[#13192F] rounded-xl border border-purple-500/20">
              <h4 className="text-lg font-semibold capitalize text-purple-300">{key}</h4>
              <p className="text-gray-300 mt-1">{value as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BUILDER + YIELD + FORECAST */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        <div className="p-6 bg-[#13192F]/80 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-semibold text-purple-300">Builder Rating</h3>
          <p className="text-gray-300 mt-2">{report.builderRating}</p>
        </div>

        <div className="p-6 bg-[#13192F]/80 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-semibold text-blue-300">Rental Yield</h3>
          <p className="text-gray-300 mt-2">{report.rentalYield}</p>
        </div>

        <div className="p-6 bg-[#13192F]/80 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-semibold text-purple-300">Growth Forecast</h3>
          <p className="text-gray-300 mt-2">{report.appreciationForecast}</p>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="max-w-4xl mx-auto bg-[#101527]/80 p-8 rounded-2xl border border-purple-500/20 shadow-xl mb-10">
        <h2 className="text-2xl font-bold mb-5">Relevant News</h2>

        {(report.news || []).length === 0 && (
          <p className="text-gray-400">No recent news articles found.</p>
        )}

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          {(report.news || []).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
