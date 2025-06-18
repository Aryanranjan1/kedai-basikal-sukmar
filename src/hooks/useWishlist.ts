// hooks/useWishlist.ts
import { useState, useEffect } from 'react';

const WISHLIST_KEY = 'wishlist';

function getWishlistFromLocalStorage(): any[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function useWishlistStatus(productId: string) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = getWishlistFromLocalStorage();
    setIsWishlisted(wishlist.some(item => item.id === productId));
  }, [productId]);

  const toggleWishlist = (product: any) => {
    const wishlist = getWishlistFromLocalStorage();
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    const updatedWishlist = isAlreadyInWishlist
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    setIsWishlisted(!isAlreadyInWishlist);
  };

  return { isWishlisted, toggleWishlist };
}

// ✅ This hook returns the full list and toggle function (for WishlistSection)
export default function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    setWishlistItems(getWishlistFromLocalStorage());
  }, []);

  const toggleWishlist = (product: any) => {
    const current = getWishlistFromLocalStorage();
    const exists = current.some(item => item.id === product.id);
    const updated = exists
      ? current.filter(item => item.id !== product.id)
      : [...current, product];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlistItems(updated);
  };

  return { wishlistItems, toggleWishlist };
}
