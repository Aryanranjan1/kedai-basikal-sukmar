// src/api/strapiMockApi.ts

import mockData from '../data/data.json';

// --- INTERFACES (UNCHANGED) ---

export interface ProductImageItem {
    data: {
        attributes: {
            url: string;
        };
    };
}

export interface ProductAttribute {
    productName: string;
    description: string;
    price: number;
    productImage: ProductImageItem;
    isPopular: boolean;
    slug: string;
    brand: string;
    color: string;
    ageRange: string;
    gender: string;
    height: string;
    type: string;
    rating: number;
    detailedDescription?: string;
    galleryImages?: ProductImageItem[];
    specifications?: Record<string, string>;
}

export interface ProductData {
    id: number;
    attributes: ProductAttribute;
}

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

export interface CategoryAttribute {
    name: string;
    slug: string;
}

export interface CategoryData {
    id: number;
    attributes: CategoryAttribute;
}

export interface StrapiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// --- FETCH FUNCTIONS ---

export const fetchProducts = async (params: URLSearchParams = new URLSearchParams()): Promise<StrapiResponse<ProductData>> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!mockData.products || !Array.isArray(mockData.products)) {
        console.error("mockData.products is missing or not an array!");
        return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } };
    }

    // --- DEBUGGING: INITIAL LOAD ---
    console.log("--- fetchProducts Debugging Trace ---");
    console.log("1. Initial products count from mockData.products (raw):", mockData.products.length);

    let filteredProducts: ProductData[] = mockData.products as unknown as ProductData[];

    // Apply Filters
    console.log("2. Parameters received for filtering:", params.toString());

    // --- UPDATED: Apply Search Query Filter for ANY keyword match ("OR" logic) ---
    const searchQuery = params.get('searchQuery'); // Look for the new 'searchQuery' param
    const keywords = searchQuery ? searchQuery.toLowerCase().split(' ').filter(k => k.length > 0) : [];

    if (keywords.length > 0) {
        const initialFilterCount = filteredProducts.length;
        filteredProducts = filteredProducts.filter(p => {
            const productNameLower = p.attributes.productName.toLowerCase();
            const descriptionLower = p.attributes.description?.toLowerCase() || '';

            // Require ANY keyword to be present in either productName or description
            return keywords.some(keyword =>
                productNameLower.includes(keyword) || descriptionLower.includes(keyword)
            );
        });
        console.log(`3a. After 'searchQuery' (ANY keyword) filter: ${initialFilterCount} -> ${filteredProducts.length} products`);
    }


    // Apply Existing filters (these should work on top of the search filter)
    if (params.get('filters[isPopular][$eq]') === 'true') {
        const initialFilterCount = filteredProducts.length;
        filteredProducts = filteredProducts.filter(p => p.attributes.isPopular === true);
        console.log(`3b. After 'isPopular' filter (if applied): ${initialFilterCount} -> ${filteredProducts.length} products`);
    }

    const applyMultiSelectFilter = (paramKey: string, attributeName: keyof ProductAttribute) => {
        const values = params.getAll(`filters[${paramKey}][$in]`);
        if (values.length > 0) {
            const initialFilterCount = filteredProducts.length;
            filteredProducts = filteredProducts.filter(p => {
                const attrValue = p.attributes[attributeName];
                // Ensure attribute value is a string and is included in the filter values
                return typeof attrValue === 'string' && values.includes(attrValue);
            });
            console.log(`3c. After '${paramKey}' filter (if applied): ${initialFilterCount} -> ${filteredProducts.length} products`);
        }
    };

    applyMultiSelectFilter('brand', 'brand');
    applyMultiSelectFilter('color', 'color');
    applyMultiSelectFilter('ageRange', 'ageRange');
    applyMultiSelectFilter('type', 'type');

    const genderFilter = params.get('filters[gender][$eq]');
    if (genderFilter) {
        const initialFilterCount = filteredProducts.length;
        filteredProducts = filteredProducts.filter(p => p.attributes.gender === genderFilter);
        console.log(`3d. After 'gender' filter (if applied): ${initialFilterCount} -> ${filteredProducts.length} products`);
    }

    const minPriceFilter = params.get('filters[price][$gte]');
    const maxPriceFilter = params.get('filters[price][$lte]');

    if (minPriceFilter) {
        const initialFilterCount = filteredProducts.length;
        const minPrice = parseFloat(minPriceFilter);
        filteredProducts = filteredProducts.filter(p => p.attributes.price >= minPrice);
        console.log(`3e. After 'minPrice' filter (if applied): ${initialFilterCount} -> ${filteredProducts.length} products`);
    }
    if (maxPriceFilter) {
        const initialFilterCount = filteredProducts.length;
        const maxPrice = parseFloat(maxPriceFilter);
        filteredProducts = filteredProducts.filter(p => p.attributes.price <= maxPrice);
        console.log(`3f. After 'maxPrice' filter (if applied): ${initialFilterCount} -> ${filteredProducts.length} products`);
    }

    // --- DEBUGGING: AFTER ALL FILTERS ---
    console.log("4. Products count AFTER ALL filters applied (pre-sort):", filteredProducts.length);

    // Sorting Logic - ONLY apply if NO search query is active,
    // as client-side will handle relevance sort otherwise.
    const sortParam = params.get('sort');
    if (sortParam && !searchQuery) { // Do not apply API sort if search query is active
        const [sortField, sortDirection] = sortParam.split(':');
        filteredProducts.sort((a, b) => {
            const fieldA = a.attributes[sortField as keyof ProductAttribute] as any;
            const fieldB = b.attributes[sortField as keyof ProductAttribute] as any;

            if (typeof fieldA === 'number' && typeof fieldB === 'number') {
                return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
            }
            if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            }
            return 0;
        });
        console.log(`5. Products sorted by (API): ${sortField} ${sortDirection}`);
    } else if (searchQuery) {
        console.log("5. API sorting skipped because a 'searchQuery' is active (client will handle relevance sort).");
    } else {
        console.log("5. No API sorting param provided.");
    }

    // Pagination Logic
    const pageSize = parseInt(params.get('pagination[pageSize]') || '12', 10);
    const page = parseInt(params.get('pagination[page]') || '1', 10);

    // --- DEBUGGING: PAGINATION PARAMETERS ---
    console.log("6. Pagination Parameters:");
    console.log(`    - Requested pageSize: ${params.get('pagination[pageSize]')} (parsed: ${pageSize})`);
    console.log(`    - Requested page: ${params.get('pagination[page]')} (parsed: ${page})`);


    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // --- DEBUGGING: FINAL SLICE RESULT ---
    console.log("7. Pagination Calculation:");
    console.log(`    - Calculated startIndex: ${startIndex}`);
    console.log(`    - Calculated endIndex: ${endIndex}`);
    console.log(`    - Final products count AFTER pagination slicing: ${paginatedProducts.length}`);
    console.log(`    - Total products for pageCount calculation (filtered and sorted by API if no search): ${filteredProducts.length}`);
    console.log(`    - Calculated pageCount: ${Math.ceil(filteredProducts.length / pageSize)}`);
    console.log("--- End fetchProducts Debugging Trace ---");


    return {
        data: paginatedProducts,
        meta: {
            pagination: {
                page,
                pageSize,
                pageCount: Math.ceil(filteredProducts.length / pageSize),
                total: filteredProducts.length,
            },
        },
    };
};

