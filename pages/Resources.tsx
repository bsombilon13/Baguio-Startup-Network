
import React, { useState } from 'react';
import { MOCK_RESOURCES } from '../constants';
import { FileText, Download, File, Presentation, Search, Globe } from 'lucide-react';

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || resource.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIcon = (format: string) => {
    switch (format) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'DOCX': return <File className="w-6 h-6 text-blue-500" />;
      case 'PPTX': return <Presentation className="w-6 h-6 text-orange-500" />;
      case 'WEB': return <Globe className="w-6 h-6 text-brand-accent" />;
      default: return <File className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
          <h2 className="text-4xl font-bold text-brand-accent">
            Resources
          </h2>
          <p className="text-slate-500 mt-2">Download reports, templates, and guides to help you build.</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Report', 'Template', 'Guide'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${
                typeFilter === type 
                  ? 'bg-brand-accent text-white border-brand-accent font-bold shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-brand-accent/30 group flex flex-col h-full bento-card">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-brand-accent/5 transition-colors">
                {getIcon(resource.format)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                {resource.type}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-accent transition-colors">
              {resource.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
              {resource.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span className="uppercase">{resource.format}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{resource.size}</span>
              </div>
              <a 
                href={resource.downloadUrl} 
                target={resource.format === 'WEB' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-brand-accent/80 transition-colors bg-brand-accent/5 px-3 py-1.5 rounded-lg hover:bg-brand-accent/10"
              >
                {resource.format === 'WEB' ? 'View' : 'Download'} <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;