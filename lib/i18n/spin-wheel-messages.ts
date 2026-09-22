import type { Locale } from "@/lib/locale";

export type SpinWheelMessages = {
  title: string;
  headlineLead: string;
  headline: string;
  remaining: string;
  hours: string;
  minutes: string;
  seconds: string;
  claim: string;
  spinning: string;
  close: string;
  go: string;
  winTitle: string;
  winMessage: string;
  alreadySpun: string;
  loadError: string;
  wheelTab: string;
  envelopeTab: string;
};

const bn: SpinWheelMessages = {
  title: "পুরস্কার",
  headlineLead: "iPhone Duo",
  headline: "জিততে দৈনিক ডিপোজিট করুন",
  remaining: "অবশিষ্ট সময়",
  hours: "ঘণ্টা",
  minutes: "মিনিট",
  seconds: "সেকেন্ড",
  claim: "দাবি করুন",
  spinning: "স্পিন হচ্ছে...",
  close: "বন্ধ করুন",
  go: "GO",
  winTitle: "অভিনন্দন!",
  winMessage: "আপনি ৳{amount} জিতেছেন!",
  alreadySpun: "আজকের স্পিন সম্পন্ন হয়েছে",
  loadError: "স্পিন লোড করতে ব্যর্থ",
  wheelTab: "স্পিন হুইল",
  envelopeTab: "লাল খাম",
};

const en: SpinWheelMessages = {
  title: "Reward",
  headlineLead: "iPhone Duo",
  headline: "Deposit daily to win",
  remaining: "Time remaining",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  claim: "Claim",
  spinning: "Spinning...",
  close: "Close",
  go: "GO",
  winTitle: "Congratulations!",
  winMessage: "You won ৳{amount}!",
  alreadySpun: "Today's spin is complete",
  loadError: "Failed to load spin wheel",
  wheelTab: "Spin wheel",
  envelopeTab: "Red envelope",
};

const hi: SpinWheelMessages = {
  title: "इनाम",
  headlineLead: "iPhone Duo",
  headline: "जीतने के लिए रोज़ जमा करें",
  remaining: "शेष समय",
  hours: "घंटे",
  minutes: "मिनट",
  seconds: "सेकंड",
  claim: "दावा करें",
  spinning: "स्पिन हो रहा है...",
  close: "बंद करें",
  go: "GO",
  winTitle: "बधाई हो!",
  winMessage: "आपने ৳{amount} जीता!",
  alreadySpun: "आज का स्पिन पूरा हो गया",
  loadError: "स्पिन व्हील लोड नहीं हो सका",
  wheelTab: "स्पिन व्हील",
  envelopeTab: "लाल लिफाफा",
};

export function getSpinWheelMessages(locale: Locale): SpinWheelMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}

export function formatSpinAmount(value: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : locale === "hi" ? "hi-IN" : "en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(value);
  }
}
