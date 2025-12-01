
import React from 'react';
import { Event } from '../types';
import { X, MapPin, Calendar, Share2, Clock, CalendarPlus, ExternalLink, Download } from 'lucide-react';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [rsvpState, setRsvpState] = React.useState<'idle' | 'success'>('idle');

  React.useEffect(() => {
      setRsvpState('idle');
  }, [event]);

  if (!event) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
        // Fallback share logic
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(event.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }
  };

  const handleRegister = () => {
      if (event.registrationLink) {
          window.open(event.registrationLink, '_blank');
      } else {
          setRsvpState('success');
          setTimeout(() => setRsvpState('idle'), 3000);
      }
  };

  // Calendar Helpers
  const getDates = () => {
    const start = new Date(event.date);
    const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return { start, end };
  };
  const { start, end } = getDates();

  const addToGoogleCalendar = () => {
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const downloadIcs = () => {
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const icsContent = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      `DTSTART:${formatDate(start)}`, `DTEND:${formatDate(end)}`,
      `SUMMARY:${event.title}`, `DESCRIPTION:${event.description}`, `LOCATION:${event.location}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Maps URL
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white border border-slate-200 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header Image */}
        <div className="h-48 relative shrink-0">
           <img 
             src={event.imageUrl} 
             alt={event.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
           >
             <X className="w-5 h-5" />
           </button>
           
           {/* Overlapping Badge */}
           <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
                <span className="inline-block px-4 py-1.5 bg-brand-accent text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg border-2 border-white">
                    {event.category}
                </span>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 pt-10 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
            {event.title}
          </h2>
          
          <div className="space-y-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start text-slate-700">
               <Calendar className="w-5 h-5 mr-3 text-fun-pink mt-0.5" />
               <span className="font-medium">{event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
             <div className="flex items-start text-slate-700">
               <Clock className="w-5 h-5 mr-3 text-fun-orange mt-0.5" />
               <span className="font-medium">
                 {event.date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                 {event.endDate ? ` - ${event.endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : ''}
               </span>
            </div>
            <a 
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start text-slate-700 hover:text-brand-accent transition-colors group cursor-pointer"
            >
               <MapPin className="w-5 h-5 mr-3 text-fun-teal mt-0.5 group-hover:scale-110 transition-transform" />
               <span className="font-medium underline decoration-dotted underline-offset-4">{event.location}</span>
            </a>
          </div>

          <p className="text-slate-500 leading-relaxed mb-8">
            {event.description}
          </p>

          <div className="flex gap-2 mt-auto flex-wrap">
            <button 
                onClick={handleRegister}
                disabled={rsvpState === 'success'}
                className={`flex-1 py-3 px-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                    rsvpState === 'success' 
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
            >
              {rsvpState === 'success' ? 'Registered!' : 'Register'}
            </button>
            
            <div className="flex gap-2">
                <button 
                    onClick={addToGoogleCalendar}
                    className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors border border-slate-200"
                    title="Add to Google Calendar"
                >
                    <CalendarPlus className="w-5 h-5" />
                </button>
                <button 
                    onClick={handleShare}
                    className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors border border-slate-200"
                    title="Share Event"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
