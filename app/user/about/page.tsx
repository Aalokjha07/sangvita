"use client";

import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#ffffff15_0%,transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium tracking-widest">ESTABLISHED 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
            Science. <span className="text-blue-300">Trust.</span> Wellness.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Sangvita Nutri Pharma — Committed to delivering premium quality nutraceuticals 
            that empower healthier lives.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        
        {/* --- VISION & MISSION --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all p-10 rounded-3xl">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">🌟</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "To become a trusted and innovative nutraceutical company dedicated to improving global wellness 
              through advanced nutritional science and a strong commitment to society."
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10 rounded-3xl shadow-xl">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="leading-relaxed text-lg opacity-95">
              To develop premium quality wellness products that combine science, innovation, and trust. 
              We aim to contribute toward healthier communities and a better future for society.
            </p>
          </div>
        </div>

        {/* --- SCIENCE DRIVEN SECTION --- */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="uppercase tracking-[0.2em] text-blue-600 font-semibold mb-3">The Sangvita Standard</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
              Science-Driven Wellness <br className="hidden md:block" />
              for Modern Life
            </h2>
            
            <div className="space-y-6 text-slate-600 text-[17px] leading-relaxed">
              <p>
                We believe good health is the foundation of a better life. Through our dedication 
                to quality solutions, we aspire to support people on their journey toward wellness 
                and strength.
              </p>
              <p>
                Our products are prepared under lab-examined chemical standards to ensure high 
                effectiveness, precise formulation, and excellent packaging.
              </p>
            </div>

            <div className="mt-10">
              <h4 className="font-semibold text-slate-900 mb-4">Our Focus Areas</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {["Metabolic Wellness", "Diabetic Care", "Immunity Boosters", "Women's Health"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <span className="font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Image */}
         
            
        </section>

        {/* --- FUTURE PROJECTS --- */}
        <section className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-blue-400 font-semibold tracking-widest">LOOKING AHEAD</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">Future Projects &amp; Expansion</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h4 className="text-blue-400 font-bold text-xl mb-4">Manufacturing Hub</h4>
                <p className="text-slate-300 leading-relaxed">
                  Establishing an advanced manufacturing unit in Bihar equipped with modern technology 
                  and high quality-control systems.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h4 className="text-blue-400 font-bold text-xl mb-4">National Network</h4>
                <p className="text-slate-300 leading-relaxed">
                  Strengthening our distribution network across India to create affordable 
                  wellness solutions for wider communities.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h4 className="text-blue-400 font-bold text-xl mb-4">Community Impact</h4>
                <p className="text-slate-300 leading-relaxed">
                  Committed to building a healthcare ecosystem that supports local development 
                  and promoting Bihar as an emerging center for pharma.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default AboutPage;