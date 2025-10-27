"use client";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useToast } from './Toast';
import AvailabilityCalendar from './AvailabilityCalendar';
import { motion } from 'framer-motion';

// Validation schema
const reservationSchema = z.object({
  checkInDate: z.string().min(1, 'Fecha de entrada es requerida'),
  checkOutDate: z.string().min(1, 'Fecha de salida es requerida'),
  adults: z.number().min(1, 'Al menos 1 adulto requerido').max(10, 'Máximo 10 adultos'),
  children: z.number().min(0, 'Número de niños no puede ser negativo').max(10, 'Máximo 10 niños'),
  specialRequests: z.string().optional(),
  guestName: z.string().optional(),
  guestEmail: z.string().email('Email inválido').optional(),
}).refine((data) => {
  const checkIn = new Date(data.checkInDate);
  const checkOut = new Date(data.checkOutDate);
  return checkOut > checkIn;
}, {
  message: 'La fecha de salida debe ser posterior a la fecha de entrada',
  path: ['checkOutDate'],
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  destination: {
    id: string;
    name: string;
    image: string;
    price?: number;
  };
  onSuccess?: (reservation: any) => void;
  onCancel?: () => void;
}

export default function ReservationForm({ destination, onSuccess, onCancel }: ReservationFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<any>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      checkInDate: '',
      checkOutDate: '',
    },
  });

  const checkInDate = watch('checkInDate');
  const checkOutDate = watch('checkOutDate');

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !availability?.isAvailable) return 0;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) return 0;

    const adults = watch('adults') || 0;
    const children = watch('children') || 0;
    const basePrice = destination.price || 150; // Default price if not provided

    // Apply price modifiers from availability data
    const avgModifier = availability.dateRange?.reduce((sum: number, day: any) => sum + (day.priceModifier || 1), 0) / (availability.dateRange?.length || 1) || 1;

    // Calculate base price per night per person
    const adultPrice = basePrice * avgModifier;
    const childPrice = adultPrice * 0.7; // Children pay 70% of adult price

    const totalPrice = (adults * adultPrice + children * childPrice) * nights;

    return Math.round(totalPrice);
  };

  const totalPrice = calculateTotalPrice();

  // Check availability when dates change
  const checkAvailability = async (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return;

    // Validate that check-in is not in the past
    const checkInDate = new Date(checkIn);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      toast.error('Fecha inválida', 'La fecha de entrada no puede ser anterior a hoy');
      setValue('checkInDate', '');
      return;
    }

    // Validate that check-out is after check-in
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      toast.error('Fecha inválida', 'La fecha de salida debe ser posterior a la fecha de entrada');
      setValue('checkOutDate', '');
      return;
    }

    setCheckingAvailability(true);
    try {
      const response = await fetch(
        `/api/reservations/availability?destinationId=${destination.id}&checkInDate=${checkIn}&checkOutDate=${checkOut}`
      );

      if (response.ok) {
        const data = await response.json();
        setAvailability(data);

        if (!data.isAvailable) {
          toast.error('No disponible', 'Las fechas seleccionadas no están disponibles. Selecciona otras fechas.');
        }
      } else {
        toast.error('Error', 'No se pudo verificar la disponibilidad');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error('Error', 'Error al verificar disponibilidad');
    } finally {
      setCheckingAvailability(false);
    }
  };

  // Watch for date changes
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      checkAvailability(checkInDate, checkOutDate);
      setCurrentStep(2); // Move to details step when dates are selected
    } else {
      setCurrentStep(1); // Reset to dates step if dates are cleared
    }
  }, [checkInDate, checkOutDate]);

  // Update step when availability is checked and price is calculated
  useEffect(() => {
    if (availability?.isAvailable && totalPrice > 0) {
      setCurrentStep(3); // Move to confirmation step
    }
  }, [availability, totalPrice]);

  const onSubmit = async (data: ReservationFormData) => {
    // Additional validations before submit
    if (!availability?.isAvailable) {
      toast.error('No disponible', 'Las fechas seleccionadas no están disponibles');
      return;
    }

    const totalPrice = calculateTotalPrice();
    if (totalPrice <= 0) {
      toast.error('Error', 'No se pudo calcular el precio. Verifica las fechas.');
      return;
    }

    // For guests, require name and email
    if (!session?.user && (!data.guestName || !data.guestEmail)) {
      toast.error('Información requerida', 'Por favor proporciona tu nombre y email para reservas sin cuenta');
      return;
    }

    setIsSubmitting(true);
    try {
      const reservationData = {
        destinationId: destination.id,
        destinationName: destination.name,
        destinationImage: destination.image,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        adults: data.adults,
        children: data.children,
        totalPrice,
        specialRequests: data.specialRequests,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const reservation = await response.json();
        toast.success('¡Reserva creada!', `Tu reserva para ${destination.name} ha sido creada exitosamente. Total: €${totalPrice}`);
        onSuccess?.(reservation);
      } else {
        const error = await response.json();
        toast.error('Error al crear reserva', error.error || 'No se pudo crear la reserva. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Error de conexión', 'Error al conectar con el servidor. Verifica tu conexión a internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Reservar {destination.name}</h2>
        <div className="flex items-center space-x-4">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <p className="text-blue-100">Destino seleccionado</p>
            <p className="font-semibold">{destination.name}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Paso {currentStep} de 3</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Fechas</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Detalles</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Confirmación</span>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Selecciona tus fechas</h3>

          <AvailabilityCalendar
            destinationId={destination.id}
            onDateSelect={(checkIn, checkOut) => {
              setValue('checkInDate', checkIn);
              setValue('checkOutDate', checkOut);
            }}
            selectedCheckIn={watch('checkInDate')}
            selectedCheckOut={watch('checkOutDate')}
          />

          {/* Date inputs as fallback/hidden */}
          <div className="hidden">
            <input
              type="date"
              {...register('checkInDate')}
              min={today}
            />
            <input
              type="date"
              {...register('checkOutDate')}
              min={checkInDate || today}
            />
          </div>

          {errors.checkInDate && (
            <p className="mt-1 text-sm text-red-600">{errors.checkInDate.message}</p>
          )}
          {errors.checkOutDate && (
            <p className="mt-1 text-sm text-red-600">{errors.checkOutDate.message}</p>
          )}
        </div>

        {/* Availability Status */}
        {checkingAvailability && (
          <div className="flex items-center space-x-2 text-blue-600">
            <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span>Verificando disponibilidad...</span>
          </div>
        )}

        {availability && !checkingAvailability && (
          <div className={`p-4 rounded-lg ${availability.isAvailable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center space-x-2">
              {availability.isAvailable ? (
                <>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800 font-medium">¡Disponible!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-red-800 font-medium">No disponible</span>
                </>
              )}
            </div>
            <p className="text-sm mt-1">
              {availability.isAvailable
                ? `${availability.availableSpots} plazas disponibles`
                : 'No hay disponibilidad para las fechas seleccionadas'
              }
            </p>
          </div>
        )}

        {/* Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adultos
            </label>
            <select
              {...register('adults', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {errors.adults && (
              <p className="mt-1 text-sm text-red-600">{errors.adults.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Niños
            </label>
            <select
              {...register('children', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 11 }, (_, i) => i).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {errors.children && (
              <p className="mt-1 text-sm text-red-600">{errors.children.message}</p>
            )}
          </div>
        </div>

        {/* Guest Information (for non-authenticated users) */}
        {!session && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Información del huésped</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  {...register('guestName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
                {errors.guestName && (
                  <p className="mt-1 text-sm text-red-600">{errors.guestName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('guestEmail')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
                {errors.guestEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.guestEmail.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peticiones especiales (opcional)
          </label>
          <textarea
            {...register('specialRequests')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Alergias, preferencias de habitación, etc."
          />
        </div>

        {/* Price Summary */}
        {totalPrice > 0 && availability?.isAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Resumen de la Reserva
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{(totalPrice * 0.8).toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="text-gray-600">Impuestos (21%):</span>
                <span className="font-medium">{(totalPrice * 0.21).toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center py-2 text-lg font-bold text-gray-900 bg-blue-100 -mx-2 px-2 py-3 rounded-lg">
                <span>Total a pagar:</span>
                <span className="text-blue-600">{totalPrice}€</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-800 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Precio incluye todos los impuestos y tasas
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          {onCancel && (
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </motion.button>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting || !availability?.isAvailable}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              `Reservar por ${totalPrice}€`
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}