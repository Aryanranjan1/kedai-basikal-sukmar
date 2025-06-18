// src/app/bicycles/[slug]/page.tsx
import { fetchProductBySlug } from '@/api/strapiMockApi';
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';

// Direct typing of params in the function signature often avoids PageProps type conflicts
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let product = null;
  try {
    const response = await fetchProductBySlug(slug);
    product = response.data; // Assuming response.data contains the ProductData
  } catch (error) {
    console.error(`Failed to fetch product with slug "${slug}":`, error);
  }

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

  return (
    <ScaleWrapper>
      <NavBar />
      <main className="pt-[120px] px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-4xl font-bold mb-4">{product.attributes.productName}</h1>
        <p className="text-xl text-gray-700 mb-6">${product.attributes.price.toFixed(2)}</p>

        {product.attributes.productImage?.data?.attributes?.url && (
          <img
            src={product.attributes.productImage.data.attributes.url}
            alt={product.attributes.productName}
            className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md mb-8"
          />
        )}

        <h2 className="text-2xl font-semibold mb-3">Description</h2>
        <p className="text-gray-800 leading-relaxed mb-6">{product.attributes.description}</p>

        {product.attributes.detailedDescription && (
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Detailed Description</h2>
                <p className="text-gray-800 leading-relaxed">{product.attributes.detailedDescription}</p>
            </div>
        )}

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

// Ensure ProductData is correctly imported and structured for 'response.data'
// If fetchProductBySlug's return type is not directly { data: ProductData }, adjust 'product = response.data' accordingly.