import type { Metadata } from "next";
import DownloadLanding from "@/components/download/DownloadLanding";
import { DOWNLOAD_APP_DOMAIN, DOWNLOAD_APP_NAME } from "@/lib/download-page-content";

export const metadata: Metadata = {
  title: `${DOWNLOAD_APP_NAME} — Download`,
  description: `${DOWNLOAD_APP_DOMAIN} অ্যাপ ডাউনলোড করুন।`,
};

export default function DownloadPage() {
  return <DownloadLanding />;
}
