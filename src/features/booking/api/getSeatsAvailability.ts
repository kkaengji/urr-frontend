import { delay } from "@/shared/lib/mockDelay";

export interface SeatAvailability {
  seatId: string;
  section: string;
  row: string;
  number: string;
  status: string;
  price: number;
  lockedUntil: string | null;
  sellable: boolean;
  seatVersion: number;
}

const PRICE_BY_TIER: Record<string, number> = {
  VIP: 198000,
  S: 132000,
  R: 110000,
  A: 99000,
};

const LAYOUT: Record<string, { rows: number; cols: number }> = {
  VIP: { rows: 23, cols: 29 },
  S:   { rows: 25, cols: 22 },
  R:   { rows: 27, cols: 28 },
  A:   { rows: 10, cols: 15 },
};

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function hashStr(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xffffffff;
  return h;
}

export async function getSeatsAvailability(
  _eventId: string | number,
  _showId: string | number,
  tier: string,
  zoneNo: number,
): Promise<SeatAvailability[]> {
  await delay(350);
  const sectionCode = `${tier}${zoneNo}`;
  const { rows, cols } = LAYOUT[tier] ?? { rows: 10, cols: 15 };
  const price = PRICE_BY_TIER[tier] ?? 99000;
  const rand = seededRand(hashStr(sectionCode));
  const seats: SeatAvailability[] = [];

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const rnd = rand();
      const taken = rnd < 0.35;
      const locked = !taken && rnd < 0.40;
      seats.push({
        seatId: `${tier}-${zoneNo}-${r}-${c}`,
        section: sectionCode,
        row: String(r),
        number: String(c),
        status: taken ? "TAKEN" : locked ? "LOCKED" : "AVAILABLE",
        price,
        lockedUntil: locked ? "2026-04-22T11:15:00+09:00" : null,
        sellable: !taken,
        seatVersion: 1,
      });
    }
  }
  return seats;
}
