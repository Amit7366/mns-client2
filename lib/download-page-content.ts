import { SITE_BRAND, SITE_NAME } from "@/lib/seo/site-config";

export const DOWNLOAD_APP_NAME = SITE_NAME;
export const DOWNLOAD_APP_DOMAIN = SITE_BRAND;

export const DOWNLOAD_ABOUT =
  "🔥🌟🌟🌟🌟🌟৪.৯ স্টার, বিজ্ঞাপন-মুক্ত, সাবলীল গেমপ্লে, নিশ্চিত পয়েন্ট, এবং লক্ষ লক্ষ টাকা তাৎক্ষণিক উত্তোলন! 🔥💎আল্টিমেট ভিআইপি রিওয়ার্ডস ক্লাব ① আপগ্রেড রিওয়ার্ড: ২৭৭,৭৭৭ টাকা ② দৈনিক রিওয়ার্ড: ৭৭,৭৭৭ টাকা ③ সাপ্তাহিক রিওয়ার্ড: ১২৭,৭৭৭ টাকা ④ মাসিক রিওয়ার্ড: ১৭৭,৭৭৭ টাকা 💰৫% পর্যন্ত এক্সক্লুসিভ কমিশন 💰মাসিক লাভ ১০০ মিলিয়ন টাকা 💰💎বন্ধুদের আমন্ত্রণ জানিয়ে ৫০০ টাকা মূল্যের ট্রেজার চেস্ট পুরস্কার পান 🎁প্রতিদিন ১২টি র‍্যান্ডম ড্র, পুরস্কার হিসেবে রয়েছে ১ মিলিয়ন টাকা মূল্যের ট্রেজার চেস্ট 🎁🤑বন্ধুদের আমন্ত্রণ জানিয়ে বিনামূল্যে ৯৯৯ টাকা পান 💰🎮ক্ষতির টাকা ফেরত: দৈনিক ৩০%";

export const DOWNLOAD_SHOTS = [1, 2, 3, 4, 5].map(
  (n) => `/download-page/shots/${n}.jpg`,
);

export type DownloadReview = {
  name: string;
  date: string;
  body: string;
  avatar: string;
};

