// pages/admin/AddProductModal.tsx
import { useEffect, useState } from "react";
import { getCsrfToken } from "../../lib/csrf";

interface Category {
  id: number;
  name: string ;
}

interface TranslationPayload {
  lang: "en" | "ka";
  name: string;
  description?: string;
  instructions_for_use: string[];
  do_not_use: string[];
  store?: string;
}

const CAPACITY_UNITS = ["ml", "l", "g", "kg", "pcs", "rolls"] as const;
type CapacityUnit = (typeof CAPACITY_UNITS)[number];

interface VariantInput {
  id: string; // client-side only, for React keys — stripped before sending to backend
  sku: string;
  capacity_value: number;
  capacity_unit: CapacityUnit;
  price: number;
  discount: number;
  stock: number;
}

interface NewProductPayload {
  slug: string;
  status: "active" | "inactive";
  category_id: number | null;
  translations: TranslationPayload[];
  variants: {
    sku: string;
    capacity_value: number;
    capacity_unit: CapacityUnit;
    price: number;
    discount: number;
    stock: number;
  }[];
}

// ── Reusable step-list input ─────────────────────────────────────────────
// Renders N text inputs with add/remove controls, for array-of-string
// columns like instructions_for_use / do_not_use.
function StepListInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const inputCls =
    "w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";
  const labelCls = "text-xs font-medium text-gray-500 mb-1 block";

  const updateAt = (i: number, val: string) => {
    const next = [...values];
    next[i] = val;
    onChange(next);
  };

  const removeAt = (i: number) => {
    onChange(values.filter((_, idx) => idx !== i));
  };

  const addRow = () => onChange([...values, ""]);

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputCls}
              value={v}
              onChange={(e) => updateAt(i, e.target.value)}
              placeholder={placeholder ?? `Step ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="px-2 text-red-400 hover:text-red-600 text-sm"
              title="Remove step"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          className="self-start text-xs text-[#2f4a9c] hover:underline"
        >
          + Add step
        </button>
      </div>
    </div>
  );
}

// ── Reusable variant list input ──────────────────────────────────────────
// Renders N variant rows (sku / capacity / price / discount / stock),
// each independently editable, with add/remove controls.
function VariantListInput({
  variants,
  onChange,
}: {
  variants: VariantInput[];
  onChange: (next: VariantInput[]) => void;
}) {
  const inputCls =
    "w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";
  const labelCls = "text-xs font-medium text-gray-500 mb-1 block";

  const updateField = (
    id: string,
    field: keyof Omit<VariantInput, "id">,
    value: string | number,
  ) => {
    onChange(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };

  const removeVariant = (id: string) => {
    onChange(variants.filter((v) => v.id !== id));
  };

  const addVariant = () => {
    onChange([
      ...variants,
      {
        id: crypto.randomUUID(),
        sku: "",
        capacity_value: 0,
        capacity_unit: "ml",
        price: 0,
        discount: 0,
        stock: 0,
      },
    ]);
  };


  return (
    <div>
      <label className={labelCls}>Variants (capacity / price / stock)*</label>
      <div className="flex flex-col gap-3">
        {variants.map((v, i) => (
          <div
            key={v.id}
            className="border border-gray-200 rounded-md p-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">
                Variant {i + 1}
              </span>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(v.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                  title="Remove variant"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>SKU*</label>
                <input
                  className={inputCls}
                  value={v.sku}
                  onChange={(e) => updateField(v.id, "sku", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Capacity*</label>
                <div className="flex gap-2">
                  <input
                    className={inputCls}
                    type="number"
                    min="0"
                    value={v.capacity_value}
                    onChange={(e) =>
                      updateField(v.id, "capacity_value", +e.target.value)
                    }
                  />
                  <select
                    className={`${inputCls} max-w-20`}
                    value={v.capacity_unit}
                    onChange={(e) =>
                      updateField(v.id, "capacity_unit", e.target.value)
                    }
                  >
                    {CAPACITY_UNITS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className={labelCls}>Price (₾)*</label>
                <input
                  className={inputCls}
                  type="number"
                  step="0.01"
                  min="0"
                  value={v.price}
                  onChange={(e) => updateField(v.id, "price", +e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Discount (%)</label>
                <input
                  className={inputCls}
                  type="number"
                  min="0"
                  max="100"
                  value={v.discount}
                  onChange={(e) =>
                    updateField(v.id, "discount", +e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Stock</label>
                <input
                  className={inputCls}
                  type="number"
                  min="0"
                  value={v.stock}
                  onChange={(e) => updateField(v.id, "stock", +e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="self-start text-xs text-[#2f4a9c] hover:underline"
        >
          + Add variant
        </button>
      </div>
    </div>
  );
}

export default function AddProductModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (product: any) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  // categories — fetched on mount so the modal doesn't depend on the parent
  // passing them in as a prop
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");



  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError("");
      try {
        const res = await fetch("/api/categories", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        if (!cancelled) setCategories(data);
      } catch (err) {
        if (!cancelled) {
          setCategoriesError(
            err instanceof Error ? err.message : "Failed to load categories",
          );
        }
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    };

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  // step 1 — English + core product data
  const [nameEn, setNameEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [instructionsEn, setInstructionsEn] = useState<string[]>([]);
  const [doNotUseEn, setDoNotUseEn] = useState<string[]>([]);
  const [storeEn, setStoreEn] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [variants, setVariants] = useState<VariantInput[]>([
    {
      id: crypto.randomUUID(),
      sku: "",
      capacity_value: 0,
      capacity_unit: "ml",
      price: 0,
      discount: 0,
      stock: 0,
    },
  ]);

  // step 2 — Georgian translation
  const [nameKa, setNameKa] = useState("");
  const [descriptionKa, setDescriptionKa] = useState("");
  const [instructionsKa, setInstructionsKa] = useState<string[]>([]);
  const [doNotUseKa, setDoNotUseKa] = useState<string[]>([]);
  const [storeKa, setStoreKa] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const validateStep1 = () => {
    if (!nameEn.trim() || !slug.trim()) {
      setError("Name (EN) and slug are required.");
      return false;
    }
    for (const v of variants) {
      if (!v.sku.trim()) {
        setError("Each variant needs a SKU.");
        return false;
      }
      if (v.price <= 0) {
        setError("Each variant's price must be greater than 0.");
        return false;
      }
      if (v.capacity_value <= 0) {
        setError("Each variant's capacity must be greater than 0.");
        return false;
      }
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

  // Drops blank rows left over from "+ Add step" clicks the admin never filled in.
  const cleanSteps = (arr: string[]) =>
    arr.map((s) => s.trim()).filter(Boolean);

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
          {
            lang: "en",
            name: nameEn.trim(),
            description: descriptionEn.trim() || undefined,
            instructions_for_use: cleanSteps(instructionsEn),
            do_not_use: cleanSteps(doNotUseEn),
            store: storeEn.trim() || undefined,
          },
          {
            lang: "ka",
            name: nameKa.trim(),
            description: descriptionKa.trim() || undefined,
            instructions_for_use: cleanSteps(instructionsKa),
            do_not_use: cleanSteps(doNotUseKa),
            store: storeKa.trim() || undefined,
          },
        ],
        variants: variants.map(({ id, ...rest }) => rest),
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
      setError(
        err instanceof Error ? err.message : "Failed to create product.",
      );
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
              Step {step} of 2 —{" "}
              {step === 1 ? "Product details (EN)" : "Georgian translation"}
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
                <input
                  className={inputCls}
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
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
                    disabled={categoriesLoading}
                  >
                    <option value="">— none —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {categoriesLoading && (
                    <p className="text-xs text-gray-400 mt-1">
                      Loading categories…
                    </p>
                  )}
                  {categoriesError && (
                    <p className="text-xs text-red-500 mt-1">
                      {categoriesError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelCls}>Status</label>
                <select
                  className={inputCls}
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "active" | "inactive")
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <VariantListInput variants={variants} onChange={setVariants} />

              <StepListInput
                label="Instructions for use (EN)"
                values={instructionsEn}
                onChange={setInstructionsEn}
                placeholder="e.g. Spray onto the surface"
              />

              <StepListInput
                label="Do not use on (EN)"
                values={doNotUseEn}
                onChange={setDoNotUseEn}
                placeholder="e.g. Do not use on marble"
              />

              <div>
                <label className={labelCls}>Storage instructions (EN)</label>
                <input
                  className={inputCls}
                  value={storeEn}
                  onChange={(e) => setStoreEn(e.target.value)}
                  placeholder="e.g. Store in a cool, dry place away from sunlight"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelCls}>სახელი (KA)*</label>
                <input
                  className={inputCls}
                  value={nameKa}
                  onChange={(e) => setNameKa(e.target.value)}
                />
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

              <StepListInput
                label="გამოყენების ინსტრუქცია (KA)"
                values={instructionsKa}
                onChange={setInstructionsKa}
                placeholder="მაგ. შეასხურეთ ზედაპირზე"
              />

              <StepListInput
                label="არ გამოიყენოთ (KA)"
                values={doNotUseKa}
                onChange={setDoNotUseKa}
                placeholder="მაგ. არ გამოიყენოთ მარმარილოზე"
              />

              <div>
                <label className={labelCls}>შენახვის პირობები (KA)</label>
                <input
                  className={inputCls}
                  value={storeKa}
                  onChange={(e) => setStoreKa(e.target.value)}
                  placeholder="მაგ. შეინახეთ გრილ, მშრალ ადგილას"
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