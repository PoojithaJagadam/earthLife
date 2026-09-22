import { useState, useEffect, useCallback } from 'react';
import { fetchEcwidProducts, fetchEcwidProductById } from '../ecwid/storefront/ecwidStorefront';

/**
 * Hook to retrieve products from the live Ecwid store
 */
export function useEcwidProducts(options = {}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = options.category;
  const keyword = options.keyword;

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEcwidProducts({ category, keyword });
      setProducts(data.items || []);
      setTotal(data.total || (data.items ? data.items.length : 0));
    } catch (err) {
      console.error('Error in useEcwidProducts:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [category, keyword]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    total,
    loading,
    error,
    refetch: loadProducts
  };
}

/**
 * Hook to retrieve a single product by Ecwid ID or slug
 */
export function useEcwidProduct(idOrSlug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    if (!idOrSlug) {
      setProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const item = await fetchEcwidProductById(idOrSlug);
      setProduct(item);
    } catch (err) {
      console.error(`Error loading product (${idOrSlug}):`, err);
      setError(err.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    refetch: loadProduct
  };
}

export default useEcwidProducts;
