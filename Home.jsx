import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../data/texts";

export default function Home() {
  const { lang } = useLanguage();
  const t = texts[lang];

  const cards = [
    ["Live", "/live", "🕋"],
    ["Qibla", "/qibla", "🧭"],
    ["Tasbi", "/tasbi", "📿"],
    ["Tools", "/tools", "🕌"],
    ["Historical Places", "/historical-places", "🏛️"],
    ["Hospitals", "/hospitals", "🏥"],
    ["Hotels", "/hotels", "🏨"],
    ["Lost & Found", "/lost-found", "🎒"],
    ["Donate", "/donate", "🤲"],
  ];

  return (
    <div className="container-x section-y">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-600 p-10 text-white shadow-xl">
        <h1 className="text-4xl font-bold">{t.homeTitle}</h1>
        <p className="mt-4 max-w-3xl text-lg text-emerald-50">{t.homeDesc}</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(([title, path, icon]) => (
          <Link key={path} to={path} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-5xl">{icon}</div>
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}