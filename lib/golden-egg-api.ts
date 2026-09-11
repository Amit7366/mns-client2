import { authFetchData } from "@/lib/auth/auth-fetch";

export type GoldenEggStatus = {
  canClaim: boolean;
  winAmount: number;
  eggCount: number;
  lastClaimedAt: string | null;
  nextClaimAt: string | null;
  lastAmount: number;
  remainingMs: number;
  totalClaimed: number;
};

export type GoldenEggClaimResult = {
  winAmount: number;
  decoyAmounts: number[];
  turnoverRequired: number;
  currentBalance: number;
  lastClaimedAt: string;
  nextClaimAt: string;
  remainingMs: number;
  totalClaimed: number;
};

export async function fetchGoldenEggStatus(): Promise<GoldenEggStatus> {
  return authFetchData<GoldenEggStatus>("/golden-egg/status");
}

export async function claimGoldenEgg(): Promise<GoldenEggClaimResult> {
  return authFetchData<GoldenEggClaimResult>("/golden-egg/claim", { method: "POST" });
}
