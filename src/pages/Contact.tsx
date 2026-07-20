import { Phone } from "lucide-react";
import {
  FaWhatsapp,
  FaViber,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type OfficeLocation = {
  en: { city: string; address: string };
  ka: { city: string; address: string };
  bbox: string; // per-office map bounding box
};

const offices: OfficeLocation[] = [
  {
    en: { city: "Tbilisi, Georgia", address: "Head Office, Street Name #13" },
    ka: {
      city: "თბილისი, საქართველო",
      address: "მთავარი ოფისი, ქუჩა ნომერი #13",
    },
    bbox: "44.7,41.6,44.9,41.8", // Tbilisi
  },
  {
    en: { city: "Batumi, Georgia", address: "Head Office, Street Name #13" },
    ka: {
      city: "ბათუმი, საქართველო",
      address: "მთავარი ოფისი, ქუჩა ნომერი #13",
    },
    bbox: "41.55,41.55,41.70,41.70", // Batumi (approximate — adjust to your real coordinates)
  },
];

const phones = [
  { color: "bg-blue-700", Icon: Phone },
  { color: "bg-green-500", Icon: FaWhatsapp },
  { color: "bg-purple-600", Icon: FaViber },
];

function OfficeCard({ office }: { office: OfficeLocation }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "ka" ? "ka" : "en";
  const { city, address } = office[lang];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[14px] md:text-[21px] font-medium text-gray-800">
             {address}
          </p>
          <p className="text-[14px] md:text-[21px] text-gray-600">
            {t("city")}: {city}
          </p>
        </div>
        <span className="text-[14px] md:text-[21px] text-gray-700 whitespace-nowrap ml-4">
          10:00-18:00
        </span>
      </div>

      {/* Phone numbers */}
      <div className="flex flex-col gap-2">
        {phones.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full ${p.color} flex items-center justify-center`}
            >
              <p.Icon className="text-white w-4 h-4" />
            </div>
            <span className="text-gray-700 text-[14px] md:text-[21px]">
              +995 55 55 55
            </span>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div className="flex gap-2">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
          <FaFacebookF className="text-white w-4 h-4" />
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
          <FaInstagram className="text-white w-4 h-4" />
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center">
          <FaLinkedinIn className="text-white w-4 h-4" />
        </div>
        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
          <FaTiktok className="text-white w-4 h-4" />
        </div>
      </div>

      {/* Map */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Map</p>
        <div className="w-full h-36 rounded-xl overflow-hidden">
          <iframe
            title={`map-${city}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${office.bbox}&layer=mapnik`}
          />
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen py-6 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Contact</h1>

      <div className="flex flex-col md:flex-row gap-5">
        {offices.map((office, i) => (
          <div key={i} className="flex-1">
            <OfficeCard office={office} />
          </div>
        ))}
      </div>
    </div>
  );
}