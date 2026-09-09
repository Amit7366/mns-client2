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
      "https://images.39393929.com/mcs-images/announcement/cv666bdtf6/1787225497084_1742054089768_Delayed_Deposit_Withdrawal_Bonus.png",
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
      "https://images.39393929.com/mcs-images/announcement/cv666bdtf6/1742053580481_Red%20Envelope.png",
    ],
    go: "reward",
  },
  {
    id: "notice",
    images: [
      "https://images.39393929.com/mcs-images/announcement/cv666bdtf6/1753526535398_cv66_com_web.png",
    ],
    go: "close",
  },
  {
    id: "referral",
    images: [
      "https://images.39393929.com/mcs-images/announcement/cv666bdtf6/1742048484790_Refer%20a%20friend.png",
    ],
    go: "referral",
  },
  {
    id: "slotLoss",
    images: [
      "https://images.39393929.com/mcs-images/announcement/cv666bdtf6/1745943139067_8888_11zon_11zon.png",
    ],
    go: "slot",
  },
];
