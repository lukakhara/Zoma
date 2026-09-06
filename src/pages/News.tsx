import { useTranslation } from "react-i18next";
import newsSectionImage from '../../public/assets/news-image.jpg'

const newsEng = Array(6).fill({
  date: "12 September 2025",
  title: "Clean-Label & Non-Toxic Formulations",
  excerpt:
    "Updates on plant-based ingredients, hypoallergenic certifications, and pet/child-safe formulas. Consumers increasingly look for products free from harsh volatile organic compounds (VOCs), phthalates, and synthetic dyes.",
});

const newsGe = Array(6).fill({
  date: "12 სექტემბერი 2025",
  title: "სუფთა ეტიკეტისა და არატოქსიკური შემადგენლობის პროდუქტები",
  excerpt:
    "სიახლეები მცენარეულ ინგრედიენტებზე, ჰიპოალერგიულ სერტიფიკატებსა და შინაური ცხოველებისა თუ ბავშვებისთვის უსაფრთხო ფორმულებზე. მომხმარებლები სულ უფრო ხშირად ეძებენ პროდუქტებს, რომლებიც არ შეიცავს აგრესიულ მფრინავ ორგანულ ნაერთებს (VOCs), ფტალატებსა და სინთეზურ საღებავებს....",
});

function NewsCard({
  date,
  title,
  excerpt,
}: {
  date: string;
  title: string;
  excerpt: string;
}) {
  const {t} = useTranslation();
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm gap-6 ">
      {/* Image placeholder */}
      <div className="relative flex items-center  justify-center w-full h-51  bg-gray-200 ">
        <img src={newsSectionImage} className="w-full h-full object-cover  absolute inset-0" alt={t('placeHolder')} />
     
        <span className="absolute bottom-1 left-1 bg-[#2f4a9c] text-white text-xs px-3 py-1.5 rounded-xl">
          {date}
        </span>
      </div>
      {/* Text */}
      <div className="p-4 pt-10  ">
        <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
export default function News() {
  const { i18n, t } = useTranslation();
  const news = i18n.language === "ka" ? newsGe : newsEng;

  return (
    <div className="min-h-screen pt-[23px] pb-[70px] md:pt-14 md:pb-22 flex flex-col gap-4 md:gap-9 md:py-8 ">
      <h1 className="text-2xl font-bold text-gray-900">{t("news")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {news.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
