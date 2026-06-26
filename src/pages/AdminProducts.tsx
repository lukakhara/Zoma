// pages/admin/AdminProducts.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('/api/admin/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(prev => prev.filter((p: any) => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={() => navigate('/admin/products/new')}>
          + Add Product
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Variants</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p.id}>
              <td>{p.translations?.[0]?.name}</td>
              <td>{p.category}</td>
              <td>{p.variants?.length}</td>
              <td>
                <button onClick={() => navigate(`/admin/products/${p.id}/edit`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}