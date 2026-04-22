import { delay } from "@/shared/lib/mockDelay";
import type { TierLevel } from "@/shared/types";

export type BookingType = "PRESALE" | "GENERAL";

export interface MembershipTierPolicy {
  tier: TierLevel;
  presaleOffsetMinutes: number;
  bookingFeeWon: number;
  bookingType: BookingType;
  transferFeeRate: number | null;
}

const mockPolicies: MembershipTierPolicy[] = [
  { tier: "LIGHTNING", presaleOffsetMinutes: 0,    bookingFeeWon: 0,    bookingType: "PRESALE", transferFeeRate: 0.05 },
  { tier: "THUNDER",   presaleOffsetMinutes: 60,   bookingFeeWon: 3000, bookingType: "PRESALE", transferFeeRate: 0.05 },
  { tier: "CLOUD",     presaleOffsetMinutes: 1440, bookingFeeWon: 5000, bookingType: "PRESALE", transferFeeRate: 0.10 },
  { tier: "MIST",      presaleOffsetMinutes: 0,    bookingFeeWon: 8000, bookingType: "GENERAL", transferFeeRate: null },
];

export async function getMembershipPolicies(
  _artistId: string,
): Promise<MembershipTierPolicy[]> {
  await delay(300);
  return mockPolicies;
}
