import type { ReactNode } from "react";
import { SITE_ICONS } from "@/lib/seo/site-config";
import InstallPrompt from "./InstallPrompt";
import {
  DOWNLOAD_ABOUT,
  DOWNLOAD_APP_DOMAIN,
  DOWNLOAD_APP_NAME,
  DOWNLOAD_REVIEWS,
  DOWNLOAD_SHOTS,
} from "@/lib/download-page-content";
import styles from "./DownloadLanding.module.css";

const ICON = "/download-page/icons";

function StarRow({ half = false }: { half?: boolean }) {
  return (
    <span className="inline-flex items-center">
      {Array.from({ length: half ? 4 : 5 }, (_, index) => (
        <img
          key={index}
          src={`${ICON}/star.png`}
          alt=""
          className="mr-0.5 h-3.5 w-3.5"
        />
      ))}
      {half ? (
        <img src={`${ICON}/star-half.png`} alt="" className="mr-0.5 h-3.5 w-3.5" />
      ) : null}
    </span>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between text-lg font-bold text-[#202124]">
      <span>{children}</span>
      <img src={`${ICON}/arrow.png`} alt="" className="h-[0.9375rem] w-[0.9375rem]" />
    </div>
  );
}

function RatingBar({ label, width }: { label: string; width: string }) {
  return (
    <div className="flex items-center justify-between text-[0.6875rem]">
      <span>{label}</span>
      <div className="ml-3.5 h-[0.5625rem] w-40 rounded-md bg-[#e3e3e3]">
        {width !== "0" ? (
          <p className="h-full rounded-md bg-[rgb(2,135,96)]" style={{ width }} />
        ) : null}
      </div>
    </div>
  );
}

export default function DownloadLanding() {
  return (
    <div
      data-download-scroll
      className={`${styles.page} fixed inset-0 overflow-y-auto bg-[#dde8ff] text-sm text-[#5f6368]`}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap"
      />
      <article className="mx-auto min-h-full w-full max-w-[486px] bg-[#f5f6f8]">
        <div className="px-6 pt-6">
          <header className="flex items-center">
            <img
              src={SITE_ICONS.pwa512}
              alt=""
              className="mr-6 h-[4.5rem] w-[4.5rem] overflow-hidden rounded-[20%] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="w-[15.375rem] max-w-full truncate text-2xl leading-none text-black">
                {DOWNLOAD_APP_NAME}
              </p>
              <p className="mt-1 text-xl leading-none text-[#01875f]">{DOWNLOAD_APP_DOMAIN}</p>
              <p className="mt-1 text-xs text-[#5f6368]">অ্যাপ যাচাই হয়েছে</p>
            </div>
          </header>

          <div className="my-6 flex items-center text-sm">
            <div className="flex flex-1 flex-col items-center">
              <p className="font-semibold text-black">4.9 ★</p>
              <p className="text-xs text-[#5f6368]">999 পর্যালোচনা</p>
            </div>
            <i className="h-6 w-px bg-[#e8eaed]" />
            <div className="flex flex-1 flex-col items-center">
              <p className="font-semibold text-black">100K+</p>
              <p className="text-xs text-[#5f6368]">ডাউনলোড হচ্ছে</p>
            </div>
            <i className="h-6 w-px bg-[#e8eaed]" />
            <div className="flex flex-1 flex-col items-center">
              <p className="font-semibold text-black">21+</p>
              <p className="text-xs text-[#5f6368]">রেটেড 21+</p>
            </div>
          </div>

          <InstallPrompt
            className={`${styles.install} mb-6 flex h-14 w-full flex-col items-center justify-center rounded-lg bg-[#01875f] px-2 py-2.5 text-xs text-white`}
          >
            <span className="relative z-[2] flex items-center">
              <img src={`${ICON}/ic_sd.png`} alt="" className="mr-1 h-3 w-3" />
              <span className="text-sm text-[#ffe336]">দ্রুত ইনস্টল</span>
            </span>
            <span className="relative z-[2]">15 সেকেন্ডে ডাউনলোড</span>
          </InstallPrompt>
        </div>

        <div className={`${styles.shots} flex overflow-x-auto px-6`}>
          {DOWNLOAD_SHOTS.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="mr-2 h-56 w-[7.875rem] shrink-0 object-cover last:mr-0"
            />
          ))}
        </div>

        <div className="px-6 pb-10">
          <section className="mt-6">
            <SectionTitle>এই অ্যাপ সম্পর্কে</SectionTitle>
            <p className="text-sm leading-5 text-[#5f6368]">{DOWNLOAD_ABOUT}</p>
          </section>

          <section className="mt-6">
            <h2 className="mb-2 font-bold text-[#202124]">হালনাগাদ হয়েছে</h2>
            <p>জানুয়ারি 01, 2026</p>
          </section>

          <section className="mt-6">
            <SectionTitle>ডেটা নিরাপত্তা</SectionTitle>
            <p className="leading-5">
              আপনার সুরক্ষা শুরু হয় বোঝার মাধ্যমে যে ডেভেলপাররা কিভাবে আপনার ডেটা সংগ্রহ এবং
              শেয়ার করে। ডেটা সুরক্ষা এবং গোপনীয়তা অনুশীলন ব্যবহার, অঞ্চল এবং বয়সের উপর ভিত্তি
              করে ভিন্ন হতে পারে। ডেভেলপার নিম্নলিখিত তথ্য প্রদান করেছেন, যা সময়ের সাথে আপডেট হতে
              পারে।
            </p>
            <div className="mt-6 rounded-lg border border-[#e5e7eb] p-6">
              <SafetyRow icon="share.png">
                <p>এই অ্যাপ তৃতীয় পক্ষের সাথে এই ধরনের ডেটা শেয়ার করতে পারে</p>
                <p>অবস্থান, আর্থিক তথ্য, ডিভাইস আইডেন্টিফায়ার ইত্যাদি</p>
              </SafetyRow>
              <SafetyRow icon="cloud.png" className="mt-4">
                <p>
                  এই অ্যাপ এই ধরনের ডেটা সংগ্রহ করতে পারে: অবস্থান, ব্যক্তিগত তথ্য এবং আরও অনেক
                  কিছু
                </p>
              </SafetyRow>
              <SafetyRow icon="lock.png" className="mt-4">
                <p>ডেটা এনক্রিপ্ট করা হয়নি</p>
              </SafetyRow>
              <SafetyRow icon="delete.png" className="mt-4">
                <p>আপনি ডেটা মুছে ফেলার অনুরোধ করতে পারেন</p>
              </SafetyRow>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mb-3 text-[1.1875rem] font-bold text-[#202124]">রেটিং এবং রিভিউ</h2>
            <p className="leading-5">
              রেটিং এবং রিভিউ যাচাই করা হয়েছে এবং আপনার ডিভাইসের ধরণের ব্যবহারকারীদের কাছ থেকে
              এসেছে রেটিং এবং রিভিউ যাচাই করা হয়েছে এবং আপনার ডিভাইসের ধরণের ব্যবহারকারীদের কাছ
              থেকে এসেছে
            </p>

            <div className="mt-6 flex flex-wrap">
              <DeviceChip icon="phone.png" active>
                মোবাইল ফোন
              </DeviceChip>
              <DeviceChip icon="tablet.png">ট্যাবলেট</DeviceChip>
              <DeviceChip icon="chromebook.png">ক্রোমবুক</DeviceChip>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-[1.625rem] leading-tight text-[#202124]">4.9</div>
                <StarRow half />
                <div className="my-1.5 text-xs leading-loose">999</div>
              </div>
              <div>
                <RatingBar label="5" width="100%" />
                <RatingBar label="4" width="16px" />
                <RatingBar label="3" width="16px" />
                <RatingBar label="2" width="0" />
                <RatingBar label="1" width="0" />
              </div>
            </div>

            <ul>
              {DOWNLOAD_REVIEWS.map((review) => (
                <li key={`${review.name}-${review.date}`} className="mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center">
                      <img
                        src={review.avatar}
                        alt=""
                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                      />
                      <div className="ml-3 truncate">{review.name}</div>
                    </div>
                    <img src={`${ICON}/more.png`} alt="" className="h-4 w-1 shrink-0" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <StarRow />
                    <span className="ml-2 text-xs">{review.date}</span>
                  </div>
                  <p className="mt-3">{review.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}

function SafetyRow({
  icon,
  className = "",
  children,
}: {
  icon: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex items-start ${className}`}>
      <img src={`${ICON}/${icon}`} alt="" className="mr-4 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

function DeviceChip({
  icon,
  active = false,
  children,
}: {
  icon: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`mr-4 mt-2.5 flex items-center rounded-[0.9375rem] border border-[#dadce0] px-3 ${
        active ? "bg-[#e6f3ef] text-[#028760]" : ""
      }`}
    >
      <img src={`${ICON}/${icon}`} alt="" className="mr-1 h-[0.8125rem] w-[0.8125rem]" />
      {children}
    </div>
  );
}
