import type { Locale } from "@/lib/locale";

export type AppDownloadBarMessages = {
  headline: string;
  download: string;
  close: string;
};

const en: AppDownloadBarMessages = {
  headline: "APP UP TO ৳999 >>>",
  download: "Download",
  close: "Close",
};

const bn: AppDownloadBarMessages = {
  headline: "APP UP TO ৳999 >>>",
  download: "Download",
  close: "বন্ধ",
};

const hi: AppDownloadBarMessages = {
  headline: "APP UP TO ৳999 >>>",
  download: "Download",
  close: "बंद करें",
};

export function getAppDownloadBarMessages(locale: Locale): AppDownloadBarMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}
