import { delay } from "@/shared/lib/mockDelay";
import type { BookingWindowTier } from "@/features/show/api/getShows";

export interface TierPolicy {
  tier: BookingWindowTier;
  presaleOffsetMinutes: number;
  bookingFeeWon: number;
  openAt: string;
}

export interface BookingWindowsData {
  bookingWindows: Record<string, string>;
  tierPolicies: TierPolicy[];
}

const mockData: BookingWindowsData = {
  bookingWindows: {
    LIGHTNING: "2026-04-20T10:00:00+09:00",
    THUNDER:   "2026-04-20T11:00:00+09:00",
    CLOUD:     "2026-04-22T10:00:00+09:00",
    MIST:      "2026-04-22T11:00:00+09:00",
  },
  tierPolicies: [
    { tier: "LIGHTNING", presaleOffsetMinutes: 0,    bookingFeeWon: 0,    openAt: "2026-04-20T10:00:00+09:00" },
    { tier: "THUNDER",   presaleOffsetMinutes: 60,   bookingFeeWon: 3000, openAt: "2026-04-20T11:00:00+09:00" },
    { tier: "CLOUD",     presaleOffsetMinutes: 1440, bookingFeeWon: 5000, openAt: "2026-04-22T10:00:00+09:00" },
    { tier: "MIST",      presaleOffsetMinutes: 0,    bookingFeeWon: 8000, openAt: "2026-04-22T11:00:00+09:00" },
  ],
};

export async function getBookingWindows(
  _eventId: string | number,
  _showId: string | number,
): Promise<BookingWindowsData> {
  await delay(300);
  return mockData;
}
