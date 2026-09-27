import type { Locale } from "@/lib/locale";

export type RedEnvelopeMessages = {
  title: string;
  headline: string;
  remaining: string;
  hours: string;
  minutes: string;
  seconds: string;
  tapHint: string;
  close: string;
  winTitle: string;
  winMessage: string;
  alreadyClaimed: string;
  loadError: string;
  claimError: string;
  wheelTab: string;
  eggTab: string;
  cardTab: string;
};

const bn: RedEnvelopeMessages = {
  title: "পুরস্কার",
  headline: "প্রতিদিন লগইন করলেই লাল খাম খুলতে পারবেন",
  remaining: "অবশিষ্ট সময়",
  hours: "ঘণ্টা",
  minutes: "মিনিট",
  seconds: "সেকেন্ড",
  tapHint: "যেকোনো খামে একবার ট্যাপ করুন",
  close: "বন্ধ করুন",
  winTitle: "অভিনন্দন!",
  winMessage: "আপনি ৳{amount} জিতেছেন! মেইন ব্যালেন্সে যোগ হয়েছে।",
  alreadyClaimed: "পরবর্তী খাম ২৪ ঘণ্টা পর খুলতে পারবেন",
  loadError: "লাল খাম লোড করতে ব্যর্থ",
  claimError: "খাম খুলতে ব্যর্থ",
  wheelTab: "লাকি হুইল",
  eggTab: "লাকি এগ",
  cardTab: "লাল খাম",
};

const en: RedEnvelopeMessages = {
  title: "Reward",
  headline: "Log in every day to open a red envelope",
  remaining: "Time remaining",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  tapHint: "Tap any envelope once",
  close: "Close",
  winTitle: "Congratulations!",
  winMessage: "You won ৳{amount}! Added to your main balance.",
  alreadyClaimed: "You can open again after 24 hours",
  loadError: "Failed to load red envelope",
  claimError: "Failed to open the envelope",
  wheelTab: "Lucky wheel",
  eggTab: "Lucky egg",
  cardTab: "Red envelope",
};

const hi: RedEnvelopeMessages = {
  title: "इनाम",
  headline: "हर दिन लॉगिन करें और लाल लिफाफा खोलें",
  remaining: "शेष समय",
  hours: "घंटे",
  minutes: "मिनट",
  seconds: "सेकंड",
  tapHint: "किसी भी लिफाफे पर एक बार टैप करें",
  close: "बंद करें",
  winTitle: "बधाई हो!",
  winMessage: "आपने ৳{amount} जीता! मुख्य बैलेंस में जोड़ा गया।",
  alreadyClaimed: "अगला लिफाफा 24 घंटे बाद खोल सकते हैं",
  loadError: "लाल लिफाफा लोड नहीं हो सका",
  claimError: "लिफाफा खोलने में विफल",
  wheelTab: "लकी व्हील",
  eggTab: "लकी एग",
  cardTab: "लाल लिफाफा",
};

export function getRedEnvelopeMessages(locale: Locale): RedEnvelopeMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}

export function formatRedEnvelopeAmount(value: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : locale === "hi" ? "hi-IN" : "en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(value);
  }
}
