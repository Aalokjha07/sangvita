"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Handle Copy Logic
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close menu when clicking outside or navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const linkStyles = (path: string) => `
    px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
    ${isActive(path) 
      ? "text-white bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
      : "text-white/70 hover:text-white hover:bg-white/10"
    }
  `;

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex flex-col items-center px-2 md:px-4">
      <header className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-1.5 md:px-2 md:py-2 rounded-full shadow-2xl flex items-center gap-1 md:gap-4 max-w-fit transition-all duration-300 relative">
        
        {/* Logo */}
        <Link href="/" className="bg-white rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform flex-shrink-0 overflow-hidden">
          <Image src="/logo.jpeg" alt="Logo" width={50} height={50} className="object-cover" />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5 md:gap-2">
          <Link href="/" className={linkStyles('/')}>Home</Link>
          <Link href="/user/about" className={linkStyles('/user/about')}>About</Link>
          <Link href="/user/products" className={linkStyles('/user/products')}>Products</Link>
        </nav>

        {/* Contact Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full text-sm font-bold transition-all flex items-center justify-center 
            ${isOpen || isActive('/user/contact') 
              ? "bg-blue-600 text-white" 
              : "bg-white text-slate-900 hover:bg-blue-400 hover:text-white"
            }
            w-8 h-8 md:w-auto md:h-auto md:px-6 md:py-2 flex-shrink-0 shadow-lg`}
        >
          <span className="hidden md:inline">Contact Us</span>
          <span className="md:hidden text-lg">📞</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-16 right-0 flex items-center gap-3 animate-in fade-in zoom-in slide-in-from-top-4 duration-300">
            {/* Instagram */}
            <a href="https://www.instagram.com/san_gvita?igsh=aWk0Z2VhZXRodXl4" target="_blank" className="social-pill rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                <img
    src="/insta.avif" 
    alt="Descriptive Text"
    className="relative z-1 w-7 rounded-full h-7 border items-center border-black-20px object-cover transition-transform duration-500 group-hover:scale-110"

  />
            </a>
            
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/sangvita-nutri-pharma-20aa54409?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="social-pill  rounded-full bg-white">
              <img
    src="/linkdin.webp" 
    alt="Descriptive Text"
    className="relative z-1 w-7 rounded-full h-7 border items-center border-black-20px object-cover transition-transform duration-500 group-hover:scale-110"

  />
            </a>

             {/* facebook */}
            <a href="https://www.facebook.com/share/1HWiNv7U8t/" target="_blank" className="social-pill  rounded-full bg-white">
              <img
    src="/facebook.png" 
    alt="Descriptive Text"
    className="relative z-1 w-7 rounded-full h-7 border items-center border-black-20px object-cover transition-transform duration-500 group-hover:scale-110"

  />
            </a>



            {/* Email */}
            <a href="mailto:Sangvita22@gmail.com" className="social-pill bg-white rounded-full border border-slate-200">
               <img
    src="/email.webp" 
    alt="Descriptive Text"
    className="relative z-1 w-7 rounded-full h-7 border items-center border-black-20px object-cover transition-transform duration-500 group-hover:scale-110"

  />
            </a>

            {/* Call / Copy */}
            <button 
              onClick={() => handleCopy("+91 92046 65654")}
              className="social-pill bg-green-500 hover:bg-green-600 rounded-full active:scale-90"
            >
                <img
    src="/call.png" 
    alt="Descriptive Text"
    className="relative z-1 w-7 rounded-full h-7 border items-center border-black-20px object-cover transition-transform duration-500 group-hover:scale-110"

  />
            </button>
          </div>
        )}

        {/* Copy Notification Toast */}
        {copied && (
          <div className="absolute top-28 right-0 bg-slate-800 text-white text-[10px] md:text-xs px-4 py-2 rounded-full shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-2">
            ✅ Phone number copied!
          </div>
        )}
      </header>

      <style jsx>{`
        .social-pill {
          @apply w-11 h-11 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200 cursor-pointer;
        }
      `}</style>
    </div>
  );
};

export default Header;