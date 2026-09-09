import type { Locale } from "@/lib/locale";
import type { HomeAnnouncementTabId } from "@/lib/home-announcement-data";

export type HomeAnnouncementHeading = {
  title: string;
  subtitle?: string;
  highlight: string;
  body: string[];
  note?: string;
};

export type HomeAnnouncementMessages = {
  title: string;
  close: string;
  go: string;
  tabs: Record<HomeAnnouncementTabId, string>;
  headings: Record<HomeAnnouncementTabId, HomeAnnouncementHeading>;
};

const en: HomeAnnouncementMessages = {
  title: "Announcement",
  close: "Close",
  go: "Go",
  tabs: {
    delayBonus: "Compensation bonus for delayed transactions",
    gameIdPay: "How to deposit to a personal account",
    fastPay: "FAST PAYMENT recharge process",
    loginBonus: "Daily login lucky bonus",
    notice: "Important information!",
    referral: "Invite 1 friend and earn ৳1000",
    slotLoss: "Slot loss recovery bonus up to 30%",
  },
  headings: {
    delayBonus: {
      title: "Compensation bonus for delayed transactions",
      subtitle: "Get ৳999 if a deposit or withdrawal is delayed",
      highlight: "We are truly grateful for your trust.",
      body: [
        "If a deposit or withdrawal is delayed on our platform, you will receive a ৳999 compensation bonus.",
        "This bonus is a goodwill payment for waiting. After your delayed transaction is completed, the bonus is credited to your account.",
        "You can deposit or withdraw with bKash, Nagad, Rocket, and Upay. Keep your transaction ID ready if you need support.",
      ],
      note: "The bonus is paid only when the delay is on our side, not for bank or wallet network issues.",
    },
    gameIdPay: {
      title: "How to deposit to a personal account",
      subtitle: "How to pay using a personal account",
      highlight: "Copy the number, send money, then paste the transaction ID.",
      body: [
        "This method uses a personal wallet number shown on the deposit page. Copy that number first.",
        "Open the bKash or Nagad app, tap Send Money, paste the number, enter the amount, and complete the payment.",
        "After the payment succeeds, copy the transaction ID from the success screen and paste it on the deposit page, then tap Confirm.",
        "The left guide is for bKash and the right guide is for Nagad. Follow the same 6 steps in both apps.",
      ],
      note: "Send money only to the number shown on our deposit page. Do not use numbers from messages or social media.",
    },
    fastPay: {
      title: "FAST PAYMENT recharge process",
      subtitle: "How to pay using FAST PAYMENT",
      highlight: "Pay from your own bKash or Nagad wallet in a few steps.",
      body: [
        "FAST PAYMENT is the fastest way to top up. Choose bKash or Nagad as your payment wallet.",
        "Enter the deposit amount, then type your own wallet number. You will receive an OTP on that number.",
        "Enter the OTP and your wallet PIN to confirm. After verification you are redirected back and the deposit is completed.",
        "Use the left image for bKash and the right image for Nagad. Both follow the same 6-step flow.",
      ],
      note: "Never share your OTP or PIN with anyone. Our team will never ask for them.",
    },
    loginBonus: {
      title: "Daily login lucky bonus",
      subtitle: "Don't forget to collect your red envelopes",
      highlight: "Rain of 8 red envelopes every day. Don't forget to collect!",
      body: [
        "Log in every day and collect lucky red envelopes. There are 8 envelopes each day with bonus amounts waiting for you.",
        "The daily bonus pool can reach up to ৳1,000,000. Open the Reward Center after login and tap to collect.",
        "Bonuses are credited to your account after you collect them. Come back each day so you do not miss a round.",
      ],
      note: "You must log in and collect the envelopes yourself. Uncollected envelopes expire at the end of the day.",
    },
    notice: {
      title: "Important information!",
      subtitle: "Official domain connected to our platform",
      highlight: "Remember our official domain: CV66.COM",
      body: [
        "Please save our official website address so you always open the real platform.",
        "Fake websites may look similar and try to steal your login or payment details. Always check the domain before you sign in or deposit.",
        "Take a screenshot of this notice and keep it on your phone. Share only the official address with friends.",
      ],
      note: "If a site is not our official domain, do not enter your password or make any payment there.",
    },
    referral: {
      title: "Invite 1 friend and earn ৳1000",
      subtitle: "Refer 1 friend and get a ৳1000 bonus",
      highlight: "Refer 1 friend — get a ৳1000 bonus.",
      body: [
        "Share your referral link or code with a friend. When they register through your invite, you can earn a ৳1000 bonus.",
        "Your friend should complete registration and make a valid first deposit as required by the promotion.",
        "Open the Referral page to copy your link, track invites, and see bonus status. You can share via bKash, Nagad, Rocket, or Upay chats too.",
      ],
      note: "Self-referrals and fake accounts are not allowed. Bonus rules may require a minimum deposit from the invited friend.",
    },
    slotLoss: {
      title: "Slot loss recovery bonus up to 30%",
      subtitle: "Get up to 30% loss recovery bonus",
      highlight: "Play slots with extra protection — recover up to 30% of losses.",
      body: [
        "If you play slot games and finish with a net loss, you can get a loss-recovery bonus of up to 30%.",
        "The bonus is calculated from eligible slot bets in the promotion period and credited according to the reward rules.",
        "Open the Slot lobby to play eligible games. After the period ends, check Reward Center for the recovery amount.",
      ],
      note: "Only slot games are included. Casino, sports, and other categories are not part of this 30% recovery offer.",
    },
  },
};

