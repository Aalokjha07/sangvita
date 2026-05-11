"use client";

import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6">
            Our Story. <span className="text-blue-600">Our Science.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Established in 2026, Sangvita Nutri Pharma is a manufacturer and supplier 
            dedicated to the science of better living through premium nutraceuticals.
          </p>
        </section>

        {/* --- CORE PHILOSOPHY CARDS --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed italic">
              "To become a trusted and innovative nutraceutical company dedicated to improving global wellness 
              through advanced nutritional science and a strong commitment to society."
            </p>
          </div>
          <div className="bg-blue-600 p-10 rounded-[40px] text-white">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="leading-relaxed opacity-90">
              To develop premium quality wellness products that combine science, innovation, and trust. 
              We aim to contribute toward healthier communities and a better future for society.
            </p>
          </div>
        </div>

        {/* --- DETAILED OVERVIEW SECTION --- */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The Sangvita Standard</h3>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Science-Driven Wellness for Modern Life
            </h2>
            <div className="space-y-6 text-slate-600">
              <p>
                We believe good health is the foundation of a better life. Through our dedication 
                to quality solutions, we aspire to support people on their journey toward wellness 
                and strength.
              </p>
              <p>
                Our products are prepared under lab-examined chemical standards to ensure high 
                effectiveness, precise formulation, and excellent packaging.
              </p>
              <ul className="grid grid-cols-2 gap-4 mt-8">
                {["Metabolic Wellness", "Diabetic Care", "Immunity Boosters", "Women's Health"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative h-[500px] bg-slate-200 rounded-[60px] overflow-hidden shadow-2xl">
             {/* Placeholder for Lab/Pharma Image */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
             <div className="flex items-center justify-center h-full">
                <span className="text-slate-400 font-mono tracking-widest text-sm uppercase">Advanced Lab Environment</span>
             </div>
          </div>
        </section>

        {/* --- FUTURE PROJECTS (From image_f7985c.jpg) --- */}
        <section className="bg-slate-900 rounded-[50px] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-10">Future Projects & Expansion</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-blue-400 font-bold mb-3">Manufacturing Hub</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Establishing an advanced manufacturing unit in Bihar equipped with modern technology 
                  and high quality-control systems.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-bold mb-3">National Network</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Strengthening our distribution network across India to create affordable 
                  wellness solutions for wider communities.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-bold mb-3">Employment</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
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