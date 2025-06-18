// src/app/bicycles/[slug]/page.tsx
// This file defines the dynamic page for individual bicycle product details.

// Import necessary React hooks if you're using client-side features
// For server components, you might not need 'useState' or 'useEffect' here.
// 'use client'; // Uncomment if you need client-side features in this component

// Import your API function to fetch product details
import { fetchProductBySlug, ProductData } from '@/api/strapiMockApi';
import NavBar from '@/components/common/NavBar'; // Assuming you want a Navbar on this page
import Footer from '@/components/common/Footer'; // Assuming you want a Footer on this page
import ScaleWrapper from '@/components/common/ScaleWrapper'; // If you use a wrapper for consistent scaling

// --- FIX: Revised ProductPageProps for better compatibility ---
// This interface defines the expected shape of the props passed to our Page component.
// Next.js App Router passes 'params' as a direct object for dynamic routes.
interface ProductPageProps {
  params: {
    slug: string; // The dynamic part of the URL, e.g., /bicycles/mountain-bike-abc -> slug is 'mountain-bike-abc'
  };
  // 'searchParams' are optional and also passed as props.
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// This is your default export for the page component.
// In Next.js App Router, pages are Server Components by default.
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  // Fetch product data based on the slug.
  // In a Server Component, you can directly use 'await' for data fetching.
  let product: ProductData | null = null;
  try {
    product = await fetchProductBySlug(slug);
  } catch (error) {
    console.error(`Failed to fetch product with slug "${slug}":`, error);
  }

  // If no product is found, you might want to display a 404 message or redirect.
  if (!product) {
    return (
      <ScaleWrapper>
        <NavBar />
        <main className="pt-[120px] px-4 md:px-8 lg:px-16 py-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold">Product Not Found</h1>
            <p className="text-lg mt-4">The bicycle you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </ScaleWrapper>
    );
  }

  // Render your product details if a product is found
  return (
    <ScaleWrapper>
      <NavBar />
      <main className="pt-[120px] px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-4xl font-bold mb-4">{product.attributes.productName}</h1>
        <p className="text-xl text-gray-700 mb-6">${product.attributes.price.toFixed(2)}</p>

        {/* Display product image */}
        {product.attributes.productImage?.data?.attributes?.url && (
          <img
            src={product.attributes.productImage.data.attributes.url}
            alt={product.attributes.productName}
            className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md mb-8"
          />
        )}

        <h2 className="text-2xl font-semibold mb-3">Description</h2>
        <p className="text-gray-800 leading-relaxed mb-6">{product.attributes.description}</p>

        {/* You can add more product details here (e.g., detailedDescription, gallery, specs) */}
        {product.attributes.detailedDescription && (
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Detailed Description</h2>
                <p className="text-gray-800 leading-relaxed">{product.attributes.detailedDescription}</p>
            </div>
        )}

        {/* Example for specifications, if they exist */}
        {product.attributes.specifications && Object.keys(product.attributes.specifications).length > 0 && (
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Specifications</h2>
                <ul className="list-disc list-inside text-gray-800">
                    {Object.entries(product.attributes.specifications).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                </ul>
            </div>
        )}

        {/* More product attributes can be displayed here */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Brand:</strong> {product.attributes.brand}</div>
            <div><strong>Color:</strong> {product.attributes.color}</div>
            <div><strong>Age Range:</strong> {product.attributes.ageRange}</div>
            <div><strong>Gender:</strong> {product.attributes.gender}</div>
            <div><strong>Height:</strong> {product.attributes.height}</div>
            <div><strong>Type:</strong> {product.attributes.type}</div>
            <div><strong>Rating:</strong> {product.attributes.rating} / 5</div>
        </div>

      </main>
      <Footer />
    </ScaleWrapper>
  );
}

// Optional: If you need to generate static paths for SSG (Static Site Generation)
// This is useful for pre-rendering pages at build time.
// export async function generateStaticParams() {
//   // Fetch all slugs from your API
//   // Make sure fetchProducts is defined in strapiMockApi.ts and returns ProductData[]
//   const productsResponse = await fetchProducts();
//   const slugs = productsResponse.data.map(product => ({
//     slug: product.attributes.slug,
//   }));
//   return slugs;
// }