import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../data/texts";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = texts[lang];

  return (
    <nav className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-lg">
      <div className="container-x flex flex-col gap-4 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="shrink-0 text-2xl font-bold">Haramain Guide</div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium xl:justify-center">
          <Link to="/">{t.nav.home}</Link>
          <Link to="/hajj">{t.nav.hajj}</Link>
          <Link to="/umrah">{t.nav.umrah}</Link>
          <Link to="/live">{t.nav.live}</Link>
          <Link to="/qibla">{t.nav.qibla}</Link>
          <Link to="/tasbi">{t.nav.tasbi}</Link>
          <Link to="/tools">{t.nav.tools}</Link>
          <Link to="/historical-places">{t.nav.historical}</Link>
          <Link to="/hospitals">{t.nav.hospitals}</Link>
          <Link to="/hotels">{t.nav.hotels}</Link>
          <Link to="/lost-found">{t.nav.lostFound}</Link>
          <Link to="/donate">{t.nav.donate}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
          <Link to="/login" className="whitespace-nowrap">{t.nav.admin}</Link>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setLang("bn")}
            className={`rounded-lg px-3 py-1 ${lang === "bn" ? "bg-white text-emerald-700" : "bg-emerald-800"}`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-lg px-3 py-1 ${lang === "en" ? "bg-white text-emerald-700" : "bg-emerald-800"}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("ar")}
            className={`rounded-lg px-3 py-1 ${lang === "ar" ? "bg-white text-emerald-700" : "bg-emerald-800"}`}
          >
            عربي
          </button>
        </div>
      </div>
    </nav>
  );
}