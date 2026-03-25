import { useLanguage } from "../context/LanguageContext";

export default function RtlWrapper({ children }) {
  const { lang } = useLanguage();
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "text-right" : "text-left"}>
      {children}
    </div>
  );
}