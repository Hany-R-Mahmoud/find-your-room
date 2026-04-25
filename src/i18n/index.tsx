import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";

import commonAr from "./common/ar.json";
import commonEn from "./common/en.json";
import dataAr from "./data/ar.json";
import dataEn from "./data/en.json";
import discoverAr from "./discover/ar.json";
import discoverEn from "./discover/en.json";
import inboxAr from "./inbox/ar.json";
import inboxEn from "./inbox/en.json";
import landingAr from "./landing/ar.json";
import landingEn from "./landing/en.json";
import matchesAr from "./matches/ar.json";
import matchesEn from "./matches/en.json";
import onboardingAr from "./onboarding/ar.json";
import onboardingEn from "./onboarding/en.json";
import profileAr from "./profile/ar.json";
import profileEn from "./profile/en.json";
import roomAr from "./room/ar.json";
import roomEn from "./room/en.json";
import shortlistsAr from "./shortlists/ar.json";
import shortlistsEn from "./shortlists/en.json";
import stayAr from "./stay/ar.json";
import stayEn from "./stay/en.json";

export type Locale = "en" | "ar";

const dictionaries = {
  en: {
    common: commonEn,
    landing: landingEn,
    onboarding: onboardingEn,
    discover: discoverEn,
    matches: matchesEn,
    shortlists: shortlistsEn,
    inbox: inboxEn,
    stay: stayEn,
    profile: profileEn,
    room: roomEn,
    data: dataEn
  },
  ar: {
    common: commonAr,
    landing: landingAr,
    onboarding: onboardingAr,
    discover: discoverAr,
    matches: matchesAr,
    shortlists: shortlistsAr,
    inbox: inboxAr,
    stay: stayAr,
    profile: profileAr,
    room: roomAr,
    data: dataAr
  }
} as const;

type Namespace = keyof (typeof dictionaries)["en"];

type LocaleContextValue = {
  locale: Locale;
  isRTL: boolean;
  toggleLocale: () => void;
  getNamespace: <T>(namespace: Namespace) => T;
  translate: (namespace: Namespace, key: string, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolvePath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (value && typeof value === "object" && segment in (value as Record<string, unknown>)) {
      return (value as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

function applyVars(input: string, vars?: Record<string, string | number>): string {
  if (!vars) {
    return input;
  }

  return Object.entries(vars).reduce((message, [key, value]) => {
    return message.replaceAll(`{${key}}`, String(value));
  }, input);
}

function detectInitialLocale(): Locale {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
  return locale.startsWith("ar") ? "ar" : "en";
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(detectInitialLocale);

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === "en" ? "ar" : "en"));
  }, []);

  const getNamespace = useCallback(
    <T,>(namespace: Namespace): T => {
      return dictionaries[locale][namespace] as T;
    },
    [locale]
  );

  const translate = useCallback(
    (namespace: Namespace, key: string, vars?: Record<string, string | number>): string => {
      const message = resolvePath(dictionaries[locale][namespace], key);

      if (typeof message !== "string") {
        return key;
      }

      return applyVars(message, vars);
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      isRTL: locale === "ar",
      toggleLocale,
      getNamespace,
      translate
    }),
    [getNamespace, locale, toggleLocale, translate]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}

export function useTranslations<T>(namespace: Namespace) {
  const { getNamespace, isRTL, locale, toggleLocale, translate } = useLocale();

  return {
    locale,
    isRTL,
    toggleLocale,
    messages: getNamespace<T>(namespace),
    t: (key: string, vars?: Record<string, string | number>) => translate(namespace, key, vars)
  };
}

export function textAlignFor(isRTL: boolean): "left" | "right" {
  return isRTL ? "right" : "left";
}

export function rowDirectionFor(isRTL: boolean): "row" | "row-reverse" {
  return isRTL ? "row-reverse" : "row";
}

export function forwardIconFor(isRTL: boolean): "arrow-back" | "arrow-forward" {
  return isRTL ? "arrow-back" : "arrow-forward";
}

export function backIconFor(isRTL: boolean): "arrow-back" | "arrow-forward" {
  return isRTL ? "arrow-forward" : "arrow-back";
}
