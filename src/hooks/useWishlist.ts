// hooks/useWishlist.ts
import { useState, useEffect } from 'react';
import { ProductData } from '../api/strapiMockApi'; // Ensure this path is correct!

const WISHLIST_KEY = 'wishlist';

function getWishlistFromLocalStorage(): ProductData[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(WISHLIST_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage:", e);
      return [];
    }
  }
  return [];
}

export function useWishlistStatus(productId: string) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = getWishlistFromLocalStorage();
    // Ensure both 'item.id' and 'productId' are treated as strings for comparison
    setIsWishlisted(wishlist.some(item => String(item.id) === String(productId)));
  }, [productId]);

  const toggleWishlist = (product: ProductData) => {
    const wishlist = getWishlistFromLocalStorage();
    // Ensure both 'item.id' and 'product.id' are treated as strings for comparison
    const isAlreadyInWishlist = wishlist.some(item => String(item.id) === String(product.id));

    const updatedWishlist = isAlreadyInWishlist
      ? wishlist.filter(item => String(item.id) !== String(product.id))
      : [...wishlist, product];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    setIsWishlisted(!isAlreadyInWishlist);
  };

  return { isWishlisted, toggleWishlist };
}

export default function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<ProductData[]>([]);

  useEffect(() => {
    setWishlistItems(getWishlistFromLocalStorage());
  }, []);

  const toggleWishlist = (product: ProductData) => {
    const currentWishlist = getWishlistFromLocalStorage();
    // Ensure both 'item.id' and 'product.id' are treated as strings for comparison
    const exists = currentWishlist.some(item => String(item.id) === String(product.id));

    const updatedWishlist = exists
      ? currentWishlist.filter(item => String(item.id) !== String(product.id))
      : [...currentWishlist, product];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
  };

  return { wishlistItems, toggleWishlist };
}