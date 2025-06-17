// src/types/index.ts (or src/types/strapi.d.ts)

// Interfaces for Banner Data
export interface BannerAttribute {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    altText: string;
    text_overlay?: string;
    cta_button_text?: string;
}

export interface BannerData {
    id: number;
    attributes: BannerAttribute;
}

// Interface for Product Data (assuming you'll also need this for products eventually)
export interface ProductAttribute {
  productName: string;
  description: string;
  price: number;
  productImage: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  isPopular?: boolean;
  slug: string;
  brand: string;
  color: string;
  ageRange: string;
  gender: string;
  height: string;
  type: string;
  rating: number;
  detailedDescription?: string;
  galleryImages?: {
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
  specifications?: {
    [key: string]: string; // Allows for flexible key-value pairs
  };
}

export interface ProductData {
  id: number;
  attributes: ProductAttribute;
}


// Generic Strapi-like Response Interface (for both banners and products)
export interface StrapiResponse<T> {
    data: T[]; // Array of data items (e.g., array of BannerData, or array of ProductData)
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}