// src/app/products/[productId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
// Removed: useParams - you are getting params from props, not the hook
// If you still need other URL params dynamically in client-side code, useParams() might be needed for those.

// --- Common Components (Absolute Paths - assuming tsconfig/jsconfig is correct) ---
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';
import FAQSection from '@/components/common/FAQSection';

// --- Section Components (Absolute Paths) ---
import RecommendedProducts from '@/components/sections/RecommendedProducts';
import WhyChooseCyclingSection from '@/components/sections/WhyChooseCyclingSection';

// --- API Imports ---
import { fetchProductBySlug } from '@/api/strapiMockApi';
import type { ProductData } from '@/api/strapiMockApi'; // Ensure ProductData type is correct

// --- Page Specific Components (Relative Path for robustness within route segment) ---
import ProductImageGallery from './components/ProductImageGallery';

// Define the type for the `params` prop
// This is crucial for TypeScript and for Next.js to correctly infer types.
// We're explicitly typing it as an object directly, as it's a client component.
interface ProductPageParams {
  productId: string;
}

interface ProductPageProps {
  // We're keeping `params` as a direct object type here
  // as React.use() is not typically for client components.
  // The warning is a bit ambiguous for this specific scenario,
  // but if it's treated as a Promise by Next.js's internal type checking,
  // this won't directly resolve it without a pattern change.
  params: ProductPageParams;
}

export default function ProductPage({ params }: ProductPageProps) {
  // If the warning persists, and you are CERTAIN it's for the `params` prop,
  // one might resort to a trick like this, but it's generally not needed for client components.
  // const resolvedParams = typeof params.then === 'function' ? await React.use(params) : params;
  // This is conceptually what React.use() does, but it's not a client-side hook
  // and would cause an error if used directly here.

  // The warning is specifically advising `React.use()`. If `params` is indeed a Promise,
  // then this component would ideally be a Server Component.
  // However, since it's explicitly marked 'use client', the `params` object should be resolved.

  // Let's stick with the standard client component pattern.
  // The `productId` is directly accessible from the `params` object passed as prop.
  const { productId } = params;


  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductBySlug(productId);
        if (!fetchedProduct) {
          notFound(); // Next.js notFound() only works in Server Components or during client-side navigation.
                      // For client-side data fetch not found, it's better to show a "Product Not Found" message.
        }
        setProduct(fetchedProduct);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) { // Ensure productId is available before fetching
      getProductDetails();
    }
  }, [productId]); // productId is a dependency of the effect

  // Client-side loading state
  if (loading) {
    return (
      <ScaleWrapper>
        <NavBar />
        <div className="flex justify-center items-center h-screen pt-[120px]">
          {/* You might want to show your Lottie loader here if you prefer client-side loading UI */}
          <p>Loading product details...</p>
        </div>
        <Footer />
      </ScaleWrapper>
    );
  }

  // Client-side error state
  if (error) {
    return (
      <ScaleWrapper>
        <NavBar />
        <div className="flex justify-center items-center h-screen pt-[120px]">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </ScaleWrapper>
    );
  }

  // Handle product not found AFTER loading is complete
  if (!product) {
      return (
          <ScaleWrapper>
              <NavBar />
              <div className="flex justify-center items-center h-screen pt-[120px]">
                  <p>Product not found.</p>
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
            <h2 className="text-2xl font-bold mb-4 lg:hidden">{product.attributes.productName}</h2>
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
            <h1 className="text-3xl font-bold mb-2 hidden lg:block">{product.attributes.productName}</h1>
            <p className="text-gray-700 text-lg mb-4">{product.attributes.description}</p>
            <p className="text-2xl font-semibold text-blue-600 mb-4">RM {product.attributes.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">{'★'.repeat(Math.round(product.attributes.rating))}</span>
              <span className="text-gray-500">({product.attributes.rating.toFixed(1)} Rating)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-6">
                <span><strong>Brand:</strong> {product.attributes.brand}</span>
                <span><strong>Color:</strong> {product.attributes.color}</span>
                <span><strong>Age Range:</strong> {product.attributes.ageRange}</span>
                <span><strong>Gender:</strong> {product.attributes.gender}</span>
                <span><strong>Type:</strong> {product.attributes.type}</span>
                {product.attributes.height && <span><strong>Height:</strong> {product.attributes.height}</span>}
            </div>

            {product.attributes.detailedDescription && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Detailed Description</h3>
                    <p className="text-gray-700">{product.attributes.detailedDescription}</p>
                </div>
            )}

            {product.attributes.specifications && Object.keys(product.attributes.specifications).length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {Object.entries(product.attributes.specifications).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              ❤️ Add to Wishlist
            </button>
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