// pages/admin/AdminProducts.tsx
//
// Admin product management page.
// Shows a paginated table (5 products per page, fetched from the backend —
// never the full catalog) with search/filter, inline quick-edit, delete,
// and an "add product" modal.

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddProductModal from "./AddProductModal";
import { getCsrfToken } from "../../lib/csrf";

// ── Types aligned to your DB schema ──────────────────────────────────────────
// These mirror the shape returned by the backend for a single product,
// including its translations (EN/KA), variants (price/stock/etc per SKU),
// category, and images.

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

// Shape of the paginated response from GET /api/admin/products.
// `stats` are aggregate counts across the WHOLE catalog (not just this page),
// computed server-side with SQL COUNT() — this is what keeps the stat cards
// accurate even though we only ever fetch 5 rows of actual product data.
interface ProductsPage {
  products: Product[];
  totalCount: number; // total products matching current filters (for pagination controls)
  stats: {
    total: number;
    active: number;
    lowStock: number;
    outOfStock: number;
  };
}

const PAGE_SIZE = 5;

// ── Helpers ───────────────────────────────────────────────────────────────────
// Small pure functions for pulling display values out of the nested
// translations/variants/category structures.

const getTranslation = (
  translations: ProductTranslation[],
  lang: "en" | "ka",
) => translations.find((t) => t.lang === lang)?.name ?? "—";

// A product can have multiple variants (e.g. different bottle sizes) — the
// table's quick-edit only edits the first one, since a full multi-variant
// editor lives on the "Full edit" page instead.
const getBaseVariant = (variants: ProductVariant[]) => variants[0] ?? null;

const getFinalPrice = (price: number, discount: number) =>
  +(price * (1 - discount / 100)).toFixed(2);

const getTotalStock = (variants: ProductVariant[]) =>
  variants.reduce((sum, v) => sum + v.stock, 0);

const getCategoryName = (category: Category | null, lang: "en" | "ka" = "en") =>
  category?.translations.find((t) => t.lang === lang)?.name ?? "—";

// ── Sub-components ────────────────────────────────────────────────────────────

