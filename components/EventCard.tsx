
import React, { useState, useRef, useEffect } from 'react';
import { Event } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, Twitter, Linkedin, Facebook, CalendarPlus, Download, ExternalLink } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowCalendarMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = (e: React.MouseEvent, platform: 'twitter' | 'linkedin' | 'facebook') => {
    e.stopPropagation();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${event.title} on Baguio Startup Network!`);
    
    let shareUrl = '';
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const getEventDates = () => {
    const start = new Date(event.date);
    // Use endDate if provided, otherwise default to 2 hours
    const end = event.endDate 
        ? new Date(event.endDate) 
        : new Date(start.getTime() + 2 * 60 * 60 * 1000); 
    return { start, end };
  };

  const { start, end } = getEventDates();

  // Date Display Logic
  const isSameDay = start.toDateString() === end.toDateString();
  
  const dateDisplay = isSameDay 
    ? start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;

  // Time Display Logic
  const timeDisplay = isSameDay
    ? `${start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} - ${end.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
    : `${start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`; // For multi-day, just show start time

  const addToGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
    setShowCalendarMenu(false);
  };

  const addToOutlookCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.description)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
    setShowCalendarMenu(false);
  };

  const downloadIcs = (e: React.MouseEvent) => {
    e.stopPropagation();
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  // Check if location is virtual (Zoom, Online, etc.)
  const isVirtual = event.location.toLowerCase().includes('zoom') || event.location.toLowerCase().includes('online');

  const openMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVirtual) return;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white hover:bg-white border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-xl shadow-sm relative overflow-visible"
    >
        <div className="w-full md:w-48 h-32 md:h-auto rounded-xl overflow-hidden shrink-0">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-fun-pink font-bold text-sm mb-1 uppercase tracking-wider">
                <CalendarIcon className="w-3 h-3" />
                <span>{dateDisplay}</span>
                <span className="text-slate-300">•</span>
                <span>{event.category}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-fun-orange transition-colors">{event.title}</h3>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {timeDisplay}
                </div>
                <div 
                    onClick={isVirtual ? undefined : openMap}
                    className={`flex items-center gap-1 transition-colors group/map ${isVirtual ? '' : 'hover:text-brand-accent cursor-pointer'}`}
                    title={isVirtual ? '' : "Open in Google Maps"}
                >
                    <MapPin className={`w-4 h-4 ${isVirtual ? '' : 'group-hover/map:scale-110 transition-transform'}`} />
                    <span className={isVirtual ? '' : "group-hover/map:underline decoration-dotted underline-offset-2"}>{event.location}</span>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col md:items-end justify-between gap-4">
             {/* Share Buttons - Always visible on mobile, reveal on hover for desktop */}
            <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-x-4 md:group-hover:translate-x-0 bg-white p-1.5 rounded-full shadow-md border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase px-2 hidden md:inline-block">Share</span>
                <button 
                  onClick={(e) => handleShare(e, 'twitter')} 
                  className="p-2 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] text-slate-400 rounded-full transition-colors" 
                  title="Share on Twitter"
                >
                    <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => handleShare(e, 'linkedin')} 
                  className="p-2 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] text-slate-400 rounded-full transition-colors" 
                  title="Share on LinkedIn"
                >
                    <Linkedin className="w-4 h-4" />
                </button>
                 <button 
                  onClick={(e) => handleShare(e, 'facebook')} 
                  className="p-2 hover:bg-[#1877F2]/10 hover:text-[#1877F2] text-slate-400 rounded-full transition-colors" 
                  title="Share on Facebook"
                >
                    <Facebook className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-3">
                {/* Add to Calendar Button */}
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowCalendarMenu(!showCalendarMenu); }}
                    className={`p-3 bg-slate-100 border border-slate-200 rounded-full text-slate-600 hover:bg-white hover:text-slate-900 transition-colors shadow-sm ${showCalendarMenu ? 'bg-white text-slate-900 ring-2 ring-slate-100' : ''}`}
                    title="Add to Calendar"
                  >
                    <CalendarPlus className="w-5 h-5" />
                  </button>
                  
                  {showCalendarMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in duration-200">
                      <div className="p-2 space-y-1">
                        <button 
                          onClick={addToGoogleCalendar} 
                          className="w-full px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> Google Calendar
                        </button>
                        <button 
                          onClick={addToOutlookCalendar} 
                          className="w-full px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> Outlook
                        </button>
                        <button 
                          onClick={downloadIcs} 
                          className="w-full px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Download className="w-3 h-3" /> Download .ics
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <span className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg">
                    Details
                </span>
            </div>
        </div>
    </div>
  );
};

export default EventCard;
