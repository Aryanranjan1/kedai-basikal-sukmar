// src/components/common/ProductCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
// Import ProductData from your API definitions
import { ProductData } from '../../api/strapiMockApi'; // <-- Ensure this path is correct

// Define the props interface for ProductCard
interface ProductCardProps {
  product: ProductData; // <-- ProductCard now expects a single 'product' object
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Destructure product attributes directly from the 'product' object
  // Access attributes via product.attributes
  const {
    productName,
    description,
    price,
    productImage, // This is the image object from Strapi
    slug,
    rating // Assuming you want to use the actual rating
  } = product.attributes;

  // Extract the URL from the productImage object
  const imageUrl = productImage?.data?.attributes?.url || '/path/to/default-image.webp'; // Provide a fallback image path if needed

  const descriptionSnippet = description.length > 65 ? description.substring(0, 62) + '...' : description;

  return (
    <div
      style={{
        width: '312px',
        height: '465px',
        position: 'relative',
        background: 'rgba(18, 73, 112, 0.30)',
        overflow: 'hidden',
        borderRadius: '18px',
        // --- REMOVED THE 'margin: 20px' LINE HERE ---
        // The grid's 'gap' property in StoreSection will now handle spacing between cards.
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '274px',
          height: '236px',
          left: '19px',
          top: '19px',
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.70)',
          overflow: 'hidden',
          borderRadius: '14px',
        }}
      >
        {/* Replaced <img> with <Image /> */}
        <Image
          src={imageUrl}
          alt={productName}
          fill // Make the image fill its parent div
          style={{ objectFit: 'cover' }} // Ensure the image covers the area
          sizes="(max-width: 768px) 100vw, 33vw" // Example sizes, adjust based on your card's responsiveness
          quality={75} // Optional: Adjust image quality
        />
      </div>

      {/* Product Name */}
      <div
        style={{
          width: '100%',
          left: '19px',
          top: '290px',
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Outfit',
            fontWeight: '600',
            wordWrap: 'break-word',
          }}
        >
          {productName}
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          width: '90%',
          left: '22px',
          top: '325px',
          position: 'absolute',
          color: 'white',
          fontSize: '14px',
          fontFamily: 'Outfit',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={description}
      >
        {descriptionSnippet}
      </div>

      {/* Price */}
      <div
        style={{
          left: '22px',
          top: '350px',
          position: 'absolute',
          color: '#FEC60E',
          fontSize: '18px',
          fontFamily: 'Outfit',
          fontWeight: '700',
        }}
      >
        {typeof price === 'number' ? `RM ${price.toFixed(2)}` : price}
      </div>

      {/* Dynamic Star Rating based on product.attributes.rating */}
      <div style={{ display: 'flex', position: 'absolute', left: '22px', top: '380px' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? '#FEC60E' : 'gray', fontSize: '18px', marginRight: '4px' }}>★</span>
        ))}
        {/* Optionally display the rating number */}
        {rating !== undefined && <span style={{ color: 'white', fontSize: '14px', marginLeft: '8px' }}>({rating.toFixed(1)})</span>}
      </div>

      {/* View Details Button */}
      <Link href={`/products/${slug}`} passHref>
        <button
          style={{
            width: '222px',
            height: '39px',
            left: '45px',
            top: '410px',
            position: 'absolute',
            background: '#124970',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'Outfit',
            fontWeight: '600',
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;