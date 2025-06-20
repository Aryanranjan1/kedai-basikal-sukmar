'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';
import FAQSection from '@/components/common/FAQSection';
import RecommendedProducts from '@/components/sections/RecommendedProducts';
import WhyChooseCyclingSection from '@/components/sections/WhyChooseCyclingSection';

import { fetchProductBySlug } from '@/api/strapiMockApi';
import type { ProductData } from '@/api/strapiMockApi';

// REMOVED: import { useWishlistStatus } from '@/hooks/useWishlist';

import ProductImageGallery from './components/ProductImageGallery';

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // REMOVED: Wishlist related state and hook usage
  // const { isWishlisted, toggleWishlist } = useWishlistStatus(String(product?.id ?? ''));

  useEffect(() => {
    if (!params || typeof params.productId !== 'string') {
      setLoading(false);
      setError('Product ID not found in URL.');
      return;
    }

    const productId = params.productId as string;

    const getProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductBySlug(productId);
        setProduct(fetchedProduct);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [params]);

  if (loading) {
    return (
      <ScaleWrapper>
        <NavBar />
        <div className="flex justify-center items-center h-screen pt-[120px]">
          <p>Loading product details...</p>
        </div>
        <Footer />
      </ScaleWrapper>
    );
  }

  if (error || !product) {
    return (
      <ScaleWrapper>
        <NavBar />
        <div className="flex justify-center items-center h-screen pt-[120px]">
          <p className="text-red-500">{error || 'Product not found.'}</p>
        </div>
        <Footer />
      </ScaleWrapper>
    );
  }

  return (
    <ScaleWrapper>
      <NavBar />
      <main className="pt-[150px] px-4 md:px-8 lg:px-16 py-8">
        <section className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4 lg:hidden">
              {product.attributes.productName}
            </h2>
            {product.attributes.productImage ? (
              <ProductImageGallery
                mainProductImage={product.attributes.productImage}
                galleryImages={product.attributes.galleryImages || []}
                productName={product.attributes.productName}
              />
            ) : (
              <div className="bg-gray-200 h-[416px] flex items-center justify-center text-gray-500 rounded-lg">
                No Image Available
              </div>
            )}
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2 hidden lg:block">
              {product.attributes.productName}
            </h1>
            <p className="text-gray-700 text-lg mb-4">{product.attributes.description}</p>
        
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">
                {'★'.repeat(Math.round(product.attributes.rating))}
              </span>
              <span className="text-gray-500">
                ({product.attributes.rating.toFixed(1)} Rating)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-6">
              <span>
                <strong>Brand:</strong> {product.attributes.brand}
              </span>
              <span>
                <strong>Color:</strong> {product.attributes.color}
              </span>
              <span>
                <strong>Age Range:</strong> {product.attributes.ageRange}
              </span>
              <span>
                <strong>Gender:</strong> {product.attributes.gender}
              </span>
              <span>
                <strong>Type:</strong> {product.attributes.type}
              </span>
              {product.attributes.height && (
                <span>
                  <strong>Height:</strong> {product.attributes.height}
                </span>
              )}
            </div>

            {product.attributes.detailedDescription && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Detailed Description</h3>
                <p className="text-gray-700">
                  {product.attributes.detailedDescription}
                </p>
              </div>
            )}

            {product.attributes.specifications &&
              Object.keys(product.attributes.specifications).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {Object.entries(product.attributes.specifications).map(
                      ([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

         
          </div>
        </section>

        <hr className="my-12 border-gray-300" />

        <RecommendedProducts />
        <WhyChooseCyclingSection />
        <FAQSection />
      </main>

      <Footer />
    </ScaleWrapper>
  );
}