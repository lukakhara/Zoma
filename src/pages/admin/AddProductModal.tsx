// pages/admin/AddProductModal.tsx
import { useState } from "react";
import { getCsrfToken } from "../../lib/csrf";

interface Category {
  id: number;
  translations: { lang: string; name: string }[];
}

interface NewProductPayload {
  slug: string;
  status: "active" | "inactive";
  category_id: number | null;
  translations: { lang: "en" | "ka"; name: string; description?: string }[];
  variant: {
    sku: string;
    capacity_ml: number;
    price: number;
    discount: number;
    stock: number;
  };
}

export default function AddProductModal({
  categories,
  onClose,
  onCreated,
}: {
  categories: Category[];
  onClose: () => void;
  onCreated: (product: any) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  // step 1 — English + core product data
  const [nameEn, setNameEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [sku, setSku] = useState("");
  const [capacityMl, setCapacityMl] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [status, setStatus] = useState<"active" | "inactive">("active");

  // step 2 — Georgian translation
  const [nameKa, setNameKa] = useState("");
  const [descriptionKa, setDescriptionKa] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const validateStep1 = () => {
    if (!nameEn.trim() || !slug.trim() || !sku.trim()) {
      setError("Name (EN), slug, and SKU are required.");
      return false;
    }
    if (price <= 0) {
      setError("Price must be greater than 0.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (!validateStep1()) return;
    setStep(2);
  };

  const handleBack = () => {
    setError("");
    setStep(1);
  };

  const handleSubmit = async () => {
    setError("");

    if (!nameKa.trim()) {
      setError("Name (KA) is required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload: NewProductPayload = {
        slug: slug.trim(),
        status,
        category_id: categoryId ? Number(categoryId) : null,
        translations: [
          { lang: "en", name: nameEn.trim(), description: descriptionEn.trim() || undefined },
          { lang: "ka", name: nameKa.trim(), description: descriptionKa.trim() || undefined },
        ],
        variant: {
          sku: sku.trim(),
          capacity_ml: capacityMl,
          price,
          discount,
          stock,
        },
      };

      const token = await getCsrfToken();
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": token,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        const detailMsg = data.details
          ? Object.values(data.details).flat().join(" ")
          : data.error;
        throw new Error(detailMsg || "Failed to create product");
      }

      onCreated(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputCls =
    "w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";
  const labelCls = "text-xs font-medium text-gray-500 mb-1 block";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-medium text-gray-900">Add product</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Step {step} of 2 — {step === 1 ? "Product details (EN)" : "Georgian translation"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {step === 1 && (
            <>
              <div>
                <label className={labelCls}>Name (EN)*</label>
                <input className={inputCls} value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
              </div>

              <div>
                <label className={labelCls}>Description (EN)</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Slug*</label>
                  <input
                    className={`${inputCls} font-mono text-xs`}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="my-product-name"
                  />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <select
                    className={inputCls}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">— none —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.translations.find((t) => t.lang === "en")?.name ?? `#${c.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>SKU*</label>
                  <input className={inputCls} value={sku} onChange={(e) => setSku(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Capacity (ml)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min="0"
                    value={capacityMl}
                    onChange={(e) => setCapacityMl(+e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Price (₾)*</label>
                  <input
                    className={inputCls}
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Discount (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(+e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Stock</label>
                  <input
                    className={inputCls}
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(+e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Status</label>
                <select
                  className={inputCls}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelCls}>სახელი (KA)*</label>
                <input className={inputCls} value={nameKa} onChange={(e) => setNameKa(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>აღწერა (KA)</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={descriptionKa}
                  onChange={(e) => setDescriptionKa(e.target.value)}
                />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex gap-2 justify-end px-5 py-4 border-t border-gray-100">
          {step === 1 && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-md text-sm text-white bg-[#2f4a9c] hover:opacity-90"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                onClick={handleBack}
                className="px-4 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 border border-gray-200"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-4 py-1.5 rounded-md text-sm text-white bg-[#2f4a9c] hover:opacity-90 disabled:opacity-60"
              >
                {isSaving ? "Saving…" : "Add product"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}