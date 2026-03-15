const offices = [
  { city: "Tbilisi, Georgia" },
  { city: "Batumi, Georgia" },
];

const socials = [
  { bg: "bg-blue-600",  label: "f",  textColor: "text-white",  fontWeight: "font-bold" },
  { bg: "bg-pink-500",  label: "in", textColor: "text-white",  fontWeight: "font-bold", isInstagram: true },
  { bg: "bg-blue-700",  label: "in", textColor: "text-white",  fontWeight: "font-bold" },
  { bg: "bg-black",     label: "✦",  textColor: "text-white",  fontWeight: "font-bold" },
];

const phones = [
  { color: "bg-blue-700",  icon: "📞" },
  { color: "bg-green-500", icon: "💬" },
  { color: "bg-purple-600",icon: "📳" },
];

function OfficeCard({ city }: { city: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-800">Head Office, Street Name #13</p>
          <p className="text-sm text-gray-600">{city}</p>
        </div>
        <span className="text-sm text-gray-700 whitespace-nowrap ml-4">10:00-18:00</span>
      </div>

      {/* Phone numbers */}
      <div className="flex flex-col gap-2">
        {phones.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full ${p.color} flex items-center justify-center text-xs`}>
              {p.icon}
            </div>
            <span className="text-sm text-gray-700">+995 55 55 55</span>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div className="flex gap-2">
        {/* Facebook */}
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">f</div>
        {/* Instagram */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">ig</div>
        {/* LinkedIn */}
        <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xs">in</div>
        {/* TikTok */}
        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">TT</div>
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
            src="https://www.openstreetmap.org/export/embed.html?bbox=44.7%2C41.6%2C44.9%2C41.8&layer=mapnik"
          />
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen  py-6 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Contact</h1>

      {/* Mobile: stacked | Desktop: 2 columns */}
      <div className="flex flex-col md:flex-row gap-5">
        {offices.map((o) => (
          <div key={o.city} className="flex-1">
            <OfficeCard city={o.city} />
          </div>
        ))}
      </div>
    </div>
  );
}