const bn: HomeAnnouncementMessages = {
  title: "ঘোষণা",
  close: "বন্ধ",
  go: "যাও",
  tabs: {
    delayBonus: "বিলম্বিত লেনদেনের জন্য ক্ষতিপূরণ বোনাস",
    gameIdPay: "ব্যক্তিগত অ্যাকাউন্টে টাকা জমা করার প্রক্রিয়া",
    fastPay: "FAST PAYMENT রিচার্জ প্রক্রিয়া",
    loginBonus: "দৈনিক লগইন লাকি বোনাস",
    notice: "গুরুত্বপূর্ণ তথ্য!",
    referral: "১জনকে আমন্ত্রণ জানান এবং ১০০০ টাকা উপার্জন",
    slotLoss: "স্লট মেশিন লস রিকভার বোনাস ৩০% পর্যন্ত",
  },
  headings: {
    delayBonus: {
      title: "বিলম্বিত লেনদেনের জন্য ক্ষতিপূরণ বোনাস",
      subtitle: "বিলম্ব হলে আপনি ৯৯৯ টাকা বোনাস পাবেন",
      highlight: "আপনাকে আমাদের গভীর কৃতজ্ঞতা জানাচ্ছি!",
      body: [
        "আমাদের প্ল্যাটফর্মে ডিপোজিট বা উত্তোলন বিলম্বিত হলে আপনি ৯৯৯ টাকা ক্ষতিপূরণ বোনাস পাবেন।",
        "এই বোনাস অপেক্ষার জন্য একটি সদিচ্ছা পেমেন্ট। বিলম্বিত লেনদেন সম্পন্ন হলে বোনাস আপনার অ্যাকাউন্টে যোগ হবে।",
        "bKash, Nagad, Rocket এবং Upay দিয়ে ডিপোজিট বা উইথড্র করতে পারেন। সাপোর্ট লাগলে ট্রানজেকশন আইডি রাখুন।",
      ],
      note: "বোনাস কেবল আমাদের পক্ষের বিলম্বের জন্য প্রযোজ্য, ব্যাংক বা ওয়ালেট নেটওয়ার্ক সমস্যার জন্য নয়।",
    },
    gameIdPay: {
      title: "ব্যক্তিগত অ্যাকাউন্টে টাকা জমা করার প্রক্রিয়া",
      subtitle: "কীভাবে ব্যক্তিগত অ্যাকাউন্ট ব্যবহার করে পেমেন্ট করবেন",
      highlight: "নম্বর কপি করুন, সেন্ড মানি করুন, তারপর ট্রানজেকশন আইডি পেস্ট করুন।",
      body: [
        "এই পদ্ধতিতে ডিপোজিট পেজে দেখানো ব্যক্তিগত ওয়ালেট নম্বর ব্যবহার করতে হয়। প্রথমে সেই নম্বরটি কপি করুন।",
        "bKash বা Nagad অ্যাপ খুলে সেন্ড মানি-তে ক্লিক করুন, নম্বর পেস্ট করুন, টাকার পরিমাণ লিখুন এবং পেমেন্ট সম্পন্ন করুন।",
        "পেমেন্ট সফল হলে সাকসেস স্ক্রিন থেকে ট্রানজেকশন আইডি কপি করে ডিপোজিট পেজে পেস্ট করুন, তারপর কনফার্ম চাপুন।",
        "বাম পাশের গাইড bKash-এর জন্য এবং ডান পাশের গাইড Nagad-এর জন্য। দুই অ্যাপেই একই ৬টি ধাপ অনুসরণ করুন।",
      ],
      note: "শুধু আমাদের ডিপোজিট পেজে দেখানো নম্বরে টাকা পাঠান। মেসেজ বা সোশ্যাল মিডিয়ার নম্বর ব্যবহার করবেন না।",
    },
    fastPay: {
      title: "FAST PAYMENT রিচার্জ প্রক্রিয়া",
      subtitle: "কীভাবে FAST PAYMENT ব্যবহার করে পেমেন্ট করবেন",
      highlight: "নিজের bKash বা Nagad ওয়ালেট থেকে কয়েক ধাপে পেমেন্ট করুন।",
      body: [
        "FAST PAYMENT সবচেয়ে দ্রুত টপ-আপ পদ্ধতি। পেমেন্ট ওয়ালেট হিসেবে bKash বা Nagad বেছে নিন।",
        "ডিপোজিটের পরিমাণ লিখুন, তারপর নিজের ওয়ালেট নম্বর দিন। সেই নম্বরে OTP পাবেন।",
        "OTP এবং ওয়ালেট PIN দিয়ে নিশ্চিত করুন। ভেরিফিকেশনের পর আপনি ফিরে আসবেন এবং ডিপোজিট সম্পন্ন হবে।",
        "বাম ছবি bKash এবং ডান ছবি Nagad-এর জন্য। দুটোতেই একই ৬ ধাপের প্রক্রিয়া।",
      ],
      note: "OTP বা PIN কারও সাথে শেয়ার করবেন না। আমাদের টিম কখনো এগুলো চাইবে না।",
    },
    loginBonus: {
      title: "দৈনিক লগইন লাকি বোনাস",
      subtitle: "প্রতিদিন লাল খাম সংগ্রহ করতে ভুলবেন না",
      highlight: "প্রতিদিন ৮টি লাল খামের বৃষ্টি। সংগ্রহ করতে ভুলবেন না!",
      body: [
        "প্রতিদিন লগইন করে লাকি লাল খাম সংগ্রহ করুন। প্রতিদিন ৮টি খামে বোনাস অপেক্ষা করছে।",
        "দৈনিক বোনাস পুল ১০,০০,০০০ টাকা পর্যন্ত হতে পারে। লগইনের পর রিওয়ার্ড সেন্টার খুলে সংগ্রহ করুন।",
        "খাম সংগ্রহ করার পর বোনাস অ্যাকাউন্টে যোগ হয়। প্রতিদিন ফিরে আসুন যাতে কোনো রাউন্ড মিস না হয়।",
      ],
      note: "খাম নিজে লগইন করে সংগ্রহ করতে হবে। না তোলা খাম দিন শেষে মেয়াদ শেষ হয়ে যায়।",
    },
    notice: {
      title: "গুরুত্বপূর্ণ তথ্য!",
      subtitle: "আমাদের প্ল্যাটফর্মে সংযুক্ত মূল ডোমেইন নাম",
      highlight: "আমাদের অফিসিয়াল ডোমেইন মনে রাখুন: CV66.COM",
      body: [
        "সঠিক প্ল্যাটফর্ম খুলতে আমাদের অফিসিয়াল ওয়েবসাইট ঠিকানা সেভ করে রাখুন।",
        "নকল ওয়েবসাইট দেখতে একই রকম হতে পারে এবং লগইন বা পেমেন্ট তথ্য চুরি করার চেষ্টা করতে পারে। সাইন ইন বা ডিপোজিটের আগে ডোমেইন যাচাই করুন।",
        "এই নোটিশের একটি স্ক্রিনশট ফোনে রাখুন। বন্ধুদের সাথে শুধু অফিসিয়াল ঠিকানা শেয়ার করুন।",
      ],
      note: "যে সাইট আমাদের অফিসিয়াল ডোমেইন নয়, সেখানে পাসওয়ার্ড দেবেন না এবং কোনো পেমেন্ট করবেন না।",
    },
    referral: {
      title: "১জনকে আমন্ত্রণ জানান এবং ১০০০ টাকা উপার্জন",
      subtitle: "১ জন বন্ধু রেফার করুন, ১০০০ টাকা বোনাস",
      highlight: "১ জন বন্ধু রেফার করুন — ১০০০ টাকা বোনাস পান।",
      body: [
        "আপনার রেফারেল লিংক বা কোড বন্ধুর সাথে শেয়ার করুন। তার আমন্ত্রণে রেজিস্টার করলে আপনি ১০০০ টাকা বোনাস পেতে পারেন।",
        "বন্ধুকে রেজিস্ট্রেশন সম্পন্ন করতে হবে এবং প্রমোশনের নিয়ম অনুযায়ী বৈধ প্রথম ডিপোজিট করতে হবে।",
        "রেফারেল পেজ থেকে লিংক কপি করুন, আমন্ত্রণ ট্র্যাক করুন এবং বোনাসের অবস্থা দেখুন। bKash, Nagad, Rocket বা Upay চ্যাটেও শেয়ার করা যায়।",
      ],
      note: "নিজেকে রেফার বা নকল অ্যাকাউন্ট চলবে না। বোনাসের জন্য আমন্ত্রিত বন্ধুর ন্যূনতম ডিপোজিট লাগতে পারে।",
    },
    slotLoss: {
      title: "স্লট মেশিন লস রিকভার বোনাস ৩০% পর্যন্ত",
      subtitle: "৩০% পর্যন্ত লস রিকভারী বোনাস",
      highlight: "স্লট খেলুন অতিরিক্ত সুরক্ষা নিয়ে — লসের ৩০% পর্যন্ত ফিরে পান।",
      body: [
        "স্লট গেম খেলে নেট লস হলে আপনি সর্বোচ্চ ৩০% পর্যন্ত লস রিকভারী বোনাস পেতে পারেন।",
        "বোনাস প্রমোশন পিরিয়ডের যোগ্য স্লট বেট থেকে হিসাব হয় এবং রিওয়ার্ড নিয়ম অনুযায়ী জমা হয়।",
        "যোগ্য গেম খেলতে স্লট লবি খুলুন। পিরিয়ড শেষে রিকভারী পরিমাণ রিওয়ার্ড সেন্টারে দেখুন।",
      ],
      note: "শুধু স্লট গেম এই অফারে আছে। ক্যাসিনো, স্পোর্টস ও অন্য ক্যাটাগরি ৩০% রিকভারীতে পড়ে না।",
    },
  },
};

