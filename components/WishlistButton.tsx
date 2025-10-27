"use client";
import { useState } from 'react';

interface WishlistButtonProps {
  itemId: string;
  itemName: string;
  itemImage: string;
  itemPrice?: number;
  itemLocation?: string;
  isInWishlist: boolean;
  onToggle: (item: {
    itemId: string;
    name: string;
    image: string;
    price?: number;
    location?: string;
  }) => Promise<boolean>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function WishlistButton({
  itemId,
  itemName,
  itemImage,
  itemPrice,
  itemLocation,
  isInWishlist,
  onToggle,
  size = 'md',
  className = '',
}: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);

    try {
      await onToggle({
        itemId,
        name: itemName,
        image: itemImage,
        price: itemPrice,
        location: itemLocation,
      });
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${className} ${
        isInWishlist
          ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
          : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
      } ${isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:scale-110'}`}
    >
      <svg
        className={iconSizes[size]}
        fill={isInWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}