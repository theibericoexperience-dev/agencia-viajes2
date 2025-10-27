"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from './Toast';

interface Reservation {
  id: string;
  destinationName: string;
  destinationImage: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export default function ReservationsList() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const toast = useToast();

  useEffect(() => {
    fetchReservations();
  }, [session]);

  const fetchReservations = async () => {
    if (!session) return;

    try {
      const response = await fetch('/api/reservations');
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        toast.error('Error', 'No se pudieron cargar las reservas');
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Error', 'Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId: string) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) return;

    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (response.ok) {
        toast.success('Reserva cancelada', 'Tu reserva ha sido cancelada exitosamente');
        fetchReservations(); // Refresh the list
      } else {
        toast.error('Error', 'No se pudo cancelar la reserva');
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast.error('Error', 'Error al cancelar la reserva');
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const checkInDate = new Date(reservation.checkInDate);
    const now = new Date();

    switch (filter) {
      case 'upcoming':
        return checkInDate >= now && reservation.status !== 'cancelled';
      case 'past':
        return checkInDate < now || reservation.status === 'completed' || reservation.status === 'cancelled';
      default:
        return true;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-600">Cargando reservas...</span>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes reservas</h3>
        <p className="text-gray-600 mb-6">¡Es hora de planificar tu próximo viaje!</p>
        <a
          href="/destinations"
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
        >
          Explorar destinos
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'upcoming', label: 'Próximas' },
          { key: 'past', label: 'Pasadas' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <div key={reservation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* Destination Image */}
                <div className="flex-shrink-0">
                  <img
                    src={reservation.destinationImage}
                    alt={reservation.destinationName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>

                {/* Reservation Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {reservation.destinationName}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>
                          {format(new Date(reservation.checkInDate), 'd MMM', { locale: es })} - {' '}
                          {format(new Date(reservation.checkOutDate), 'd MMM yyyy', { locale: es })}
                        </span>
                        <span>•</span>
                        <span>{reservation.adults + reservation.children} personas</span>
                        <span>•</span>
                        <span>
                          {Math.ceil((new Date(reservation.checkOutDate).getTime() - new Date(reservation.checkInDate).getTime()) / (1000 * 60 * 60 * 24))} noches
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {reservation.totalPrice}€
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </div>
                    </div>
                  </div>

                  {/* Guest Details */}
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Adultos:</span> {reservation.adults}
                    </div>
                    <div>
                      <span className="font-medium">Niños:</span> {reservation.children}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Reservado el {format(new Date(reservation.createdAt), 'd MMM yyyy', { locale: es })}
                    </div>

                    <div className="flex space-x-3">
                      {reservation.status === 'confirmed' && new Date(reservation.checkInDate) > new Date() && (
                        <button
                          onClick={() => cancelReservation(reservation.id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Cancelar
                        </button>
                      )}

                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No hay reservas en esta categoría.</p>
        </div>
      )}
    </div>
  );
}