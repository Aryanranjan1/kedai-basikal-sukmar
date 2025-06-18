// src/app/products/[productId]/components/ProductImageGallery.tsx

'use client'; // This is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Removed unused import: ProductData is not directly used in this component.
// import type { ProductData } from '@/api/strapiMockApi'; 

// You can define ProductImageData directly here, or extract it from ProductData
// For simplicity, let's define it based on how it's used:
interface ProductImageData {
  data: {
    attributes: {
      url: string;
    };
  };
}

interface ProductImageGalleryProps {
  mainProductImage: ProductImageData;
  galleryImages: ProductImageData[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainProductImage,
  galleryImages,
  productName,
}) => {
  // State to hold the currently displayed large image URL
  const [currentLargeImageUrl, setCurrentLargeImageUrl] = useState<string>(
    mainProductImage?.data?.attributes?.url || '/placeholder-product.jpg'
  );

  // State to hold the array of available thumbnails
  const [thumbnails, setThumbnails] = useState<ProductImageData[]>([]);

  // Effect to initialize thumbnails when component mounts or product data changes
  useEffect(() => {
    if (mainProductImage) {
      // Ensure the main image is always the first thumbnail displayed
      const initialThumbnails = [mainProductImage, ...galleryImages].filter(Boolean) as ProductImageData[];
      setThumbnails(initialThumbnails);
      // Also ensure the main product image is the initial large image
      setCurrentLargeImageUrl(mainProductImage.data?.attributes?.url || '/placeholder-product.jpg');
    }
  }, [mainProductImage, galleryImages]);


  // Handler for when a thumbnail is clicked
  const handleThumbnailClick = (clickedImage: ProductImageData) => {
    const clickedImageUrl = clickedImage.data?.attributes?.url;

    if (!clickedImageUrl || clickedImageUrl === currentLargeImageUrl) {
      // If clicked image is invalid or already the large one, do nothing
      return;
    }

    // Capture the image data of the current large image before changing it
    const oldLargeImage: ProductImageData = {
      data: {
        attributes: {
          url: currentLargeImageUrl
        }
      }
    };

    // Filter out the clicked image from the current thumbnails list
    // Changed 'let' to 'const' as 'updatedThumbnails' reference is not reassigned
    const updatedThumbnails = thumbnails.filter(
      (thumb) => thumb.data?.attributes?.url !== clickedImageUrl
    );

    // Add the old large image to the beginning of the updated thumbnails list (modifies in-place)
    updatedThumbnails.unshift(oldLargeImage);


    // Update the large image
    setCurrentLargeImageUrl(clickedImageUrl);
    // Update the thumbnails
    setThumbnails(updatedThumbnails);
  };


  return (
    <div className="w-full">
      {/* Big Image Frame */}
      <div className="bg-gray-200 h-[416px] flex items-center justify-center rounded-lg overflow-hidden relative">
        {currentLargeImageUrl ? (
          <Image
            src={currentLargeImageUrl}
            alt={productName || 'Product Image'}
            layout="fill" // Use fill to cover the container
            objectFit="contain" // Ensure the whole image is visible
            quality={85}
            priority={true} // Prioritize loading for the main product image
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>

      {/* Smaller Image Frames */}
      <div className="flex gap-2 mt-4 overflow-x-auto justify-center md:justify-start">
        {thumbnails.map((imgData, index) => {
          const imageUrl = imgData?.data?.attributes?.url;
          if (!imageUrl) return null; // Skip if image URL is invalid
          return (
            <div
              key={imageUrl + index} // Use URL + index for a more robust key
              className={`relative w-[59px] h-[50px] rounded-md overflow-hidden cursor-pointer
                          ${imageUrl === currentLargeImageUrl ? 'border-2 border-blue-500' : 'border border-gray-300'}
                          hover:border-blue-400 transition-all duration-200 ease-in-out`}
              onClick={() => handleThumbnailClick(imgData)}
            >
              <Image
                src={imageUrl}
                alt={`${productName} thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover" // Use cover for thumbnails
                quality={65}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageGallery;