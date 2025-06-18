// src/components/ProductList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

type Props = {
  products: Product[];
  onDelete: (id: number) => void;
};

export default function ProductList({ products, onDelete }: Props) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 w-full rounded"
      />

      {paginated.map((product) => (
        <div key={product.id} className="border p-4 rounded flex justify-between items-center">
          <div>
            <p className="font-bold">{product.name}</p>
            <p>RM {product.price}</p>
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mt-2"
            />
          </div>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">{currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
