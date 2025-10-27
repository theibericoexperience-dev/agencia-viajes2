"use client";
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

interface AvailabilityCalendarProps {
  destinationId: string;
  onDateSelect?: (checkIn: string, checkOut: string) => void;
  selectedCheckIn?: string;
  selectedCheckOut?: string;
}

interface AvailabilityData {
  [date: string]: {
    available: boolean;
    priceModifier: number;
    spots: number;
  };
}

export default function AvailabilityCalendar({
  destinationId,
  onDateSelect,
  selectedCheckIn,
  selectedCheckOut
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityData>({});
  const [loading, setLoading] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Fetch availability for the current month
  const fetchAvailability = async (month: Date) => {
    setLoading(true);
    try {
      const startDate = startOfMonth(month);
      const endDate = endOfMonth(month);

      const response = await fetch(
        `/api/reservations/availability?destinationId=${destinationId}&checkInDate=${format(startDate, 'yyyy-MM-dd')}&checkOutDate=${format(endDate, 'yyyy-MM-dd')}&includeRange=true`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.dateRange) {
          const availabilityMap: AvailabilityData = {};
          data.dateRange.forEach((day: any) => {
            availabilityMap[day.date] = {
              available: day.available,
              priceModifier: day.priceModifier,
              spots: day.spots
            };
          });
          setAvailability(availabilityMap);
        }
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability(currentMonth);
  }, [currentMonth, destinationId]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add empty cells for days before the first day of the month
  const startDate = calendarDays[0];
  const emptyDays = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');

    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Start new selection
      onDateSelect?.(dateStr, '');
    } else if (selectedCheckIn && !selectedCheckOut) {
      // Complete selection
      const checkInDate = new Date(selectedCheckIn);
      if (date > checkInDate) {
        onDateSelect?.(selectedCheckIn, dateStr);
      } else {
        // If clicked date is before check-in, start new selection
        onDateSelect?.(dateStr, '');
      }
    }
  };

  const isDateSelected = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr === selectedCheckIn || dateStr === selectedCheckOut;
  };

  const isDateInRange = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr > selectedCheckIn && dateStr < selectedCheckOut;
  };

  const getDateAvailability = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability[dateStr];
  };

  const getDateStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayData = availability[dateStr];

    if (!dayData) return { available: true, priceModifier: 1, spots: 10 }; // Default availability

    return {
      available: dayData.available && dayData.spots > 0,
      priceModifier: dayData.priceModifier,
      spots: dayData.spots
    };
  };

  const getPriceForDate = (date: Date) => {
    const status = getDateStatus(date);
    const basePrice = 150; // Base price per night
    return Math.round(basePrice * status.priceModifier);
  };

  const getPriceColor = (priceModifier: number) => {
    if (priceModifier <= 0.8) return 'text-green-600 bg-green-50';
    if (priceModifier <= 1.0) return 'text-blue-600 bg-blue-50';
    if (priceModifier <= 1.2) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Disponibilidad</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-lg font-medium text-gray-900 min-w-[140px] text-center">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </span>

          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>No disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Seleccionado</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day headers */}
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: emptyDays }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((date: Date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const dayAvailability = getDateAvailability(date);
          const isSelected = isDateSelected(date);
          const isInRange = isDateInRange(date);
          const isToday = isSameDay(date, new Date());

          let cellClasses = 'relative p-2 text-center text-sm cursor-pointer transition-all hover:scale-105 ';

          if (isSelected) {
            cellClasses += 'bg-blue-500 text-white rounded-lg ';
          } else if (isInRange) {
            cellClasses += 'bg-blue-100 text-blue-900 rounded-lg ';
          } else if (dayAvailability?.available) {
            cellClasses += `rounded-lg border ${getPriceColor(dayAvailability.priceModifier)} `;
          } else {
            cellClasses += 'text-gray-400 cursor-not-allowed ';
          }

          if (isToday) {
            cellClasses += 'ring-2 ring-blue-300 ';
          }

          return (
            <div
              key={dateStr}
              className={cellClasses}
              onClick={() => dayAvailability?.available && handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(dateStr)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <span className="relative z-10">{format(date, 'd')}</span>

              {/* Tooltip */}
              {hoveredDate === dateStr && dayAvailability && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-20">
                  <div className="font-medium">{format(date, 'EEEE, d MMMM', { locale: es })}</div>
                  {dayAvailability.available ? (
                    <div>
                      <div>{dayAvailability.spots} plazas disponibles</div>
                      <div className="text-yellow-300">
                        {dayAvailability.priceModifier === 1 ? 'Precio normal' :
                         dayAvailability.priceModifier < 1 ? 'Precio reducido' : 'Precio elevado'}
                      </div>
                    </div>
                  ) : (
                    <div>No disponible</div>
                  )}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-2 text-sm text-gray-600">Cargando disponibilidad...</span>
        </div>
      )}

      {/* Selection Summary */}
      {selectedCheckIn && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Selección actual:</h4>
          <div className="text-sm text-gray-600">
            <div>Check-in: {format(new Date(selectedCheckIn), 'EEEE, d MMMM yyyy', { locale: es })}</div>
            {selectedCheckOut && (
              <div>Check-out: {format(new Date(selectedCheckOut), 'EEEE, d MMMM yyyy', { locale: es })}</div>
            )}
            {selectedCheckOut && (
              <div className="mt-1 font-medium text-blue-600">
                {Math.ceil((new Date(selectedCheckOut).getTime() - new Date(selectedCheckIn).getTime()) / (1000 * 60 * 60 * 24))} noches
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}