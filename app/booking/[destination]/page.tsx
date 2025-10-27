"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ReservationForm from '../../../components/ReservationForm';
import { useToast } from '../../../components/Toast';

// Mock destination data - in a real app, this would come from an API
const destinations = [
	{
		id: '1',
		name: 'Costa del Sol',
		image: '/hero-landscape.jpg',
		price: 150,
		description: 'Hermosas playas y clima mediterráneo perfecto para unas vacaciones inolvidables.',
		highlights: ['Playas de arena fina', 'Gastronomía local', 'Actividades acuáticas', 'Clima excelente']
	},
	{
		id: '2',
		name: 'Sierra Nevada',
		image: '/hero.jpg',
		price: 120,
		description: 'Descubre la majestuosidad de las montañas andaluzas con actividades de invierno y naturaleza.',
		highlights: ['Estación de esquí', 'Senderismo', 'Vistas panorámicas', 'Pueblos pintorescos']
	},
	{
		id: '3',
		name: 'Ibiza',
		image: '/iberico-hero.jpg',
		price: 200,
		description: 'La isla blanca te espera con sus calas escondidas y vida nocturna legendaria.',
		highlights: ['Vida nocturna', 'Cala escondidas', 'Gastronomía mediterránea', 'Actividades culturales']
	}
];

export default function BookingPage() {
	const params = useParams();
	const router = useRouter();
	const { data: session, status } = useSession();
	const [destination, setDestination] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const toast = useToast();

	useEffect(() => {
		if (!params?.destination) {
			toast.error('Destino no encontrado', 'El destino solicitado no existe');
			router.push('/destinations');
			return;
		}

		const destinationId = params.destination as string;
		const foundDestination = destinations.find(d => d.id === destinationId);

		if (foundDestination) {
			setDestination(foundDestination);
		} else {
			toast.error('Destino no encontrado', 'El destino solicitado no existe');
			router.push('/destinations');
			return;
		}

		setLoading(false);
	}, [params?.destination, router]);

	const handleReservationSuccess = (reservation: any) => {
		// Redirect to confirmation page or dashboard
		router.push(`/dashboard?tab=reservations&highlight=${reservation.id}`);
	};

	const handleCancel = () => {
		router.back();
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
					<p className="text-gray-600">Cargando destino...</p>
				</div>
			</div>
		);
	}

	if (!destination) {
	
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Reserva tu viaje a {destination.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Completa el formulario a continuación para asegurar tu lugar en este destino increíble.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
              {/* Hero Image */}
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-bold mb-1">{destination.name}</h2>
                  <p className="text-lg">Desde {destination.price}€/persona</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre este destino</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>

                <h4 className="font-medium text-gray-900 mb-2">Lo que incluye:</h4>
                <ul className="space-y-2">
                  {destination.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Price Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Información de precios</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Precio base por persona:</span>
                      <span>{destination.price}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niños (hasta 12 años):</span>
                      <span>30% descuento</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      * Los precios pueden variar según temporada y disponibilidad
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h5 className="font-medium text-gray-900">Cancelación gratuita</h5>
                      <p className="text-sm text-gray-600">Hasta 48h antes del check-in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h5 className="font-medium text-gray-900">Confirmación inmediata</h5>
                      <p className="text-sm text-gray-600">Reserva confirmada al instante</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h5 className="font-medium text-gray-900">Soporte 24/7</h5>
                      <p className="text-sm text-gray-600">Asistencia durante tu viaje</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <ReservationForm
              destination={destination}
              onSuccess={handleReservationSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}