// --- REST OF YOUR FETCH FUNCTIONS (UNCHANGED) ---

export const fetchPopularProducts = async (limit: number = 6): Promise<StrapiResponse<ProductData>> => {
    const params = new URLSearchParams();
    params.set('filters[isPopular][$eq]', 'true');
    params.set('pagination[pageSize]', limit.toString());
    params.set('pagination[page]', '1');
    params.set('sort', 'rating:desc');
    return fetchProducts(params);
};

export const fetchBanners = async (): Promise<StrapiResponse<BannerData>> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!mockData.banners || !Array.isArray(mockData.banners)) {
        console.error("mockData.banners is missing or not an array!");
        return {
            data: [],
            meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
        };
    }

    return {
        data: mockData.banners as BannerData[],
        meta: {
            pagination: {
                page: 1,
                pageSize: mockData.banners.length,
                pageCount: 1,
                total: mockData.banners.length,
            },
        },
    };
};

export const fetchCategories = async (): Promise<StrapiResponse<CategoryData>> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!mockData.categories || !Array.isArray(mockData.categories)) {
        console.error("mockData.categories is missing or not an array!");
        return {
            data: [],
            meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
        };
    }

    return {
        data: mockData.categories as CategoryData[],
        meta: {
            pagination: {
                page: 1,
                pageSize: mockData.categories.length,
                pageCount: 1,
                total: mockData.categories.length,
            },
        },
    };
};

export const fetchFilterOptions = async (filterType?: string): Promise<string[] | { [key: string]: string[] }> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const products = (mockData.products || []) as unknown as ProductData[];

    const extractUniqueValues = (key: keyof ProductAttribute): string[] => {
        const values = products.map(p => p.attributes[key])
                               .filter(value => value !== undefined && value !== null && value !== '');
        return Array.from(new Set(values as string[])).sort();
    };

    const allOptions = {
        brands: extractUniqueValues('brand'),
        colors: extractUniqueValues('color'),
        ageRanges: extractUniqueValues('ageRange'),
        genders: extractUniqueValues('gender'),
        heights: extractUniqueValues('height'),
        types: extractUniqueValues('type'),
    };

    if (filterType && allOptions.hasOwnProperty(filterType)) {
        return (allOptions as any)[filterType] || [];
    }

    return allOptions;
};

export const fetchProductBySlug = async (slug: string): Promise<ProductData | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!mockData.products || !Array.isArray(mockData.products)) {
        return null;
    }
    const product = (mockData.products as unknown as ProductData[]).find(p => p.attributes.slug === slug);
    return product || null;
};

// --- New: API for Contact Email ---
// This variable will act as our "database" for the editable email.
// In a real application, this would be fetched from/stored in a persistent backend.
let CONTACT_EMAIL = 'ashu13112003@gmail.com'; // Default editable email

/**
 * Simulates fetching the contact email from a backend.
 * @returns {Promise<string>} The current contact email address.
 */
export const fetchContactEmail = async (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(CONTACT_EMAIL);
        }, 200); // Simulate network delay
    });
};

/**
 * Simulates updating the contact email on the backend.
 * @param {string} newEmail The new email address to set.
 * @returns {Promise<string>} The newly set contact email address.
 * @throws {Error} If the email format is invalid.
 */
export const updateContactEmail = async (newEmail: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Basic email format validation
            if (newEmail && newEmail.includes('@') && newEmail.includes('.')) {
                CONTACT_EMAIL = newEmail; // Update the "database"
                resolve(CONTACT_EMAIL);
            } else {
                reject(new Error('Invalid email format.'));
            }
        }, 300); // Simulate network delay
    });
};