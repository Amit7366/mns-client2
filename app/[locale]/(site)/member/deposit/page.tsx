import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MemberDepositPage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}/member/deposit/quick`);
}
