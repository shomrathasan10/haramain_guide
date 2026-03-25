import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const options = [
    { code: "bn", label: "বাংলা" },
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white p-1">
      {options.map((item) => (
        <button
          key={item.code}
          onClick={() => setLang(item.code)}
          className={`rounded-xl px-3 py-2 text-sm font-semibold ${
            lang === item.code
              ? "bg-emerald-600 text-white"
              : "text-emerald-700"
          }`}
        >
          {item.label}
        </button>
      ))}
      </div>
  );
}