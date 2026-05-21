import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface CategoryProps {
  filter: string;
  setFilter: (category: string) => void;
}

const Category = ({ setFilter }: CategoryProps) => {
  const { t } = useTranslation();
  const categories = t("categories", { returnObjects: true }) as Record<string, string>;
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const pressedKey = useRef<string | null>(null); // track which button was pressed

 useLayoutEffect(() => {
  if (selectedKey !== null && categories[selectedKey] !== undefined) {
    setFilter(categories[selectedKey]);
  }
}, [selectedKey, i18next.language]);

  const isMobile = () => window.innerWidth < 768;

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!isMobile() || !listRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX - listRef.current.offsetLeft;
    scrollLeft.current = listRef.current.scrollLeft;
    listRef.current.setPointerCapture(e.pointerId); // smooth drag, no stickiness

    // find which button key was pressed
    const btn = (e.target as HTMLElement).closest("button");
    pressedKey.current = btn?.dataset.key ?? null;
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
    // if it was a tap (not a drag), select the button
    if (!hasDragged.current && pressedKey.current !== null) {
    toggleKey(pressedKey.current);
}
  };
  // helper to avoid repeating the logic
  const toggleKey = (key: string) => {
    const next = key === selectedKey ? null : key;
    setSelectedKey(next);
    // if deselecting, clear the filter immediately
    if (next === null) setFilter("");
  };

  return (
    <section className="my-4 md:my-9 mx-1 w-full flex justify-center">
      <ul
        ref={listRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex gap-2 md:gap-10 overflow-x-auto md:overflow-visible select-none scrollbar-none"
      >
        {Object.entries(categories).map(([key, category]) => (
          <li key={key} className="shrink-0">
            <button
              data-key={key} // so onPointerDown can read which key was pressed
              className={`${
                key === selectedKey
                  ? "bg-blue-50 text-white"
                  : "bg-gray-50 text-gray-100"
              } rounded-4xl px-4 py-2 cursor-pointer hover:opacity-90 capitalize`}
            onClick={() => { if (!isMobile()) toggleKey(key); }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Category;