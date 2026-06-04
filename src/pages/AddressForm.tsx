import { useTranslation } from "react-i18next";


function AddressForm({ title }: { title: string }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <h1 className="text-2xl font-bold text-gray-900 md:hidden">{title}</h1>
      )}
      {[
        { label: t("city"), placeholder: "City", required: false },
        {
          label: t("fullAddress"),
          placeholder: "Full Address",
          required: true,
        },
        { label: t("zipCode"), placeholder: "Zip Code", required: true },
      ].map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">
            {f.label}
            {f.required && "*"}
          </span>
          <input
            placeholder={f.placeholder}
            className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm text-sm placeholder-gray-400 outline-none"
          />
        </div>
      ))}
      <button className="w-full py-3 rounded-2xl bg-[#2f4a9c] text-white text-sm font-medium">
        {t("save")}
      </button>
    </div>
  );
}

export default AddressForm;
