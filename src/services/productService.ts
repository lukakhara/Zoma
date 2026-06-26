// src/services/productService.ts
const API_URL = import.meta.env.VITE_API_URL;


export const getProducts = async (lang: string, category?: string) => {
  const params = new URLSearchParams({ lang });
  if (category) params.append('category', category);
  const res = await fetch(`${API_URL}/api/products?${params}`);
  return res.json();
};

export const getProduct = async (slug: string, lang: string) => {
  const res = await fetch(`${API_URL}/api/products/${slug}?lang=${lang}`);
  return res.json();
};

export const getCategories = async (lang: string) => {
  const res = await fetch(`${API_URL}/api/categories?lang=${lang}`);
  return res.json();
};