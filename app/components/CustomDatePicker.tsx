'use client';

import { useState, useEffect } from 'react';

export default function CustomDatePicker({
  selectedDate,
  onDateSelect,
  minDate
}: {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  minDate: string;
}) {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    return selectedDate ? new Date(selectedDate) : new Date();
  });

  // Keep it synced if external selection changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonthDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = new Date(year, month, 1).getDay(); // Sunday=0, Monday=1...
  const startDay = startDayOfMonth === 0 ? 6 : startDayOfMonth - 1; // Adapt so Mon=0 ... Sun=6

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const isPastDate = (d: Date) => {
    const dStr = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0')
    ].join('-');
    return dStr < minDate;
  };

  const monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 overflow-hidden w-full select-none shadow-inner">
       {/* Header */}
       <div className="flex justify-between items-center mb-5">
          <button 
            type="button" 
            onClick={handlePrevMonth} 
            className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors focus:ring-1 focus:ring-brand focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <div className="text-white font-bold text-lg uppercase tracking-widest text-glow">
            {monthNames[month]} {year}
          </div>
          
          <button 
            type="button" 
            onClick={handleNextMonth} 
            className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors focus:ring-1 focus:ring-brand focus:outline-none"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
       </div>

       {/* Days of Week */}
       <div className="grid grid-cols-7 gap-1 mb-2">
         {dayNames.map(d => (
           <div key={d} className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest">{d}</div>
         ))}
       </div>

       {/* Days Grid */}
       <div className="grid grid-cols-7 gap-1 sm:gap-2">
         {days.map((dateObj, i) => {
           if (!dateObj) {
             return <div key={`pad-${i}`} className="h-10 sm:h-12"></div>;
           }

           const dateStr = [
             dateObj.getFullYear(),
             String(dateObj.getMonth() + 1).padStart(2, '0'),
             String(dateObj.getDate()).padStart(2, '0')
           ].join('-');
           
           const isSelected = selectedDate === dateStr;
           const disabled = isPastDate(dateObj);

           return (
             <button
               key={i}
               type="button"
               disabled={disabled}
               onClick={() => onDateSelect(dateStr)}
               className={`h-10 sm:h-12 w-full rounded-xl text-base font-bold flex flex-col items-center justify-center transition-all ${
                 isSelected 
                   ? 'bg-brand text-dark shadow-[0_0_15px_rgba(57,255,20,0.5)] scale-105 border-brand' 
                   : disabled
                     ? 'text-gray-700 bg-[#111] cursor-not-allowed opacity-30 border border-transparent'
                     : 'text-white border border-white/5 hover:border-brand/40 hover:bg-brand/10 hover:text-brand'
               }`}
             >
               {dateObj.getDate()}
             </button>
           );
         })}
       </div>
    </div>
  );
}
