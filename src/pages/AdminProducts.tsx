// pages/admin/AdminProducts.tsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ── Types aligned to your DB schema ──────────────────────────────────────────

interface ProductTranslation {
  lang: "en" | "ka";
  name: string;
  description?: string;
}

interface ProductVariant {
  id: number;
  sku: string;
  capacity_ml: number;
  price: number;
  discount: number;
  stock: number;
}

interface Category {
  id: number;
  translations: { lang: string; name: string }[];
}

interface Product {
  id: number;
  slug: string;
  status: "active" | "inactive";
  translations: ProductTranslation[];
  variants: ProductVariant[];
  category: Category | null;
  images?: { url: string; is_primary: boolean }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const getTranslation = (translations: ProductTranslation[], lang: "en" | "ka") =>
  translations.find((t) => t.lang === lang)?.name ?? "—";

const getBaseVariant = (variants: ProductVariant[]) =>
  variants[0] ?? null;

const getFinalPrice = (price: number, discount: number) =>
  +(price * (1 - discount / 100)).toFixed(2);

const getTotalStock = (variants: ProductVariant[]) =>
  variants.reduce((sum, v) => sum + v.stock, 0);

const getCategoryName = (category: Category | null, lang: "en" | "ka" = "en") =>
  category?.translations.find((t) => t.lang === lang)?.name ?? "—";

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-medium ${color ?? "text-gray-900"}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: "active" | "inactive" }) {
  return status === "active" ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
      ✓ Active
    </span>
  ) : (
    <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      Inactive
    </span>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
        Out of stock
      </span>
    );
  if (stock < 10)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
        ⚠ {stock} low
      </span>
    );
  return <span className="text-sm text-gray-600">{stock}</span>;
}

// ── Inline edit row ───────────────────────────────────────────────────────────

interface EditBuf {
  name_en: string;
  name_ka: string;
  slug: string;
  price: number;
  discount: number;
  stock: number;
  status: "active" | "inactive";
}

