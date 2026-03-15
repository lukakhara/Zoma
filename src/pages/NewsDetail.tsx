export default function NewsDetail() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 md:py-8">
      <div className="max-w-lg mx-auto md:mx-0">

        {/* Title & date */}
        <h1 className="text-2xl font-bold text-gray-900">Medium Size Header</h1>
        <p className="text-sm text-gray-400 mt-1 mb-4">12 September 2025</p>

        {/* Main image */}
        <div className="w-full h-52 md:h-44 bg-gray-300 rounded-2xl mb-5" />

        {/* Body text */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Zoma Bafix Foam is a ready-to-use, foaming cleaning agent designed to remove scale from bathroom surfaces. It effectively eliminates limescale and other types of dirt. Suitable for use on undamaged porcelain, ceramic, and enamel sanitary surfaces.
        </p>

        {/* Instructions */}
        <p className="text-sm text-gray-700 mb-1">Instructions for use:</p>
        <ul className="text-sm text-gray-700 mb-4 space-y-1">
          {[
            "Spray onto the surface",
            "Wait for 5–10 minutes",
            "Scrub the surface",
            "Wipe and rinse thoroughly",
          ].map((step) => (
            <li key={step} className="flex items-start gap-2">
              <span className="mt-1 text-gray-400">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        {/* Warnings */}
        <div className="text-sm text-gray-700 space-y-0.5 mb-6">
          <p>Do not mix Zoma Bafix Foam with chlorine-containing products.</p>
          <p>Do not use on acid-sensitive surfaces such as marble and others.</p>
          <p>Store at temperatures between 5°C and 35°C.</p>
          <p>Volume: 600 ml</p>
        </div>

        {/* Video placeholder */}
        <div className="w-full h-44 md:h-40 bg-gray-300 rounded-2xl flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-400 bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-lg ml-0.5">▶</span>
          </div>
        </div>

      </div>
    </div>
  );
}