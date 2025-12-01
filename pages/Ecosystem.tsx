import React, { useState, useMemo } from 'react';
import { MOCK_STARTUPS } from '../constants';
import { Search, Facebook, ExternalLink, Plus } from 'lucide-react';
import { Startup } from '../types';
import StartupModal from '../components/StartupModal';

// Generates a list of potential image URLs ordered by priority
const getImageCandidates = (startup: Startup): string[] => {
    const candidates: string[] = [];

    // 1. Explicit Logo (Highest priority if provided)
    if (startup.logoUrl) {
        candidates.push(startup.logoUrl);
    }

    // 2. Facebook Derivatives
    if (startup.facebookUrl) {
        try {
            // Ensure protocol exists for URL constructor
            const urlString = startup.facebookUrl.startsWith('http') 
                ? startup.facebookUrl 
                : `https://${startup.facebookUrl}`;
                
            const urlObj = new URL(urlString);
            const path = urlObj.pathname;
            const searchParams = urlObj.searchParams;
            
            let handle = '';

            // Strategy 1: Explicit ID parameter (e.g. profile.php?id=123)
            // This is the specific fix for numeric IDs provided in the prompt
            if (searchParams.has('id')) {
                handle = searchParams.get('id') || '';
            } 
            // Strategy 2: URL Path Logic
            else {
                // Remove trailing slash and split
                const parts = path.replace(/\/$/, '').split('/').filter(p => p.length > 0);
                
                // Find numeric ID at the end of path (common for /pages/name/id or /people/name/id)
                const lastPart = parts[parts.length - 1];
                
                // If the last part is purely numeric, it's likely the ID
                if (lastPart && /^\d+$/.test(lastPart)) {
                    handle = lastPart;
                } 
                // Standard username (first segment)
                // Filter out common facebook paths that aren't usernames
                else if (parts.length > 0) {
                     const invalid = ['groups', 'pages', 'people', 'profile.php', 'home.php', 'watch', 'events', 'public'];
                     if (!invalid.includes(parts[0].toLowerCase())) {
                         handle = parts[0];
                     }
                }
            }

            if (handle) {
                // Priority 2A: Graph API 
                // This is extremely reliable for numeric Page IDs (e.g. 615...) and standard Usernames
                candidates.push(`https://graph.facebook.com/${handle}/picture?type=large`);
                
                // Priority 2B: Unavatar (Service proxy as backup)
                candidates.push(`https://unavatar.io/facebook/${handle}`);
            }
        } catch (e) {
            console.error("Error parsing FB URL", e);
        }
    }

    // 3. Fallback UI Avatars (Guaranteed to work)
    candidates.push(`https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=random&size=200&color=fff`);
    
    return candidates;
};

const Ecosystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Track selected startup and its successfully loaded image
  const [selectedStartup, setSelectedStartup] = useState<{data: Startup, img: string} | null>(null);

  const filteredStartups = MOCK_STARTUPS.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || startup.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-brand-accent">
            The Ecosystem
          </h2>
          <p className="text-slate-500 mt-2">Discover the innovators shaping the future.</p>
        </div>
        
        {/* Redirects to Messenger */}
        <a 
            href="http://m.me/baguiostartup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
        >
            <Plus className="w-5 h-5" /> Add Startup
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search ecosystems..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Community', 'Startup', 'Accelerator', 'Non-Profit'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${
                categoryFilter === cat 
                  ? 'bg-brand-accent text-white border-brand-accent font-bold shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => (
          <StartupCard 
            key={startup.id} 
            startup={startup} 
            onViewProfile={(imgSrc) => setSelectedStartup({ data: startup, img: imgSrc })}
          />
        ))}
      </div>

      <StartupModal 
        startup={selectedStartup?.data || null} 
        onClose={() => setSelectedStartup(null)}
        logoUrl={selectedStartup?.img || ''}
      />
    </div>
  );
};

interface StartupCardProps {
    startup: Startup;
    onViewProfile: (currentImgSrc: string) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, onViewProfile }) => {
  const candidates = useMemo(() => getImageCandidates(startup), [startup]);
  
  // State to track which candidate we are currently trying
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [currentImgSrc, setCurrentImgSrc] = useState(candidates[0]);

  const handleError = () => {
      const nextIndex = candidateIndex + 1;
      if (nextIndex < candidates.length) {
          setCandidateIndex(nextIndex);
          setCurrentImgSrc(candidates[nextIndex]);
      }
      // If we run out of candidates, the last one (UI Avatars) is guaranteed to work
  };

  return (
    <div className="group bg-white hover:border-brand-accent/50 border border-slate-200 p-6 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col h-full bento-card shadow-sm hover:shadow-xl">
       {/* Background Glow Effect */}
       <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-all"></div>
       
       <div className="flex items-start justify-between mb-4 relative z-10">
         <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-100 relative">
           <img 
             src={currentImgSrc} 
             alt={startup.name} 
             className="w-full h-full object-cover" 
             onError={handleError}
           />
         </div>
         {startup.facebookUrl && (
             <a 
                href={startup.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#1877F2]/10 text-[#1877F2] rounded-full hover:bg-[#1877F2] hover:text-white transition-all"
             >
                 <Facebook className="w-5 h-5" />
             </a>
         )}
       </div>

       <div className="mb-4 relative z-10 flex-1">
         <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 inline-block ${
            startup.category === 'Community' ? 'bg-fun-teal/10 text-fun-teal' :
            startup.category === 'Startup' ? 'bg-fun-pink/10 text-fun-pink' :
            'bg-fun-yellow/10 text-fun-yellow'
         }`}>
             {startup.category}
         </span>
         <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-accent transition-colors mb-2">
             {startup.name}
         </h3>
         <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
             {startup.description}
         </p>
       </div>

       <div className="mt-auto flex items-center gap-3 relative z-10">
          <button 
            onClick={() => onViewProfile(currentImgSrc)}
            className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 text-slate-700 hover:text-brand-accent transition-all flex items-center justify-center gap-2"
          >
            View Profile <ExternalLink className="w-3 h-3" />
          </button>
       </div>
    </div>
  );
};

export default Ecosystem;