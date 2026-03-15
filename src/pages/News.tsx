const news = Array(6).fill({
  date: "12 September 2025",
  title: "Medium Size Headline",
  excerpt: "Zoma Bafix Foam is a ready-to-use, foaming cleaning agent designed to remove scale from...",
});

function NewsCard({ date, title, excerpt } : {date:string, title:string, excerpt:string} ) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Image placeholder */}
      <div className="relative w-full h-40 bg-gray-200">
        <span className="absolute bottom-3 left-3 bg-[#2f4a9c] text-white text-xs px-3 py-1.5 rounded-xl">
          {date}
        </span>
      </div>
      {/* Text */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{excerpt}</p>
      </div>
    </div>
  );
}

export default function News() {
  return (
    <div className="min-h-screen  py-6 md:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">News</h1>

      {/* Mobile: 1 col | Desktop: 3 cols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {news.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}