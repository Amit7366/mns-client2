import type { Locale } from "@/lib/locale";

export type AppDownloadBarMessages = {
  headline: string;
  download: string;
  close: string;
  installTitle: string;
  installNow: string;
  iosHint: string;
  browserHint: string;
};

const en: AppDownloadBarMessages = {
  headline: "APP UP TO ৳999 >>>",
  download: "Download",
  close: "Close",
  installTitle: "Install the app",
  installNow: "Install now",
  iosHint: "Tap the Share button, then “Add to Home Screen”.",
  browserHint: "Open the browser menu and tap “Install app” or “Add to Home screen”.",
};

const bn: AppDownloadBarMessages = {
  headline: "APP UP TO ৳999 >>>",
  download: "Download",
  close: "বন্ধ",
  installTitle: "অ্যাপ ইনস্টল করুন",
  installNow: "এখনই ইনস্টল করুন",
  iosHint: "শেয়ার বাটনে ট্যাপ করুন, তারপর “হোম স্ক্রিনে যোগ করুন”।",
  browserHint: "ব্রাউজারের মেনু থেকে “অ্যাপ ইনস্টল করুন” বা “হোম স্ক্রিনে যোগ করুন” ট্যাপ করুন।",
};

const hi: AppDownloadBarMessages = {
  headline: "APP UP TO ৳999 >>>",
  download: "Download",
  close: "बंद करें",
  installTitle: "ऐप इंस्टॉल करें",
  installNow: "अभी इंस्टॉल करें",
  iosHint: "शेयर बटन दबाएँ, फिर “होम स्क्रीन पर जोड़ें”।",
  browserHint: "ब्राउज़र मेनू खोलें और “ऐप इंस्टॉल करें” या “होम स्क्रीन पर जोड़ें” दबाएँ।",
};

export function getAppDownloadBarMessages(locale: Locale): AppDownloadBarMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}