const hi: HomeAnnouncementMessages = {
  title: "घोषणा",
  close: "बंद करें",
  go: "जाएँ",
  tabs: {
    delayBonus: "देरी लेनदेन के लिए मुआवजा बोनस",
    gameIdPay: "व्यक्तिगत खाते में जमा करने की प्रक्रिया",
    fastPay: "FAST PAYMENT रिचार्ज प्रक्रिया",
    loginBonus: "दैनिक लॉगिन लकी बोनस",
    notice: "महत्वपूर्ण जानकारी!",
    referral: "1 मित्र को आमंत्रित करें और ৳1000 कमाएँ",
    slotLoss: "स्लॉट लॉस रिकवरी बोनस 30% तक",
  },
  headings: {
    delayBonus: {
      title: "देरी लेनदेन के लिए मुआवजा बोनस",
      subtitle: "देरी होने पर आपको ৳999 बोनस मिलेगा",
      highlight: "आपके विश्वास के लिए हम दिल से आभारी हैं।",
      body: [
        "हमारे प्लेटफ़ॉर्म पर जमा या निकासी में देरी होने पर आपको ৳999 मुआवजा बोनस मिलेगा।",
        "यह बोनस इंतज़ार के लिए सद्भावना भुगतान है। देरी वाला लेनदेन पूरा होने के बाद बोनस खाते में जुड़ जाएगा।",
        "आप bKash, Nagad, Rocket और Upay से जमा या निकासी कर सकते हैं। सहायता के लिए ट्रांजैक्शन आईडी रखें।",
      ],
      note: "बोनस केवल हमारी तरफ की देरी पर मिलता है, बैंक या वॉलेट नेटवर्क समस्या पर नहीं।",
    },
    gameIdPay: {
      title: "व्यक्तिगत खाते में जमा करने की प्रक्रिया",
      subtitle: "व्यक्तिगत खाते से भुगतान कैसे करें",
      highlight: "नंबर कॉपी करें, सेंड मनी करें, फिर ट्रांजैक्शन आईडी पेस्ट करें।",
      body: [
        "इस विधि में डिपॉजिट पेज पर दिखाया गया व्यक्तिगत वॉलेट नंबर इस्तेमाल होता है। पहले वही नंबर कॉपी करें।",
        "bKash या Nagad ऐप खोलें, सेंड मनी दबाएँ, नंबर पेस्ट करें, राशि लिखें और भुगतान पूरा करें।",
        "सफल भुगतान के बाद सक्सेस स्क्रीन से ट्रांजैक्शन आईडी कॉपी कर डिपॉजिट पेज पर पेस्ट करें, फिर कन्फर्म दबाएँ।",
        "बायाँ गाइड bKash के लिए और दायाँ गाइड Nagad के लिए है। दोनों ऐप में वही 6 चरण अपनाएँ।",
      ],
      note: "पैसे केवल हमारे डिपॉजिट पेज वाले नंबर पर भेजें। मैसेज या सोशल मीडिया के नंबर इस्तेमाल न करें।",
    },
    fastPay: {
      title: "FAST PAYMENT रिचार्ज प्रक्रिया",
      subtitle: "FAST PAYMENT से भुगतान कैसे करें",
      highlight: "अपने bKash या Nagad वॉलेट से कुछ चरणों में भुगतान करें।",
      body: [
        "FAST PAYMENT सबसे तेज़ टॉप-अप तरीका है। भुगतान वॉलेट के रूप में bKash या Nagad चुनें।",
        "जमा राशि लिखें, फिर अपना वॉलेट नंबर दें। उसी नंबर पर OTP आएगा।",
        "OTP और वॉलेट PIN से पुष्टि करें। वेरिफिकेशन के बाद आप वापस आएँगे और जमा पूरा हो जाएगा।",
        "बाईं तस्वीर bKash और दाईं तस्वीर Nagad के लिए है। दोनों में वही 6 चरण हैं।",
      ],
      note: "OTP या PIN किसी के साथ साझा न करें। हमारी टीम इन्हें कभी नहीं माँगेगी।",
    },
    loginBonus: {
      title: "दैनिक लॉगिन लकी बोनस",
      subtitle: "लाल लिफाफे लेना न भूलें",
      highlight: "हर दिन 8 लाल लिफाफों की बारिश। लेना न भूलें!",
      body: [
        "हर दिन लॉगिन कर लकी लाल लिफाफे लें। हर दिन 8 लिफाफों में बोनस इंतज़ार कर रहा है।",
        "दैनिक बोनस पूल ৳1,000,000 तक हो सकता है। लॉगिन के बाद रिवॉर्ड सेंटर खोलकर कलेक्ट करें।",
        "लिफाफे लेने के बाद बोनस खाते में जुड़ता है। हर दिन लौटें ताकि कोई राउंड छूट न जाए।",
      ],
      note: "लिफाफे स्वयं लॉगिन करके लेने होंगे। न लिए गए लिफाफे दिन के अंत में समाप्त हो जाते हैं।",
    },
    notice: {
      title: "महत्वपूर्ण जानकारी!",
      subtitle: "हमारे प्लेटफ़ॉर्म से जुड़ा मुख्य डोमेन",
      highlight: "हमारा आधिकारिक डोमेन याद रखें: CV66.COM",
      body: [
        "सही प्लेटफ़ॉर्म खोलने के लिए हमारी आधिकारिक वेबसाइट का पता सेव करें।",
        "नकली वेबसाइटें दिखने में मिलती-जुलती हो सकती हैं और लॉगिन या भुगतान जानकारी चुराने की कोशिश कर सकती हैं। साइन इन या जमा से पहले डोमेन जाँचें।",
        "इस सूचना का स्क्रीनशॉट फोन में रखें। दोस्तों के साथ केवल आधिकारिक पता साझा करें।",
      ],
      note: "जो साइट हमारा आधिकारिक डोमेन नहीं है, वहाँ पासवर्ड न डालें और कोई भुगतान न करें।",
    },
    referral: {
      title: "1 मित्र को आमंत्रित करें और ৳1000 कमाएँ",
      subtitle: "1 मित्र रेफर करें, ৳1000 बोनस पाएं",
      highlight: "1 मित्र रेफर करें — ৳1000 बोनस पाएँ।",
      body: [
        "अपना रेफरल लिंक या कोड मित्र के साथ साझा करें। उनके आमंत्रण से रजिस्टर होने पर आपको ৳1000 बोनस मिल सकता है।",
        "मित्र को रजिस्ट्रेशन पूरा करना होगा और प्रमोशन के नियम के अनुसार वैध पहली जमा करनी होगी।",
        "रेफरल पेज से लिंक कॉपी करें, आमंत्रण ट्रैक करें और बोनस स्थिति देखें। bKash, Nagad, Rocket या Upay चैट से भी शेयर कर सकते हैं।",
      ],
      note: "स्व-रेफरल और नकली खाते मान्य नहीं हैं। बोनस के लिए आमंत्रित मित्र की न्यूनतम जमा लग सकती है।",
    },
    slotLoss: {
      title: "स्लॉट लॉस रिकवरी बोनस 30% तक",
      subtitle: "30% तक लॉस रिकवरी बोनस",
      highlight: "स्लॉट खेलें अतिरिक्त सुरक्षा के साथ — नुकसान का 30% तक वापस पाएँ।",
      body: [
        "स्लॉट गेम खेलकर नेट लॉस होने पर आपको अधिकतम 30% तक लॉस रिकवरी बोनस मिल सकता है।",
        "बोनस प्रमोशन अवधि के योग्य स्लॉट बेट से हिसाब होता है और रिवॉर्ड नियमों के अनुसार जमा होता है।",
        "योग्य गेम खेलने के लिए स्लॉट लॉबी खोलें। अवधि खत्म होने पर रिकवरी राशि रिवॉर्ड सेंटर में देखें।",
      ],
      note: "केवल स्लॉट गेम इस ऑफर में हैं। कैसीनो, स्पोर्ट्स और अन्य कैटेगरी 30% रिकवरी में नहीं आते।",
    },
  },
};

export function getHomeAnnouncementMessages(locale: Locale): HomeAnnouncementMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}
