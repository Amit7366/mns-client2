import { SITE_NAME } from "@/lib/seo/site-config";

type SiteLogoProps = {
  className?: string;
  compact?: boolean;
};

export default function SiteLogo({ className = "", compact = false }: SiteLogoProps) {
  return (
    <span
      className={`inline-flex items-baseline font-black tracking-tight ${
        compact ? "text-[15px] sm:text-[18px]" : "text-[18px] sm:text-[22px] lg:text-[24px]"
      } ${className}`}
      aria-label={SITE_NAME}
    >
      <span
        className="bg-gradient-to-b from-[#ffe98a] via-[#f5c518] to-[#d49212] bg-clip-text text-transparent"
        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.25)" }}
      >
        BB
      </span>
      <span className="text-white">666</span>
    </span>
  );
}