// Small metric tile used in the stats row at the top of the page.
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-medium ${color ?? "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

// Green "Active" / gray "Inactive" pill shown in the Status column.
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

// Stock indicator — red "out of stock", amber "low" (under 10), or plain
// number otherwise. Purely a display helper, no side effects.
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

// Prev/Next pagination control shown below the table.
// Purely presentational — the parent owns the `page` state and passes down
// what to do when the arrows are clicked.
function Pagination({
  page,
  totalCount,
  pageSize,
  onPrev,
  onNext,
}: {
  page: number;
  totalCount: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-xs text-gray-400">
        Showing {totalCount === 0 ? 0 : (page - 1) * pageSize + 1}–
        {Math.min(page * pageSize, totalCount)} of {totalCount}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-md text-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded-md text-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Inline edit row ───────────────────────────────────────────────────────────
// Replaces a normal table row with editable inputs when "quick edit" (✎) is
// clicked. Keeps its own local draft state (`buf`) and only calls `onSave`
// once the user confirms — nothing is sent to the server on every keystroke.

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

  // Local draft, seeded from the product's current values.
  const [buf, setBuf] = useState<EditBuf>({
    name_en: getTranslation(product.translations, "en"),
    name_ka: getTranslation(product.translations, "ka"),
    slug: product.slug,
    price: base?.price ?? 0,
    discount: base?.discount ?? 0,
    stock: getTotalStock(product.variants),
    status: product.status,
  });

  // Generic field setter — number inputs get coerced to a number,
  // everything else stays a string.
  const set =
    (field: keyof EditBuf) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.type === "number" ? +e.target.value : e.target.value;
      setBuf((prev) => ({ ...prev, [field]: val }));
    };

  const inputCls =
    "w-full bg-white border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";

  return (
    <tr className="bg-blue-50/40">
      {/* thumbnail — not editable inline, only shown for context */}
      <td className="px-3 py-2">
        <div className="w-9 h-9 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
          img
        </div>
      </td>

      {/* name — both languages editable at once here, unlike the two-step
          modal used for creating a new product */}
      <td className="px-3 py-2 space-y-1">
        <input
          className={inputCls}
          value={buf.name_en}
          onChange={set("name_en")}
          placeholder="Name EN"
        />
        <input
          className={inputCls}
          value={buf.name_ka}
          onChange={set("name_ka")}
          placeholder="სახელი KA"
        />
      </td>

      {/* slug */}
      <td className="px-3 py-2">
        <input
          className={`${inputCls} font-mono text-xs`}
          value={buf.slug}
          onChange={set("slug")}
        />
      </td>

      {/* category — intentionally read-only here; changing category is
          reserved for the full edit page, since it may involve other
          side effects (e.g. re-slugging, category-specific fields) */}
      <td className="px-3 py-2 text-sm text-gray-500">
        {getCategoryName(product.category)}
      </td>

      {/* price */}
      <td className="px-3 py-2">
        <input
          className={inputCls}
          type="number"
          step="0.01"
          min="0"
          value={buf.price}
          onChange={set("price")}
        />
      </td>

      {/* discount */}
      <td className="px-3 py-2">
        <input
          className={inputCls}
          type="number"
          min="0"
          max="100"
          value={buf.discount}
          onChange={set("discount")}
        />
      </td>

      {/* stock */}
      <td className="px-3 py-2">
        <input
          className={inputCls}
          type="number"
          min="0"
          value={buf.stock}
          onChange={set("stock")}
        />
      </td>

      {/* status */}
      <td className="px-3 py-2">
        <select
          className={inputCls}
          value={buf.status}
          onChange={set("status")}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>

      {/* confirm / cancel */}
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

  // "Add product" modal visibility
  const [showAddModal, setShowAddModal] = useState(false);

  // Current page's products (max PAGE_SIZE items) and catalog-wide stats —
  // these come from ONE backend call per page load, not a full-catalog fetch.
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, lowStock: 0, outOfStock: 0 });
  const [totalCount, setTotalCount] = useState(0); // total rows matching current filters, for pagination

  // Category list for the filter dropdown and the add-product modal —
  // small, rarely-changing list, so it's fine to fetch in full.
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Pagination + filter state. Changing any of these triggers a refetch
  // from the backend — filtering happens server-side, not on the client,
  // since the client only ever holds one page's worth of products.
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Whenever the search box or either filter changes, jump back to page 1 —
  // otherwise you could be sitting on page 4 of an old filter result set
  // that no longer has 4 pages under the new filter.
  useEffect(() => {
    setPage(1);
  }, [search, filterCat, filterStatus]);

  // Fetches exactly one page of products (PAGE_SIZE rows) plus catalog-wide
  // stats, from the backend — re-runs whenever page/search/filters change.
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });
      if (search) params.set("search", search);
      if (filterCat) params.set("category", filterCat);
      if (filterStatus) params.set("status", filterStatus);

      const [prodRes, catRes] = await Promise.all([
        fetch(`/api/admin/products?${params.toString()}`, { credentials: "include" }),
        fetch("/api/categories", { credentials: "include" }),
      ]);

      if (!prodRes.ok) {
        if (prodRes.status === 401 || prodRes.status === 403) {
          throw new Error("You're not authorized to view admin products. Please log in as an admin.");
        }
        throw new Error(`Failed to load products (${prodRes.status})`);
      }
      if (!catRes.ok) {
        throw new Error(`Failed to load categories (${catRes.status})`);
      }

      const page_data: ProductsPage = await prodRes.json();
      const cats = await catRes.json();

      setProducts(Array.isArray(page_data.products) ? page_data.products : []);
      setTotalCount(page_data.totalCount ?? 0);
      setStats(
        page_data.stats ?? { total: 0, active: 0, lowStock: 0, outOfStock: 0 },
      );
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, filterCat, filterStatus]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Deletes a product, then simply reloads the current page — simpler and
  // more correct than trying to patch local state, since deleting the last
  // item on a page should also pull in whatever was on the next page.
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      const token = await getCsrfToken();
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "x-csrf-token": token },
      });
      if (!res.ok) {
        showToast("Delete failed");
        return;
      }
      showToast("Product deleted");
      await loadProducts();
    } catch {
      showToast("Delete failed");
    }
  };

  // Saves an inline quick-edit, then reloads the current page so stats and
  // any filter-affecting fields (e.g. status) stay in sync with the server.
  const handleSave = useCallback(
    async (id: number, buf: EditBuf) => {
      try {
        const token = await getCsrfToken();
        const res = await fetch(`/api/admin/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": token,
          },
          credentials: "include",
          body: JSON.stringify({
            slug: buf.slug,
            status: buf.status,
            translations: [
              { lang: "en", name: buf.name_en },
              { lang: "ka", name: buf.name_ka },
            ],
            variant: { price: buf.price, discount: buf.discount, stock: buf.stock },
          }),
        });
        if (!res.ok) {
          showToast("Save failed");
          return;
        }
        setEditId(null);
        showToast("Product saved");
        await loadProducts();
      } catch {
        showToast("Save failed");
      }
    },
    [loadProducts],
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page header + "Add product" trigger */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-medium text-gray-900">Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
        >
          + Add product
        </button>
      </div>

      {/* Stat cards — these reflect the ENTIRE catalog (server-computed
          aggregates), not just the 5 rows currently on screen */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Total products" value={stats.total} />
        <StatCard label="Active" value={stats.active} color="text-green-700" />
        <StatCard label="Low stock" value={stats.lowStock} color="text-amber-600" />
        <StatCard label="Out of stock" value={stats.outOfStock} color="text-red-600" />
      </div>

      {/* Search + category/status filters — these are sent to the backend
          as query params (see loadProducts), not applied locally */}
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

      {/* Error banner — shown instead of silently rendering an empty table
          when the load fails (e.g. not authorized, server error) */}
      {loadError && <p className="text-red-500 text-sm mb-3">{loadError}</p>}

      {/* Product table — always at most PAGE_SIZE (5) rows */}
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

            {!loading && !loadError && products.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-10 text-center text-sm text-gray-400">
                  No products found
                </td>
              </tr>
            )}

            {!loading &&
              products.map((p) => {
                const base = getBaseVariant(p.variants);
                const totalStockVal = getTotalStock(p.variants);
                const fp = base ? getFinalPrice(base.price, base.discount) : null;

                // Swap this row for the inline editor when it's the one
                // currently being edited.
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

                    {/* name (both languages shown, EN prominent) */}
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

                    {/* price — shows the discounted final price underneath
                        if a discount is set */}
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

                    {/* row actions: quick edit / full edit page / delete */}
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

      {/* Pagination controls — only ever navigates between server-fetched
          pages of PAGE_SIZE products, never loads the whole catalog */}
      {!loading && !loadError && (
        <Pagination
          page={page}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      )}

      {/* Toast — brief confirmation after save/delete/add actions */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-white border border-gray-200 shadow-md rounded-lg px-4 py-2.5 text-sm text-gray-800 z-50">
          {toast}
        </div>
      )}

      {/* Add product modal — two-step (EN details, then KA translation) */}
      {showAddModal && (
        <AddProductModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            showToast("Product added");
            // Jump back to page 1 so the newly created product is visible
            // (assuming the backend sorts newest-first).
            setPage(1);
            loadProducts();
          }}
        />
      )}
    </div>
  );
}