export const DOWNLOAD_REVIEWS: DownloadReview[] = [
  {
    name: "⛓️─⊹⊱আফরিন⊰⊹─⛓️",
    date: "অক্টোবর 27, 2026",
    body: "আজকাল মাঝে মাঝে এখানে ঢুঁ মারি, মন্দ লাগে না 🙂",
    avatar: "/download-page/avatars/01.jpeg",
  },
  {
    name: "Mohammad Sayeed",
    date: "অক্টোবর 27, 2026",
    body: "আজকের সময়টা বেশ অন্যরকম কাটল, সব মিলিয়ে ভালোই।",
    avatar: "/download-page/avatars/02.jpeg",
  },
  {
    name: "𓆩×͜×𓆪 ℕ𝕌𝕄𝔸ℕ 𝔸ℍ𝕄𝔼𝔻",
    date: "অক্টোবর 27, 2026",
    body: "ভাবিনি এতটা ভালো লাগবে, এখন মাঝে মাঝে নিজে থেকেই চলে আসি।",
    avatar: "/download-page/avatars/03.jpeg",
  },
  {
    name: "Tariq Mehr",
    date: "অক্টোবর 26, 2026",
    body: "মাঝে মাঝে নতুন কিছু ট্রাই করতে ভালো লাগে, এই গেমটা আমার বেশ পছন্দ হয়েছে।",
    avatar: "/download-page/avatars/04.jpeg",
  },
  {
    name: "MD Asad",
    date: "অক্টোবর 26, 2026",
    body: "গেমের মধ্যে অপশনগুলো সুন্দরভাবে সাজানো, তাই নিজের মতো করে খেলতে পারি।",
    avatar: "/download-page/avatars/05.jpeg",
  },
  {
    name: "Khan Muhammad",
    date: "অক্টোবর 26, 2026",
    body: "বন্ধুর কাছ থেকে গেমটার কথা শুনেছিলাম, ট্রাই করে দেখলাম সময়টা বেশ ভালোই কাটে।",
    avatar: "/download-page/avatars/06.jpeg",
  },
  {
    name: "MHOD 🌹 RAJA ♥️",
    date: "অক্টোবর 25, 2026",
    body: "গেমটা খুললেই কয়েকটা অপশন চোখে পড়ে, নিজের পছন্দমতো বেছে নেওয়া যায়।",
    avatar: "/download-page/avatars/07.jpeg",
  },
  {
    name: "md.mosarraf Hossain",
    date: "অক্টোবর 25, 2026",
    body: "আগে শুধু একটা গেম খেলতাম, এখন মাঝে মাঝে অন্যগুলোও ট্রাই করি।",
    avatar: "/download-page/avatars/08.jpeg",
  },
  {
    name: "Ishwor Bashyal",
    date: "অক্টোবর 25, 2026",
    body: "সব মিলিয়ে অভিজ্ঞতাটা ভালো, অবসরে একটু সময় কাটানোর জন্য বেশ মানানসই।",
    avatar: "/download-page/avatars/09.jpeg",
  },
  {
    name: "BengalTiger",
    date: "অক্টোবর 24, 2026",
    body: "গেমটার রাউন্ডগুলো বেশ মজার, খেলতে বসলে সময়টা ভালোই কাটে।",
    avatar: "/download-page/avatars/10.jpeg",
  },
  {
    name: "mohammed miah598",
    date: "অক্টোবর 24, 2026",
    body: "সবকিছু বুঝতে বেশি সময় লাগেনি, প্রথমবার খেলেই বেশ সহজ মনে হয়েছে।",
    avatar: "/download-page/avatars/11.jpeg",
  },
  {
    name: "Khan Mdmamun",
    date: "অক্টোবর 24, 2026",
    body: "ফলের সিম্বলগুলো দেখতে বেশ সুন্দর, বিশেষ করে ঘুরতে থাকলে দেখতে ভালো লাগে।",
    avatar: "/download-page/avatars/12.jpeg",
  },
  {
    name: "billal bhai",
    date: "অক্টোবর 23, 2026",
    body: "গেমের ইন্টারফেসটা বেশ সুন্দর, সবকিছু সহজেই খুঁজে পাওয়া যায়।",
    avatar: "/download-page/avatars/13.jpeg",
  },
  {
    name: "🫀Riyad Islam 🫀",
    date: "অক্টোবর 23, 2026",
    body: "আজকে একটু সময় নিয়ে খেললাম, অভিজ্ঞতাটা বেশ ভালোই ছিল।",
    avatar: "/download-page/avatars/14.jpeg",
  },
  {
    name: "একলা_নবাব",
    date: "অক্টোবর 23, 2026",
    body: "এখানে গেমের কালেকশনটা ভালো লেগেছে, নিজের পছন্দমতো বেছে নেওয়া যায়।",
    avatar: "/download-page/avatars/15.jpeg",
  },
  {
    name: "Mohammad",
    date: "অক্টোবর 22, 2026",
    body: "ফলের গেমগুলো আমার আগে থেকেই পছন্দ, এখানে এসে খেলাটা আরও উপভোগ করছি।",
    avatar: "/download-page/avatars/16.jpeg",
  },
  {
    name: "Sifatullah",
    date: "অক্টোবর 22, 2026",
    body: "অনেক দিন পর এমন একটা গেম পেলাম, যেটা খুললেই একটু সময় কাটাতে ইচ্ছা করে।",
    avatar: "/download-page/avatars/17.jpeg",
  },
  {
    name: "md arpin al ob",
    date: "অক্টোবর 22, 2026",
    body: "গেমের সাউন্ড আর অ্যানিমেশনগুলো বেশ ভালো লাগে, খেলতে একঘেয়ে লাগে না।",
    avatar: "/download-page/avatars/18.jpeg",
  },
  {
    name: "Rayhan Ahmed",
    date: "অক্টোবর 21, 2026",
    body: "গেমটা বেশ স্মুথ চলে, খেলতে গিয়ে বিরক্ত লাগে না।",
    avatar: "/download-page/avatars/19.jpeg",
  },
  {
    name: "Md Roman Hayder",
    date: "অক্টোবর 21, 2026",
    body: "ফলের ডিজাইনগুলো সুন্দর, আর পুরো গেমটার লুকও বেশ আকর্ষণীয়।",
    avatar: "/download-page/avatars/20.jpeg",
  },
  {
    name: "MD KAMAL UDDIN",
    date: "অক্টোবর 21, 2026",
    body: "কয়েকবার খেলার পর গেমটার মজাটা বুঝতে পারলাম, এখন অবসরে খেলতে ভালো লাগে।",
    avatar: "/download-page/avatars/21.jpeg",
  },
  {
    name: "Shajidul Islam rimon",
    date: "অক্টোবর 20, 2026",
    body: "গেমটা খেলতে খেলতে কখন যে সময় চলে যায়, বুঝতেই পারি না!",
    avatar: "/download-page/avatars/22.jpeg",
  },
  {
    name: "Mr. Salman Shah.",
    date: "অক্টোবর 19, 2026",
    body: "আজকাল এই গেমটা খেলতে বেশ ভালোই লাগে 😊",
    avatar: "/download-page/avatars/23.jpeg",
  },
  {
    name: "Rishi Rocks",
    date: "অক্টোবর 19, 2026",
    body: "আজকে মুডটাই আলাদা ছিল, গেমটাও বেশ জমে গেল 😄",
    avatar: "/download-page/avatars/24.jpeg",
  },
  {
    name: "Mohammad Eliyas Hossain 🇧🇩",
    date: "অক্টোবর 19, 2026",
    body: "ফলের গেমটার ডিজাইনটা বেশ সুন্দর, খেলতেও ভালো লাগে।",
    avatar: "/download-page/avatars/25.jpeg",
  },
  {
    name: "Somaiya Jannat",
    date: "অক্টোবর 18, 2026",
    body: "আজকে বেশ ভালো লাগলো।",
    avatar: "/download-page/avatars/26.jpeg",
  },
  {
    name: "Md Sofik ahmed",
    date: "অক্টোবর 18, 2026",
    body: "ভাবতেই পারিনি এমন একটা চমক পাব! 😍 আজকের অভিজ্ঞতা সত্যিই দারুণ ছিল।",
    avatar: "/download-page/avatars/27.jpeg",
  },
  {
    name: "MD alaminMd Joss",
    date: "অক্টোবর 18, 2026",
    body: "অনেকদিন পর খেলতে বসলাম। প্রথমে তেমন কিছু আশা করিনি, কিন্তু শেষের দিকে অভিজ্ঞতাটা বেশ মজার হয়ে উঠল।",
    avatar: "/download-page/avatars/28.jpeg",
  },
];
