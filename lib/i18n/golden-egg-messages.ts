import type { Locale } from "@/lib/locale";

export type GoldenEggMessages = {
  title: string;
  headline: string;
  remaining: string;
  hours: string;
  minutes: string;
  seconds: string;
  smashNow: string;
  tapHint: string;
  close: string;
  winTitle: string;
  winMessage: string;
  alreadyClaimed: string;
  loadError: string;
  claimError: string;
};

const bn: GoldenEggMessages = {
  title: "পুরস্কার",
  headline: "প্রতিদিন লগইন করলেই গোল্ডেন এগ ভাঙতে পারবেন",
  remaining: "অবশিষ্ট সময়",
  hours: "ঘণ্টা",
  minutes: "মিনিট",
  seconds: "সেকেন্ড",
  smashNow: "এখনই ভাঙুন",
  tapHint: "চকচকে ডিমটিতে ট্যাপ করুন",
  close: "বন্ধ করুন",
  winTitle: "অভিনন্দন!",
  winMessage: "আপনি ৳{amount} জিতেছেন! মেইন ব্যালেন্সে যোগ হয়েছে।",
  alreadyClaimed: "পরবর্তী ডিম ২৪ ঘণ্টা পর ভাঙতে পারবেন",
  loadError: "গোল্ডেন এগ লোড করতে ব্যর্থ",
  claimError: "ডিম ভাঙতে ব্যর্থ",
};

const en: GoldenEggMessages = {
  title: "Reward",
  headline: "Log in every day to smash a golden egg",
  remaining: "Time remaining",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  smashNow: "Smash now",
  tapHint: "Tap a glowing egg to smash it",
  close: "Close",
  winTitle: "Congratulations!",
  winMessage: "You won ৳{amount}! Added to your main balance.",
  alreadyClaimed: "You can smash again after 24 hours",
  loadError: "Failed to load golden egg",
  claimError: "Failed to smash the egg",
};

const hi: GoldenEggMessages = {
  title: "इनाम",
  headline: "हर दिन लॉगिन करें और गोल्डन एग तोड़ें",
  remaining: "शेष समय",
  hours: "घंटे",
  minutes: "मिनट",
  seconds: "सेकंड",
  smashNow: "अभी तोड़ें",
  tapHint: "चमकते अंडे पर टैप करें",
  close: "बंद करें",
  winTitle: "बधाई हो!",
  winMessage: "आपने ৳{amount} जीता! मुख्य बैलेंस में जोड़ा गया।",
  alreadyClaimed: "अगला अंडा 24 घंटे बाद तोड़ सकते हैं",
  loadError: "गोल्डन एग लोड नहीं हो सका",
  claimError: "अंडा तोड़ने में विफल",
};

export function getGoldenEggMessages(locale: Locale): GoldenEggMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}

export function formatGoldenEggAmount(value: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : locale === "hi" ? "hi-IN" : "en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(value);
  }
}
