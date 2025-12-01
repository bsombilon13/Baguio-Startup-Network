import React, { useState } from 'react';
import { MOCK_ANNOUNCEMENTS } from '../constants';
import { Megaphone, ArrowRight, DollarSign, Award, Newspaper } from 'lucide-react';
import { Announcement } from '../types';

const Funding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Funding' | 'Opportunity' | 'News'>('Funding');

  const fundings = MOCK_ANNOUNCEMENTS.filter(a => a.type === 'Funding');
  const opportunities = MOCK_ANNOUNCEMENTS.filter(a => a.type === 'Opportunity');
  const news = MOCK_ANNOUNCEMENTS.filter(a => a.type === 'News');

  const tabs = [
    { id: 'Funding', label: 'Funding & Grants', icon: DollarSign },
    { id: 'Opportunity', label: 'Opportunities', icon: Award },
    { id: 'News', label: 'Community News', icon: Newspaper },
  ];

  const getActiveItems = () => {
    switch (activeTab) {
      case 'Funding': return fundings;
      case 'Opportunity': return opportunities;
      case 'News': return news;
      default: return [];
    }
  };

  const getActiveColor = () => {
    switch (activeTab) {
      case 'Funding': return 'text-green-600 bg-green-50 border-green-200';
      case 'Opportunity': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'News': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-4xl font-bold text-brand-accent">
                Announcements
            </h2>
            <p className="text-slate-500 mt-2">Grants, accelerators, and community updates.</p>
        </div>
        <a 
          href="http://m.me/baguiostartup"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-accent text-white px-6 py-2 rounded-full font-bold hover:bg-brand-accent/90 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
        >
            <Megaphone className="w-4 h-4" /> Submit
        </a>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-white border border-slate-200 rounded-xl w-full md:w-fit overflow-x-auto scrollbar-hide shadow-sm">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                        isActive 
                        ? 'bg-brand-accent text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                </button>
            )
        })}
      </div>

      {/* Content Grid */}
      <div className="min-h-[400px]">
        {getActiveItems().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getActiveItems().map(item => (
                    <div key={item.id} className="group bg-white border border-slate-200 p-8 rounded-3xl overflow-hidden hover:border-brand-accent/30 hover:shadow-xl transition-all shadow-sm flex flex-col h-full relative">
                         <div className={`absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity rounded-bl-3xl`}>
                            {activeTab === 'Funding' && <DollarSign className="w-24 h-24" />}
                            {activeTab === 'Opportunity' && <Award className="w-24 h-24" />}
                            {activeTab === 'News' && <Newspaper className="w-24 h-24" />}
                        </div>

                        <div className={`w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${getActiveColor()}`}>
                            {item.type}
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-accent transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-slate-500 mb-6 leading-relaxed flex-1 text-sm">
                            {item.content}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <span className="text-xs text-slate-400 font-medium">
                                {item.datePosted.toLocaleDateString()}
                            </span>
                            {item.ctaLink && (
                                <a href={item.ctaLink} className="flex items-center gap-2 text-brand-accent font-bold hover:gap-3 transition-all text-xs uppercase tracking-wide">
                                    Details <ArrowRight className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                     <Megaphone className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">No updates yet</h3>
                <p className="text-slate-500 max-w-sm mt-2">Check back later for new {activeTab.toLowerCase()} announcements.</p>
            </div>
        )}
      </div>

    </div>
  );
};

export default Funding;