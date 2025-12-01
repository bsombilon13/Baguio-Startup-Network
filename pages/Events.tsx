import React, { useState } from 'react';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';
import EventModal from '../components/EventModal';
import EventCard from '../components/EventCard';
import { Calendar as CalendarIcon, List } from 'lucide-react';

const Events: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Sorting events by date
  const sortedEvents = [...MOCK_EVENTS].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get current date for calendar view context
  const today = new Date();
  const currentMonthName = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-fun-pink to-fun-orange bg-clip-text text-transparent">
                Events
            </h2>
            <p className="text-slate-500 mt-2">Upcoming meetups, workshops, and parties.</p>
         </div>
         <div className="bg-white border border-slate-200 p-1 rounded-xl flex gap-1 shadow-sm">
            <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-slate-100 text-slate-900 shadow-sm font-bold' : 'text-slate-400 hover:text-slate-600'}`}>
                <List className="w-5 h-5" />
            </button>
            <button 
                onClick={() => setView('calendar')}
                className={`p-2 rounded-lg transition-all ${view === 'calendar' ? 'bg-slate-100 text-slate-900 shadow-sm font-bold' : 'text-slate-400 hover:text-slate-600'}`}>
                <CalendarIcon className="w-5 h-5" />
            </button>
         </div>
      </div>

      {view === 'list' ? (
          <div className="grid gap-4">
              {sortedEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onClick={() => setSelectedEvent(event)} 
                  />
              ))}
          </div>
      ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="mb-6 border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{currentMonthName} {currentYear}</h3>
              </div>
              
              {/* Simplified Custom Grid Calendar for aesthetic purposes */}
              <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4 text-center text-slate-400 font-bold uppercase text-xs">
                 <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-2 md:gap-4">
                  {/* Mocking a month view roughly starting from today */}
                  {Array.from({ length: 30 }).map((_, i) => {
                      const dayDate = new Date();
                      dayDate.setDate(new Date().getDate() + (i - new Date().getDay())); // roughly align
                      const dayEvents = sortedEvents.filter(e => e.date.getDate() === dayDate.getDate() && e.date.getMonth() === dayDate.getMonth());
                      const isToday = dayDate.toDateString() === new Date().toDateString();

                      return (
                          <div key={i} className={`min-h-[80px] md:min-h-[120px] rounded-xl p-2 border border-slate-100 relative ${isToday ? 'bg-fun-teal/5 border-fun-teal/20' : ''}`}>
                              <span className={`text-sm font-medium ${isToday ? 'text-fun-teal' : 'text-slate-400'}`}>
                                  {dayDate.getDate()}
                              </span>
                              <div className="mt-2 space-y-1">
                                  {dayEvents.map(ev => (
                                      <div 
                                        key={ev.id} 
                                        onClick={() => setSelectedEvent(ev)}
                                        className="text-[10px] bg-fun-purple/10 text-fun-purple font-semibold p-1 rounded truncate cursor-pointer hover:bg-fun-purple hover:text-white transition-colors border border-fun-purple/20"
                                      >
                                          {ev.title}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )
                  })}
              </div>
          </div>
      )}

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default Events;