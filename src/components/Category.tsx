import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCategories } from "../services/productService";

interface Category {
  id: string | number;
  name: string;
  slug: string; // ← add this
}

interface CategoryProps {
  filter: string;
  setFilter: (category: string) => void;
}

const Category = ({ setFilter, filter }: CategoryProps) => {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const pressedKey = useRef<number | null>(null);
  console.log("filter from caregory comp", filter);

  useEffect(() => {
    getCategories(i18n.language)
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to load categories:", error));
  }, [i18n.language]);

  // Sync filter whenever selection or categories change
  useLayoutEffect(() => {
    if (selectedKey !== null && categories[selectedKey] !== undefined) {
      setFilter(categories[selectedKey].slug);
    }
  }, [selectedKey, categories]);

  const isMobile = () => window.innerWidth < 768;

  const toggleKey = (key: number) => {
    const next = key === selectedKey ? null : key;
    setSelectedKey(next);
    if (next === null) setFilter("");
  };

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!isMobile() || !listRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX - listRef.current.offsetLeft;
    scrollLeft.current = listRef.current.scrollLeft;
    listRef.current.setPointerCapture(e.pointerId);

    const btn = (e.target as HTMLElement).closest("button");
    const rawKey = btn?.dataset.key;
    pressedKey.current = rawKey !== undefined ? Number(rawKey) : null;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!isDragging.current || !listRef.current) return;
    const x = e.clientX - listRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    listRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (!hasDragged.current && pressedKey.current !== null) {
      toggleKey(pressedKey.current);
    }
  };

  return (
    <section className="mt-4 my-6 md:my-9 mx-1 w-full flex justify-center">
      <ul
        ref={listRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex gap-2 md:gap-10 overflow-x-auto md:overflow-visible select-none scrollbar-none"
      >
        {categories.map((category, key) => (
          <li key={key} className="shrink-0">
            <button
              data-key={key}
              className={`${
                key === selectedKey
                  ? "bg-blue-50 text-white"
                  : "bg-gray-50 text-gray-100"
              } rounded-4xl px-4 py-2 cursor-pointer hover:opacity-90 capitalize`}
              onClick={() => {
                if (!isMobile()) toggleKey(key);
              }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Category;
