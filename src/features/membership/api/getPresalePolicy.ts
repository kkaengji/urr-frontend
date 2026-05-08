import { delay } from "@/shared/lib/mockDelay";

function todayKSTAt(hour: number, offsetDays = 0): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const base = new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate() + offsetDays));
  const y = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, "0");
  const d = String(base.getUTCDate()).padStart(2, "0");
  return `${y}-${mo}-${d}T${String(hour).padStart(2, "0")}:00:00+09:00`;
}
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

const tiersByEvent: Record<number, PresaleTierPolicy[]> = {
  1: [ // 2026 IU HEREH WORLD TOUR CONCERT ENCORE：THE WINNING
    { tier: "LIGHTNING", openAt: "2026-08-11T20:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-08-11T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-08-13T20:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-08-13T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  2: [ // BTS WORLD TOUR 'ARIRANG'
    { tier: "LIGHTNING", openAt: "2026-05-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-05-01T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-05-03T10:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-05-03T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  4: [ // aespa LIVE TOUR - SYNK : aeXIS LINE
    { tier: "LIGHTNING", openAt: "2025-06-26T20:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2025-06-26T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2025-06-27T20:00:00+09:00", presaleOffsetMinutes: 1380, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2025-06-27T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  5: [ // LUCY 9TH CONCERT 〈ISLAND〉
    { tier: "LIGHTNING", openAt: "2026-04-15T19:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-04-15T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-04-17T19:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-04-17T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  8: [ // DAY6 10th Anniversary Tour 〈The DECADE〉
    { tier: "LIGHTNING", openAt: "2026-04-15T19:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-04-15T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-04-17T19:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-04-17T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  9: [ // KiiiKiii FAN CONCERT 〈KiiiKiii FesTiiival〉
    { tier: "LIGHTNING", openAt: "2026-04-15T19:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-04-15T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-04-17T19:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-04-17T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  10: [ // 2026 Weverse Con Festival
    { tier: "LIGHTNING", openAt: "2026-05-10T20:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-05-10T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-05-12T20:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-05-12T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  11: [ // 2026 서울파크뮤직페스티벌
    { tier: "LIGHTNING", openAt: "2026-04-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-04-01T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-04-03T10:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-04-03T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  12: [ // 오피셜히게단디즘 아시아 투어 2026
    { tier: "LIGHTNING", openAt: "2026-04-28T20:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-04-28T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-04-30T20:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-04-30T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  13: [ // IU 2025 FAN MEET-UP [Bye, Summer]
    { tier: "LIGHTNING", openAt: "2025-08-11T20:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2025-08-11T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2025-08-13T20:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2025-08-13T21:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  14: [ // 뮤지컬 〈킹키부츠〉
    { tier: "LIGHTNING", openAt: "2026-03-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-03-01T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-03-03T10:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-03-03T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  15: [ // 민트페스타 vol.83
    { tier: "LIGHTNING", openAt: "2026-04-15T19:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-04-15T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-04-17T19:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-04-17T20:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  16: [ // 뮤지컬 〈김종욱 찾기〉
    { tier: "LIGHTNING", openAt: "2026-03-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-03-01T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-03-03T10:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-03-03T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
  17: [ // 아라리오뮤지엄 인 스페이스 (티어 구분 없음)
    { tier: "LIGHTNING", openAt: "2026-01-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-01-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "CLOUD",     openAt: "2026-01-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "MIST",      openAt: "2026-01-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
  ],
  18: [ // PEAK FESTIVAL 2026
    { tier: "LIGHTNING", openAt: "2026-03-04T18:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
    { tier: "THUNDER",   openAt: "2026-03-04T19:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
    { tier: "CLOUD",     openAt: "2026-03-06T18:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
    { tier: "MIST",      openAt: "2026-03-06T19:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
  ],
};

const defaultTiers: PresaleTierPolicy[] = [
  { tier: "LIGHTNING", openAt: "2026-05-01T10:00:00+09:00", presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
  { tier: "THUNDER",   openAt: "2026-05-01T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
  { tier: "CLOUD",     openAt: "2026-05-03T10:00:00+09:00", presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
  { tier: "MIST",      openAt: "2026-05-03T11:00:00+09:00", presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
];

export async function getPresalePolicy(
  eventId: string | number,
  showId: string | number,
): Promise<PresalePolicy> {
  await delay(300);
  const id = Number(eventId);

  const tiers: PresaleTierPolicy[] = id === 1
    ? [
        { tier: "LIGHTNING", openAt: todayKSTAt(10, -2), presaleOffsetMinutes: 0,    bookingFeeWon: 0    },
        { tier: "THUNDER",   openAt: todayKSTAt(11, -2), presaleOffsetMinutes: 60,   bookingFeeWon: 3000 },
        { tier: "CLOUD",     openAt: todayKSTAt(10, -1), presaleOffsetMinutes: 2820, bookingFeeWon: 5000 },
        { tier: "MIST",      openAt: todayKSTAt(11, -1), presaleOffsetMinutes: 60,   bookingFeeWon: 8000 },
      ]
    : (tiersByEvent[id] ?? defaultTiers);

  return {
    eventId: id,
    showId: Number(showId),
    generalOpenAt: tiers[tiers.length - 1].openAt,
    tiers,
  };
}
