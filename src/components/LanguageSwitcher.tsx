"use client";
import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
];

function currentLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

/** Free website translation via Google Translate (no API key needed). */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(currentLang());
    // Load the free Google website-translator once.
    if (document.getElementById("google-translate-script")) return;
    (window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit = () => {
      try {
        const G = (window as unknown as { google?: { translate?: { TranslateElement?: new (o: object, id: string) => void } } }).google;
        if (G?.translate?.TranslateElement) new G.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
      } catch { /* widget optional — cookie still switches language */ }
    };
    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    s.onerror = () => s.remove();
    document.body.appendChild(s);
  }, []);

  function switchTo(code: string) {
    setLang(code);
    try {
      if (code === "en") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      } else {
        const v = `/en/${code}`;
        document.cookie = `googtrans=${v}; path=/;`;
        document.cookie = `googtrans=${v}; path=/; domain=${window.location.hostname};`;
      }
    } catch { /* cookies blocked — ignore */ }
    window.location.reload();
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      {/* hidden translator host */}
      <span id="google_translate_element" className="hidden" aria-hidden />
      <Languages className="h-4 w-4 text-gold" />
      <select
        aria-label="Change website language"
        value={lang}
        onChange={(e) => switchTo(e.target.value)}
        className={`cursor-pointer rounded-full border border-gold/40 bg-black/40 text-xs text-white/85 outline-none backdrop-blur-sm transition hover:border-gold focus:border-gold ${compact ? "px-2 py-1.5" : "px-2.5 py-1.5"}`}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} className="bg-[#150826] text-white">
            {l.label}
          </option>
        ))}
      </select>
    </span>
  );
}