function EditRow({
  product,
  categories,
  onSave,
  onCancel,
}: {
  product: Product;
  categories: Category[];
  onSave: (id: number, buf: EditBuf) => void;
  onCancel: () => void;
}) {
  const base = getBaseVariant(product.variants);
  const [buf, setBuf] = useState<EditBuf>({
    name_en: getTranslation(product.translations, "en"),
    name_ka: getTranslation(product.translations, "ka"),
    slug: product.slug,
    price: base?.price ?? 0,
    discount: base?.discount ?? 0,
    stock: getTotalStock(product.variants),
    status: product.status,
  });

  const set = (field: keyof EditBuf) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.type === "number" ? +e.target.value : e.target.value;
    setBuf((prev) => ({ ...prev, [field]: val }));
  };

  const inputCls =
    "w-full bg-white border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";

  return (
    <tr className="bg-blue-50/40">
      {/* thumbnail */}
      <td className="px-3 py-2">
        <div className="w-9 h-9 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
          img
        </div>
      </td>

      {/* name */}
      <td className="px-3 py-2 space-y-1">
        <input className={inputCls} value={buf.name_en} onChange={set("name_en")} placeholder="Name EN" />
        <input className={inputCls} value={buf.name_ka} onChange={set("name_ka")} placeholder="სახელი KA" />
      </td>

      {/* slug */}
      <td className="px-3 py-2">
        <input className={`${inputCls} font-mono text-xs`} value={buf.slug} onChange={set("slug")} />
      </td>

      {/* category — read-only in inline edit; full edit page handles this */}
      <td className="px-3 py-2 text-sm text-gray-500">{getCategoryName(product.category)}</td>

      {/* price */}
      <td className="px-3 py-2">
        <input className={inputCls} type="number" step="0.01" min="0" value={buf.price} onChange={set("price")} />
      </td>

      {/* discount */}
      <td className="px-3 py-2">
        <input className={inputCls} type="number" min="0" max="100" value={buf.discount} onChange={set("discount")} />
      </td>

      {/* stock */}
      <td className="px-3 py-2">
        <input className={inputCls} type="number" min="0" value={buf.stock} onChange={set("stock")} />
      </td>

      {/* status */}
      <td className="px-3 py-2">
        <select className={inputCls} value={buf.status} onChange={set("status")}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>

      {/* actions */}
      <td className="px-3 py-2">
        <div className="flex gap-1 justify-end">
          <button
            onClick={() => onSave(product.id, buf)}
            className="px-2 py-1 rounded text-xs text-green-700 hover:bg-green-50 border border-green-200"
          >
            ✓ Save
          </button>
          <button
            onClick={onCancel}
            className="px-2 py-1 rounded text-xs text-red-600 hover:bg-red-50 border border-red-200"
          >
            ✕
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminProducts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const authHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products", { headers: authHeaders }).then((r) => r.json()),
      fetch("/api/categories", { headers: authHeaders }).then((r) => r.json()),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE", headers: authHeaders });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product deleted");
  };

  const handleSave = useCallback(
    async (id: number, buf: EditBuf) => {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({
          slug: buf.slug,
          status: buf.status,
          translations: [
            { lang: "en", name: buf.name_en },
            { lang: "ka", name: buf.name_ka },
          ],
          // variant price/discount/stock update — adjust to your endpoint shape
          variant: { price: buf.price, discount: buf.discount, stock: buf.stock },
        }),
      });
      if (!res.ok) { showToast("Save failed"); return; }
      const updated: Product = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setEditId(null);
      showToast("Product saved");
    },
    [token]
  );

  // ── Stats ──────────────────────────────────────────────────────────────────

  const totalStock = products.reduce((s, p) => s + getTotalStock(p.variants), 0);
  const activeCount = products.filter((p) => p.status === "active").length;
  const lowStockCount = products.filter((p) => {
    const s = getTotalStock(p.variants);
    return s > 0 && s < 10;
  }).length;
  const outStockCount = products.filter((p) => getTotalStock(p.variants) === 0).length;

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = products.filter((p) => {
    const nameEn = getTranslation(p.translations, "en").toLowerCase();
    if (search && !nameEn.includes(search.toLowerCase()) && !p.slug.includes(search.toLowerCase()))
      return false;
    if (filterCat && getCategoryName(p.category) !== filterCat) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-medium text-gray-900">Products</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
        >
          + Add product
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Total products" value={products.length} />
        <StatCard label="Active" value={activeCount} color="text-green-700" />
        <StatCard label="Low stock" value={lowStockCount} color="text-amber-600" />
        <StatCard label="Out of stock" value={outStockCount} color="text-red-600" />
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or slug…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] max-w-xs border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="border border-gray-200 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={getCategoryName(c)}>
              {getCategoryName(c)}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full border-collapse text-sm" style={{ minWidth: 780 }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="w-12 px-3 py-2" />
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-44">Name (EN / KA)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-32">Slug</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-28">Category</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-24">Price (₾)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-20">Discount</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-20">Stock</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-24">Status</th>
              <th className="px-3 py-2 w-24" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-sm text-gray-400">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-10 text-center text-sm text-gray-400">
                  No products found
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((p) => {
                const base = getBaseVariant(p.variants);
                const totalStockVal = getTotalStock(p.variants);
                const fp = base ? getFinalPrice(base.price, base.discount) : null;

                if (editId === p.id)
                  return (
                    <EditRow
                      key={p.id}
                      product={p}
                      categories={categories}
                      onSave={handleSave}
                      onCancel={() => setEditId(null)}
                    />
                  );

                return (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                    {/* thumbnail */}
                    <td className="px-3 py-2">
                      {p.images?.find((i) => i.is_primary) ? (
                        <img
                          src={p.images.find((i) => i.is_primary)!.url}
                          alt=""
                          className="w-9 h-9 rounded-md object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300 text-xs">
                          img
                        </div>
                      )}
                    </td>

                    {/* name */}
                    <td className="px-3 py-2">
                      <p className="font-medium text-gray-900 truncate max-w-[160px]">
                        {getTranslation(p.translations, "en")}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">
                        {getTranslation(p.translations, "ka")}
                      </p>
                    </td>

                    {/* slug */}
                    <td className="px-3 py-2">
                      <span className="font-mono text-xs text-gray-400 truncate block max-w-[120px]">
                        {p.slug}
                      </span>
                    </td>

                    {/* category */}
                    <td className="px-3 py-2 text-gray-700">{getCategoryName(p.category)}</td>

                    {/* price */}
                    <td className="px-3 py-2 tabular-nums">
                      <span className="text-gray-900">₾{base?.price.toFixed(2) ?? "—"}</span>
                      {base && base.discount > 0 && (
                        <p className="text-xs text-gray-400">→ ₾{fp!.toFixed(2)}</p>
                      )}
                    </td>

                    {/* discount */}
                    <td className="px-3 py-2">
                      {base?.discount ? (
                        <span className="text-amber-600 text-sm">{base.discount}%</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>

                    {/* stock */}
                    <td className="px-3 py-2">
                      <StockBadge stock={totalStockVal} />
                    </td>

                    {/* status */}
                    <td className="px-3 py-2">
                      <StatusBadge status={p.status} />
                    </td>

                    {/* actions */}
                    <td className="px-3 py-2">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => setEditId(p.id)}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                          title="Quick edit"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                          className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors text-xs"
                          title="Full edit"
                        >
                          Full
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-white border border-gray-200 shadow-md rounded-lg px-4 py-2.5 text-sm text-gray-800 z-50">
          {toast}
        </div>
      )}
    </div>
  );
}