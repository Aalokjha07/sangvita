import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-slate-400 py-16 px-6 relative overflow-hidden">
      {/* Background Red Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Flex Container pushes items to opposite sides */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Column 1: Company (Left Aligned) */}
          <div className="max-w-sm">
            <h4 className="text-white font-mono text-sm mb-6 opacity-50 tracking-widest">// COMPANY</h4>
            <ul className="space-y-4 text-sm">
              <li className="font-bold text-2xl text-white tracking-tight">SANGVITA</li>
              <li className="leading-relaxed hover:text-white transition-colors">
                Purani Gudawri, Uthwari Pokhra,<br/>
                Bettiah, West Champaran,<br/>
                Bihar, India
              </li>
            </ul>
          </div>

          {/* Column 2: Helpline (Right Aligned on Desktop) */}
          <div className="md:text-right">
            <h4 className="text-white font-mono text-sm mb-6 opacity-50 tracking-widest md:justify-end flex items-center gap-2">
              // HELPLINE
            </h4>
            <ul className="space-y-6 text-sm">
              <li>
                <span className="block text-xs uppercase opacity-50 mb-1 tracking-wider">Primary Support</span>
                <a href="tel:9204665654" className="text-xl font-bold text-white hover:text-blue-400 transition-all">
                  9204665654
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase opacity-50 mb-1 tracking-wider">Secondary Line</span>
                <a href="tel:9204665654" className="text-xl font-bold text-white hover:text-blue-400 transition-all">
                  9204665654
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/5 mb-8"></div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
            © 2026 SANGVITA NUTRI PHARMA • SCIENCE OF BETTER LIVING
          </p>

          {/* JuniorDev & Mail Together (Right Side) */}
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-5 py-2 rounded-full hover:bg-white/[0.07] transition-all group">
            <p className="text-xs font-medium text-white/70">
              Made with <span className="text-white font-bold">❤️</span> by <span className="text-white font-bold">JuniorDev</span>
            </p>
            <div className="w-px h-3 bg-white/20"></div>
            <a 
              href="mailto:aalokjha2018@gmail.com" 
              className="flex items-center gap-2 text-xs text-white/50 group-hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;