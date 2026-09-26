export type HomeAnnouncementTabId =
  | "delayBonus"
  | "gameIdPay"
  | "fastPay"
  | "loginBonus"
  | "notice"
  | "referral"
  | "slotLoss";

export type HomeAnnouncementTab = {
  id: HomeAnnouncementTabId;
  images: string[];
  go: "deposit" | "reward" | "referral" | "slot" | "close";
};

export const HOME_ANNOUNCEMENT_TABS: HomeAnnouncementTab[] = [
  {
    id: "delayBonus",
    images: [
      "https://res.cloudinary.com/dtmkefol8/image/upload/v1790413928/home-image-1_wxvwjr.png",
    ],
    go: "deposit",
  },
  {
    id: "gameIdPay",
    images: [
      "https://images.39393929.com/mcs-images/announcement/fr555bdtf6/1783531723356_Bkash__2_.png",
      "https://images.39393929.com/mcs-images/announcement/fr555bdtf6/1783531737582_Nogod.png",
    ],
    go: "deposit",
  },
  {
    id: "fastPay",
    images: [
      "https://images.39393929.com/mcs-images/announcement/fr555bdtf6/1783530667031_bKash-_XOPAY.png",
      "https://images.39393929.com/mcs-images/announcement/fr555bdtf6/1783530681254_Nagad_-_XOPAY.png",
    ],
    go: "deposit",
  },
  {
    id: "loginBonus",
    images: [
      "https://res.cloudinary.com/dtmkefol8/image/upload/v1790413928/home-image-2_cqmvbo.png",
    ],
    go: "reward",
  },
  {
    id: "notice",
    images: [
      "https://res.cloudinary.com/dtmkefol8/image/upload/v1790413928/home-image-3_yrd5oz.png",
    ],
    go: "close",
  },
  {
    id: "referral",
    images: [
      "https://res.cloudinary.com/dtmkefol8/image/upload/v1790413927/home-image-4_q1yeeh.png",
    ],
    go: "referral",
  },
  {
    id: "slotLoss",
    images: [
      "https://res.cloudinary.com/dtmkefol8/image/upload/v1790413928/home-image-5_zrqwxh.png",
    ],
    go: "slot",
  },
];
