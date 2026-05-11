import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function SangvitaLoader() {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100] flex items-center justify-center animate-fadeIn">
      <div className="flex flex-col items-center gap-10 animate-scaleIn">
        
        {/* Logo Area */}
        <div className="relative rounded-full">
          <Image
            src="/logo.jpeg"
            alt="Sangvita"
            width={130}
            height={130}
            className="drop-shadow-2xl"
            priority
          />
          {/* <div 
            className="absolute inset-0 border-[6px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"
            style={{ animationDuration: '1.4s' }}
          /> */}
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-emerald-700 tracking-tighter">
            Sangvita
          </h2>
          <p className="text-emerald-600 text-base font-medium mt-1">
            Caring for your health
          </p>
        </div>

        {/* Loading Section */}
        <div className="flex flex-col items-center gap-4 animate-content">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            <span className="text-slate-600 font-medium text-lg">
              Loading medicines...
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 rounded-full animate-progress" />
          </div>

          <p className="text-xs text-slate-400 mt-1">
            Preparing premium wellness solutions
          </p>
        </div>

      </div>
    </div>
  );
}