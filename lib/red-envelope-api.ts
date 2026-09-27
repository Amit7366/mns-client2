import { authFetchData } from "@/lib/auth/auth-fetch";

export type RedEnvelopeStatus = {
  canClaim: boolean;
  winAmount: number;
  cardCount: number;
  lastClaimedAt: string | null;
  nextClaimAt: string | null;
  lastAmount: number;
  remainingMs: number;
  totalClaimed: number;
};

export type RedEnvelopeClaimResult = {
  winAmount: number;
  decoyAmounts: number[];
  turnoverRequired: number;
  currentBalance: number;
  lastClaimedAt: string;
  nextClaimAt: string;
  remainingMs: number;
  totalClaimed: number;
};

export async function fetchRedEnvelopeStatus(): Promise<RedEnvelopeStatus> {
  return authFetchData<RedEnvelopeStatus>("/red-envelope/status");
}

export async function claimRedEnvelope(): Promise<RedEnvelopeClaimResult> {
  return authFetchData<RedEnvelopeClaimResult>("/red-envelope/claim", { method: "POST" });
}
