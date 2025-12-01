import React from 'react';
import { Startup } from '../types';
import { X, Globe, Facebook, CheckCircle } from 'lucide-react';

interface StartupModalProps {
  startup: Startup | null;
  onClose: () => void;
  logoUrl: string;
}

const StartupModal: React.FC<StartupModalProps> = ({ startup, onClose, logoUrl }) => {
  if (!startup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white border border-slate-200 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header Cover */}
        <div className="h-32 bg-brand-accent relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent to-fun-purple opacity-90"></div>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
           >
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 md:px-8 relative -mt-12">
            {/* Logo */}
           <div className="w-24 h-24 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden mb-4">
             <img src={logoUrl} alt={startup.name} className="w-full h-full object-cover" />
           </div>

           <div className="flex items-start justify-between mb-4">
               <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight flex items-center gap-2">
                        {startup.name}
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                    </h2>
                    <span className="inline-block mt-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                        {startup.category}
                    </span>
               </div>
           </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {startup.description}
          </p>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Connect</h3>
            <div className="flex gap-3">
                {startup.facebookUrl && (
                    <a 
                        href={startup.facebookUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 py-3 bg-[#1877F2] text-white font-bold rounded-xl hover:bg-[#1877F2]/90 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                        <Facebook className="w-5 h-5" /> Facebook
                    </a>
                )}
                {startup.websiteUrl ? (
                     <a 
                        href={startup.websiteUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Globe className="w-5 h-5" /> Website
                    </a>
                ) : (
                    <button disabled className="flex-1 py-3 bg-slate-50 text-slate-400 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                         <Globe className="w-5 h-5" /> Website
                    </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupModal;