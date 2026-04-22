import { delay } from "@/shared/lib/mockDelay";
import type { TierLevel } from "@/shared/types";

export interface PresaleTierPolicy {
  tier: TierLevel;
  openAt: string;
  presaleOffsetMinutes: number;
  bookingFeeWon: number;
}

export interface PresalePolicy {
  eventId: number;
  showId: number;
  generalOpenAt: string;
  tiers: PresaleTierPolicy[];
}

export async function getPresalePolicy(
  eventId: string | number,
  showId: string | number,
): Promise<PresalePolicy> {
  await delay(300);
  return {
    eventId: Number(eventId),
    showId: Number(showId),
    generalOpenAt: "2026-04-22T11:00:00+09:00",
    tiers: [
      { tier: "LIGHTNING", openAt: "2026-04-20T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
      { tier: "THUNDER",   openAt: "2026-04-20T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
      { tier: "CLOUD",     openAt: "2026-04-22T10:00:00+09:00", presaleOffsetMinutes: 1440, bookingFeeWon: 5000 },
      { tier: "MIST",      openAt: "2026-04-22T11:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 8000 },
    ],
  };
}
