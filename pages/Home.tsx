
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_STARTUPS, MOCK_EVENTS, MOCK_ANNOUNCEMENTS } from '../constants';
import { ArrowUpRight, Users, Calendar, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const nextEvent = MOCK_EVENTS[0];
  const featuredStartup = MOCK_STARTUPS[0];
  const latestNews = MOCK_ANNOUNCEMENTS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <header className="mb-8">
           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
               Welcome to <span className="bg-gradient-to-r from-fun-pink via-fun-purple to-fun-teal bg-clip-text text-transparent">Baguio Startup Network</span>
           </h1>
           <p className="text-slate-500 text-lg max-w-2xl">
               The central hub for the mountain region's startup ecosystem. Connect, attend, and grow.
           </p>
       </header>

       {/* THE BENTO GRID */}
       <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px]">
           
           {/* 1. Large Feature Card (Events) - 2x2 */}
           <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden group hover:shadow-xl transition-all shadow-sm bento-card flex flex-col justify-center items-center">
               {nextEvent ? (
                 <>
                   <img src={nextEvent.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Event" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                   
                   <div className="relative z-10 h-full flex flex-col justify-end text-white w-full">
                       <div className="bg-fun-pink text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 shadow-lg">
                           UPCOMING EVENT
                       </div>
                       <h2 className="text-3xl font-bold mb-2 shadow-black/20 drop-shadow-lg">{nextEvent.title}</h2>
                       <p className="text-slate-100 line-clamp-2 mb-4 drop-shadow-md">{nextEvent.description}</p>
                       <Link to="/events" className="flex items-center gap-2 text-white font-bold hover:underline">
                           View Calendar <ArrowUpRight className="w-4 h-4" />
                       </Link>
                   </div>
                 </>
               ) : (
                 <div className="text-center p-6">
                    <div className="bg-slate-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-600 mb-2">No Upcoming Events</h3>
                    <p className="text-slate-400 text-sm">Check back soon for new community gatherings.</p>
                 </div>
               )}
           </div>

           {/* 2. Stat Card 1 - 1x1 */}
           <div className="bg-gradient-to-br from-fun-purple to-indigo-600 rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg shadow-indigo-200 bento-card">
               <Users className="w-8 h-8 opacity-80" />
               <div>
                   <div className="text-4xl font-bold">120+</div>
                   <div className="text-sm opacity-80 font-medium">Active Founders</div>
               </div>
           </div>

           {/* 3. Stat Card 2 - 1x1 */}
           <div className="bg-gradient-to-br from-fun-teal to-emerald-600 rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg shadow-emerald-200 bento-card">
               <TrendingUp className="w-8 h-8 opacity-80" />
               <div>
                   <div className="text-4xl font-bold">$2M</div>
                   <div className="text-sm opacity-80 font-medium">Raised this Year</div>
               </div>
           </div>

           {/* 4. Funding Alert - 2x1 (Wide) */}
           <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-center hover:border-slate-300 transition-colors shadow-sm bento-card">
               {latestNews ? (
                   <>
                       <div className="flex items-center gap-3 mb-2">
                           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                           <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Latest Funding Call</span>
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-1">{latestNews.title}</h3>
                       <p className="text-slate-500 text-sm mb-3 line-clamp-1">{latestNews.content}</p>
                       <Link to="/funding" className="text-sm text-fun-teal font-bold hover:text-teal-600 transition-colors">Apply Now &rarr;</Link>
                   </>
               ) : (
                   <div className="text-center text-slate-400">
                       <p>No recent announcements</p>
                   </div>
               )}
           </div>

           {/* 5. Featured Community - 1x2 (Tall) */}
           <div className="md:row-span-2 bg-white border border-slate-200 rounded-3xl p-0 overflow-hidden flex flex-col shadow-sm bento-card">
               {featuredStartup ? (
                   <>
                       <div className="h-1/2 bg-slate-100 relative">
                          {/* Use the logoUrl if explicitly available, otherwise fallback is handled in Ecosystem component but here we just show placeholder if empty */}
                          <img 
                            src={featuredStartup.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredStartup.name)}&background=random`} 
                            className="w-full h-full object-cover" 
                            alt="Startup" 
                          />
                       </div>
                       <div className="p-5 flex-1 flex flex-col">
                          <span className="text-xs text-fun-orange font-bold uppercase mb-1">Spotlight</span>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{featuredStartup.name}</h3>
                          <Link to="/ecosystem" className="mt-auto w-full py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-center text-xs font-bold text-slate-700 transition-colors border border-slate-200">
                              Visit Profile
                          </Link>
                       </div>
                   </>
               ) : (
                   <div className="flex items-center justify-center h-full text-slate-400 p-4 text-center">
                       Loading Ecosystem...
                   </div>
               )}
           </div>

           {/* 6. Quick Action - 1x1 */}
           <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-center text-center hover:shadow-lg transition-all group cursor-pointer shadow-sm bento-card">
               <div>
                   <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-fun-pink transition-colors" />
                   <div className="font-bold text-sm text-slate-700 group-hover:text-slate-900">Host Event</div>
               </div>
           </div>

       </div>
    </div>
  );
};

export default Home;
