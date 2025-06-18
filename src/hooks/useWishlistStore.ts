// hooks/useWishlist.ts

import { useEffect, useState } from 'react';
import { ProductData } from '@/api/strapiMockApi';

// Manage the full wishlist state globally
export default function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<ProductData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlistItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product: ProductData) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  return { wishlistItems, toggleWishlist };
}

// Hook to manage wishlist status for a specific product
export function useWishlistStatus(productId: string) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      const items: ProductData[] = JSON.parse(stored);
      setIsWishlisted(items.some((item) => item.id.toString() === productId));
    }
  }, [productId]);

  const toggleWishlist = (product: ProductData) => {
    const stored = localStorage.getItem('wishlist');
    let items: ProductData[] = stored ? JSON.parse(stored) : [];

    const exists = items.find((item) => item.id === product.id);
    if (exists) {
      items = items.filter((item) => item.id !== product.id);
    } else {
      items.push(product);
    }

    localStorage.setItem('wishlist', JSON.stringify(items));
    setIsWishlisted(!exists);
  };

  return { isWishlisted, toggleWishlist };
}
