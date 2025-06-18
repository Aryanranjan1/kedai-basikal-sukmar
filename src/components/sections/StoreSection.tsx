// src/components/StoreSection.tsx
'use client';
import '../../styles/pagination.css'; // Make sure this path is correct
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductCard from '../common/ProductCard'; // ProductCard is in src/components/common/
import {
    fetchProducts,
    fetchFilterOptions,
    ProductData,
} from '../../api/strapiMockApi'; // strapiMockApi is in src/api/

import debounce from 'debounce-fn';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams for Next.js App Router

const DEFAULT_PAGE_SIZE = 9; // Showing 9 products at a time

const StoreSection: React.FC = () => {
    const searchParams = useSearchParams(); // Hook to access URL search parameters
    const initialSearchQuery = searchParams.get('search') || ''; // Get 'search' param from URL

    const [products, setProducts] = useState<ProductData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0); // 0-indexed for ReactPaginate
    const [pageCount, setPageCount] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState<number>(0); // Kept and will be used
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Kept and will be used

    // Keep track of the actual search query being used for filtering
    const [activeSearchQuery, setActiveSearchQuery] = useState(initialSearchQuery);

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
    // Added for input control
    const [minPriceInput, setMinPriceInput] = useState<string>('0');
    const [maxPriceInput, setMaxPriceInput] = useState<string>('3000');


    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
    const [selectedGender, setSelectedGender] = useState<string>('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('');

    const [availableBrands, setAvailableBrands] = useState<string[]>([]);
    const [availableColors, setAvailableColors] = useState<string[]>([]);
    const [availableAgeRanges, setAvailableAgeRanges] = useState<string[]>([]);
    const [availableGenders, setAvailableGenders] = useState<string[]>([]);
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);

    // Effect to update activeSearchQuery when the URL search param changes
    // This also triggers a refetch by changing activeSearchQuery dependency in buildSearchParams
    useEffect(() => {
        const newSearchParam = searchParams.get('search') || '';
        if (newSearchParam !== activeSearchQuery) {
            setActiveSearchQuery(newSearchParam);
            setCurrentPage(0); // Reset page to 0 when search query changes due to URL change
        }
    }, [searchParams, activeSearchQuery]);


    // Function to calculate relevance score based on search keywords
    // Keywords must be lowercased for comparison
    const calculateRelevance = useCallback((productName: string, keywords: string[]): number => {
        if (!keywords || keywords.length === 0) return 0;
        const lowerCaseProductName = productName.toLowerCase();
        let score = 0;
        keywords.forEach(keyword => {
            if (lowerCaseProductName.includes(keyword)) { // Keyword is already lowercased
                score++;
            }
        });
        return score;
    }, []);


    const debouncedFetchProducts = useMemo(
        () =>
            debounce(async (params: URLSearchParams) => { // Removed 'page' parameter as it's part of params now
                setLoading(true);
                setError(null); // Clear previous errors
                try {
                    const response = await fetchProducts(params);
                    // Changed 'let' to 'const' as 'fetchedProducts' is not reassigned
                    const fetchedProducts = response.data;

                    // Client-side relevance sorting if an active search query is present
                    if (activeSearchQuery) {
                        const searchKeywords = activeSearchQuery.toLowerCase().split(' ').filter(k => k.length > 0);
                        
                        fetchedProducts.sort((a, b) => {
                            const relevanceA = calculateRelevance(a.attributes.productName, searchKeywords);
                            const relevanceB = calculateRelevance(b.attributes.productName, searchKeywords);

                            // Primary sort: by number of matching keywords (descending)
                            if (relevanceA !== relevanceB) {
                                return relevanceB - relevanceA;
                            }

                            // Secondary sort: by user's selected sort option if relevances are equal
                            if (selectedSort === 'price:asc') {
                                return a.attributes.price - b.attributes.price;
                            } else if (selectedSort === 'price:desc') {
                                return b.attributes.price - a.attributes.price;
                            } else if (selectedSort === 'productName:asc') {
                                return a.attributes.productName.localeCompare(b.attributes.productName);
                            } else if (selectedSort === 'productName:desc') {
                                return b.attributes.productName.localeCompare(a.attributes.productName);
                            } else if (selectedSort === 'rating:desc') {
                                return (b.attributes.rating || 0) - (a.attributes.rating || 0);
                            }
                            // Default sort if no specific sort or relevances are equal: by product name A-Z
                            return a.attributes.productName.localeCompare(b.attributes.productName);
                        });
                    }

                    // Set products and pagination info based on the (potentially) client-side sorted data
                    setProducts(fetchedProducts);
                    setPageCount(response.meta.pagination.pageCount); // Still rely on API's page count
                    setTotalProducts(response.meta.pagination.total); // Still rely on API's total

                } catch (err: unknown) { // Changed 'any' to 'unknown'
                    console.error("Failed to fetch products:", err);
                    // Safely access error message
                    if (err instanceof Error) {
                        setError(err.message);
                    } else if (typeof err === 'string') {
                        setError(err);
                    } else {
                        setError('An unknown error occurred.');
                    }
                } finally {
                    setLoading(false);
                }
            }, { wait: 300 }),
        [selectedSort, activeSearchQuery, calculateRelevance] // activeSearchQuery added to dependencies
    );

    const buildSearchParams = useCallback(() => {
        const params = new URLSearchParams();
        if (priceRange[0] > 0) params.set('filters[price][$gte]', priceRange[0].toString());
        if (priceRange[1] < 3000) params.set('filters[price][$lte]', priceRange[1].toString());
        if (selectedBrands.length > 0) selectedBrands.forEach(brand => params.append('filters[brand][$in]', brand));
        if (selectedColors.length > 0) selectedColors.forEach(color => params.append('filters[color][$in]', color));
        if (selectedAgeRanges.length > 0) selectedAgeRanges.forEach(range => params.append('filters[ageRange][$in]', range));
        if (selectedTypes.length > 0) selectedTypes.forEach(type => params.append('filters[type][$in]', type));
        if (selectedGender) params.set('filters[gender][$eq]', selectedGender);

        // --- NEW: Add search query to params for API to handle ---
        // The API should interpret 'searchQuery' to filter based on keywords.
        if (activeSearchQuery) {
            params.set('searchQuery', activeSearchQuery);
        }
        // --- END NEW ---

        // Add pagination parameters based on DEFAULT_PAGE_SIZE
        params.set('pagination[page]', (currentPage + 1).toString());
        params.set('pagination[pageSize]', DEFAULT_PAGE_SIZE.toString());


        return params;
    }, [priceRange, selectedBrands, selectedColors, selectedAgeRanges, selectedGender, selectedTypes, activeSearchQuery, currentPage]); // activeSearchQuery and currentPage are now dependencies


    // Effect to fetch products when page, filters, sort, or search query changes
    useEffect(() => {
        const params = buildSearchParams();
        debouncedFetchProducts(params); // Removed 'currentPage' as a separate argument
    }, [currentPage, buildSearchParams, debouncedFetchProducts]);


    // Effect to fetch filter options once on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const options = await fetchFilterOptions(); // Assuming fetchFilterOptions now returns a single object
                if (typeof options === 'object' && options !== null && !Array.isArray(options)) {
                    setAvailableBrands(options.brands || []);
                    setAvailableColors(options.colors || []);
                    setAvailableAgeRanges(options.ageRanges || []);
                    setAvailableGenders(options.genders || []);
                    setAvailableTypes(options.types || []);
                } else {
                    console.warn("fetchFilterOptions did not return the expected object format. Please check src/api/strapiMockApi.ts");
                }

            } catch (err) {
                console.error("Failed to fetch filter options:", err);
            }
        };
        fetchOptions();
    }, []); // Run once on component mount

    // Handlers for price input fields (no change to UI, just internal state)
    const handleMinPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPriceInput(e.target.value);
    };

    const handleMaxPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPriceInput(e.target.value);
    };

    const handlePriceInputBlur = () => {
        const minVal = parseInt(minPriceInput, 10);
        const maxVal = parseInt(maxPriceInput, 10);
        const newMin = isNaN(minVal) ? 0 : Math.max(0, minVal);
        const newMax = isNaN(maxVal) ? 3000 : Math.min(3000, maxVal); // Cap max price
        setPriceRange([newMin, newMax]);
        setCurrentPage(0); // Reset page on filter change
    };

    const handleCheckboxChange = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        value: string
    ) => {
        setter(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
        setCurrentPage(0); // Reset page on filter change
    };

    // Using React.ChangeEvent<HTMLSelectElement> for select
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGender(e.target.value);
        setCurrentPage(0); // Reset page on filter change
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(e.target.value);
        setCurrentPage(0); // Reset page on sort change
    };

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    const clearAllFilters = () => {
        setPriceRange([0, 3000]);
        setMinPriceInput('0');
        setMaxPriceInput('3000');
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedAgeRanges([]);
        setSelectedGender('');
        setSelectedTypes([]);
        setSelectedSort('');
        // No change to activeSearchQuery here, as it's controlled by URL.
        // If you want a button to clear URL search, you'd add:
        // window.history.replaceState({}, '', window.location.pathname);
        // and then setActiveSearchQuery('') would trigger from useEffect.
        setCurrentPage(0); // Reset to first page
    };


    // Fixed values for layout components - untouched as per request
    const sectionContentWidth = 1340; // Total width for filters + gap + products
    const filterSidebarWidth = 310;
    const mainContentGap = 32;
    const productDisplayWidth = sectionContentWidth - filterSidebarWidth - mainContentGap;
    const productCardGap = 20; // This is the gap between product cards within the grid

    return (
        <section style={{
            width: `${sectionContentWidth}px`,
            margin: '0 auto',
            paddingTop: '32px',
            paddingBottom: '32px',
            boxSizing: 'border-box'
        }}>

            <div
                style={{
                    width: '400px',
                    height: '70px',
                    margin: '42px auto 20px auto',
                    background: 'rgba(18, 73, 112, 0.20)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <h2
                    style={{
                        color: '#124970',
                        fontSize: '32px',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: '600',
                        wordWrap: 'break-word',
                        textAlign: 'center'
                    }}
                >
                    EXPLORE OUR BIKES
                </h2>
            </div>

            <div style={{ display: 'flex', gap: `${mainContentGap}px`, width: '100%' }}>
                <aside style={{ width: `${filterSidebarWidth}px`, background: '#f7fafc', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Filters</h3>
                    {/* Display active search query if any */}
                    {activeSearchQuery && (
                        <div style={{ marginBottom: '16px', padding: '12px', background: '#e2e8f0', borderRadius: '8px' }}>
                            <p style={{ fontWeight: '600', fontSize: '16px', marginBottom: '8px' }}>Active Search:</p>
                            <span style={{ fontSize: '14px', color: '#4a5568' }}>&quot;{activeSearchQuery}&quot;</span> {/* Fixed: Escaped double quotes */}
                            <button
                                onClick={() => {
                                    setActiveSearchQuery(''); // Clear the search query state
                                    setCurrentPage(0); // Reset pagination
                                    // Update URL without full page reload to remove the 'search' param
                                    const currentSearchParams = new URLSearchParams(window.location.search);
                                    currentSearchParams.delete('search');
                                    window.history.replaceState({}, '', `${window.location.pathname}?${currentSearchParams.toString()}`);
                                }}
                                style={{
                                    marginLeft: '12px',
                                    padding: '4px 8px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                    {/* Price Range Filter */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: '500', marginBottom: '8px' }}>Price Range</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="number"
                                name="minPrice"
                                value={minPriceInput}
                                onChange={handleMinPriceInputChange}
                                onBlur={handlePriceInputBlur} // Apply filter on blur
                                style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
                                placeholder="Min"
                                min="0"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                name="maxPrice"
                                value={maxPriceInput}
                                onChange={handleMaxPriceInputChange}
                                onBlur={handlePriceInputBlur} // Apply filter on blur
                                style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
                                placeholder="Max"
                                max="3000"
                            />
                        </div>
                        <p style={{ fontSize: '14px', color: '#4a5568', marginTop: '4px' }}>
                            Current: ${priceRange[0]} - ${priceRange[1]}
                        </p>
                    </div>

                    {/* Brand Filter */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: '500', marginBottom: '8px' }}>Brand</h4>
                        {availableBrands.length > 0 ? (
                            availableBrands.map(brand => (
                                <label key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', color: '#4a5568' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleCheckboxChange(setSelectedBrands, brand)}
                                        style={{ marginRight: '8px', height: '16px', width: '16px' }}
                                    />
                                    {brand}
                                </label>
                            ))
                        ) : (
                            <p style={{ fontSize: '14px', color: '#718096' }}>Loading brands...</p>
                        )}
                    </div>

                    {/* Color Filter */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: '500', marginBottom: '8px' }}>Color</h4>
                        {availableColors.length > 0 ? (
                            availableColors.map(color => (
                                <label key={color} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', color: '#4a5568' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedColors.includes(color)}
                                        onChange={() => handleCheckboxChange(setSelectedColors, color)}
                                        style={{ marginRight: '8px', height: '16px', width: '16px' }}
                                    />
                                    {color}
                                </label>
                            ))
                        ) : (
                            <p style={{ fontSize: '14px', color: '#718096' }}>Loading colors...</p>
                        )}
                    </div>

                    {/* Age Range Filter */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: '500', marginBottom: '8px' }}>Age Range</h4>
                        {availableAgeRanges.length > 0 ? (
                            availableAgeRanges.map(range => (
                                <label key={range} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', color: '#4a5568' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedAgeRanges.includes(range)}
                                        onChange={() => handleCheckboxChange(setSelectedAgeRanges, range)}
                                        style={{ marginRight: '8px', height: '16px', width: '16px' }}
                                    />
                                    {range}
                                </label>
                            ))
                        ) : (
                            <p style={{ fontSize: '14px', color: '#718096' }}>Loading age ranges...</p>
                        )}
                    </div>

                    {/* Gender Filter */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: '500', marginBottom: '8px' }}>Gender</h4>
                        <select
                            value={selectedGender}
                            onChange={handleGenderChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', color: '#4a5568' }}
                        >
                            <option value="">Any</option>
                            {availableGenders.length > 0 ? (
                                availableGenders.map(gender => (
                                    <option key={gender} value={gender}>
                                        {gender}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading genders...</option>
                            )}
                        </select>
                    </div>

                    {/* Bike Type Filter */}
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: '500', marginBottom: '8px' }}>Bike Type</h4>
                        {availableTypes.length > 0 ? (
                            availableTypes.map(type => (
                                <label key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', color: '#4a5568' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => handleCheckboxChange(setSelectedTypes, type)}
                                        style={{ marginRight: '8px', height: '16px', width: '16px' }}
                                    />
                                    {type}
                                </label>
                            ))
                        ) : (
                            <p style={{ fontSize: '14px', color: '#718096' }}>Loading bike types...</p>
                        )}
                    </div>

                    <button
                        onClick={clearAllFilters}
                        style={{
                            width: '100%',
                            padding: '10px 15px',
                            background: '#e2e8f0',
                            color: '#2d3748',
                            border: '1px solid #cbd5e0',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            marginTop: '24px',
                        }}
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Product Display Area */}
                <div style={{ width: `${productDisplayWidth}px` }}>
                    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontWeight: '500', color: '#2d3748' }}>
                            {loading ? "Loading..." : `${products.length} of ${totalProducts} products found`}
                        </p>
                        <label htmlFor="sort-by" style={{ marginRight: '8px', fontWeight: '500', color: '#2d3748' }}>Sort By:</label>
                        <select
                            id="sort-by"
                            value={selectedSort}
                            onChange={handleSortChange}
                            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '12px', color: '#4a5568' }}
                        >
                            <option value="">Default</option>
                            <option value="price:asc">Price: Low to High</option>
                            <option value="price:desc">Price: High to Low</option>
                            <option value="productName:asc">Name: A-Z</option>
                            <option value="productName:desc">Name: Z-A</option>
                            <option value="rating:desc">Rating: High to Low</option>
                        </select>
                    </div>

                    {/* Conditional Rendering based on loading, error, and products */}
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: `${productCardGap}px` }}>
                            {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
                                <div key={index} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                                    <div style={{ height: '192px', background: '#cbd5e0' }}></div>
                                    <div style={{ padding: '16px' }}>
                                        <div style={{ height: '16px', background: '#cbd5e0', borderRadius: '4px', width: '75%', marginBottom: '8px' }}></div>
                                        <div style={{ height: '12px', background: '#cbd5e0', borderRadius: '4px', width: '50%' }}></div>
                                        <div style={{ height: '16px', background: '#cbd5e0', borderRadius: '4px', width: '25%', marginTop: '16px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? ( // Display error message if present
                        <div style={{ textAlign: 'center', fontSize: '18px', color: '#ef4444', padding: '48px 0' }}>
                            Error: {error}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: `${productCardGap}px` }}>
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* --- Pagination Controls --- */}
                            <div
                                style={{
                                    marginTop: '32px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%'
                                }}
                            >
                                <ReactPaginate
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    breakLabel={'...'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination-container'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    activeClassName={'active-page'}
                                    previousClassName={'page-item previous'}
                                    nextClassName={'page-item next'}
                                    previousLinkClassName={'page-link'}
                                    nextLinkClassName={'page-link'}
                                    disabledClassName={'disabled'}
                                    breakClassName={'page-item break-me'}
                                    breakLinkClassName={'page-link'}
                                    forcePage={currentPage}
                                />
                            </div>
                        </>
                    ) : ( // No products found
                        <div style={{ textAlign: 'center', fontSize: '18px', color: '#4a5568', padding: '48px 0' }}>
                            No products found matching your criteria. Try adjusting your filters.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StoreSection;