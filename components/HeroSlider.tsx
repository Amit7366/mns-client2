"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useLocale } from "./LocaleProvider";

const HERO_SLIDES = [
  "https://i.ibb.co.com/1tDnhctp/slide5.png",
  "https://i.ibb.co.com/Wp0vVmTn/slide6.png",
  "https://i.ibb.co.com/m5qMsSJC/slider1.png",
  "https://i.ibb.co.com/0Rg1twk7/slider2.png",
  "https://i.ibb.co.com/SXHtJPf9/slider3.png",
  "https://i.ibb.co.com/p6Bnwcds/slider4.png",
];

export default function HeroSlider() {
  const { t } = useLocale();

  return (
    <section className="hero-swiper relative w-full bg-[var(--bg)] pt-2 sm:pt-3">
      <div className="relative mx-auto w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          centeredSlides
          loop
          slidesPerView={1.18}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 1.2, spaceBetween: 12 },
            1024: { slidesPerView: 1.22, spaceBetween: 14 },
          }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-swiper-instance w-full"
          aria-label={t.ui.goToSlide}
        >
          {HERO_SLIDES.map((src, index) => (
            <SwiperSlide key={src} className="!h-auto">
              <div className="relative h-[150px] w-full overflow-hidden rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] sm:h-[205px] sm:rounded-[14px] md:h-[245px] lg:h-[300px] lg:rounded-[16px]">
                <Image
                  src={src}
                  alt={`${t.ui.goToSlide} ${index + 1}`}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="(max-width: 768px) 85vw, 1100px"
                  className="select-none object-cover object-center"
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
