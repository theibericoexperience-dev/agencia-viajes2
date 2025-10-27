"use client";
import Image from 'next/image';
import { useWishlistStore, WishlistItem } from '../store/wishlistStore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useToast } from '../components/Toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistGrid() {
  const { data: session } = useSession();
  const { items, removeItem, clearWishlist, fetchUserWishlist, isLoading, error } = useWishlistStore();
  const [localLoading, setLocalLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (session) {
      fetchUserWishlist();
    }
  }, [session, fetchUserWishlist]);

  const handleRemoveItem = async (itemId: string) => {
    setLocalLoading(true);
    try {
      await removeItem(itemId);
      toast.success('Item eliminado', 'El destino ha sido removido de tu lista de deseos');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Error', 'No se pudo eliminar el item de la lista');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleClearWishlist = async () => {
    if (!confirm('¿Estás seguro de que quieres vaciar tu lista de deseos?')) return;

    setLocalLoading(true);
    try {
      await clearWishlist();
      toast.success('Lista vaciada', 'Todos los items han sido eliminados');
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Error', 'No se pudo vaciar la lista');
    } finally {
      setLocalLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar la lista</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
        <p className="text-gray-500">Cargando tu lista de deseos...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tu lista de deseos está vacía</h3>
        <p className="text-gray-500 mb-6">Explora nuestros destinos y guarda los que más te gusten</p>
        <a
          href="/destinations"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Explorar Destinos
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Mi Lista de Deseos ({items.length})
        </h2>
        {items.length > 0 && (
          <button
            onClick={handleClearWishlist}
            disabled={localLoading}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            Vaciar Lista
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <motion.button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={localLoading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-white transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    En Lista
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                {item.location && (
                  <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                )}
                {item.price && (
                  <p className="text-lg font-bold text-blue-600">${item.price.toLocaleString()}</p>
                )}

                <div className="mt-4 flex space-x-3">
                  <motion.a
                    href={`/destinations/${item.id}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg text-center transition-colors"
                  >
                    Ver Detalles
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Reservar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!session && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">¿Quieres guardar tu lista permanentemente?</h4>
              <p className="text-blue-700 mb-4">
                Crea una cuenta para sincronizar tu lista de deseos en todos tus dispositivos y nunca perder tus destinos favoritos.
              </p>
              <button
                onClick={() => window.location.href = '/auth/signin'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}