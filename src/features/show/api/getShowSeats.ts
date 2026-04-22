import { delay } from "@/shared/lib/mockDelay";

export interface ShowSeat {
  seatId: string;
  sectionCode: string;
  tier: string;
  zoneNo: number;
  row: string;
  number: number;
  sellable: boolean;
}

export interface ShowSeatsData {
  eventId: number;
  showId: number;
  seats: ShowSeat[];
}

const LAYOUT: Record<string, { rows: number; cols: number }> = {
  VIP1: { rows: 23, cols: 29 }, VIP2: { rows: 23, cols: 29 }, VIP3: { rows: 23, cols: 29 },
  S1: { rows: 25, cols: 22 }, S2: { rows: 25, cols: 22 }, S3: { rows: 25, cols: 22 }, S4: { rows: 25, cols: 22 },
  S5: { rows: 25, cols: 22 }, S6: { rows: 25, cols: 22 }, S7: { rows: 25, cols: 22 }, S8: { rows: 25, cols: 22 },
  R1: { rows: 27, cols: 28 }, R2: { rows: 27, cols: 28 }, R3: { rows: 27, cols: 28 }, R4: { rows: 27, cols: 28 },
  R5: { rows: 27, cols: 28 }, R6: { rows: 27, cols: 28 }, R7: { rows: 27, cols: 28 },
  A1:  { rows: 10, cols: 15 }, A2:  { rows: 10, cols: 15 }, A3:  { rows: 10, cols: 15 }, A4:  { rows: 10, cols: 15 },
  A5:  { rows: 10, cols: 15 }, A6:  { rows: 10, cols: 15 }, A7:  { rows: 10, cols: 15 }, A8:  { rows: 10, cols: 15 },
  A9:  { rows: 10, cols: 15 }, A10: { rows: 10, cols: 15 }, A11: { rows: 10, cols: 15 }, A12: { rows: 10, cols: 15 },
  A13: { rows: 10, cols: 15 }, A14: { rows: 10, cols: 15 }, A15: { rows: 10, cols: 15 }, A16: { rows: 10, cols: 15 },
  A17: { rows: 10, cols: 15 }, A18: { rows: 10, cols: 15 }, A19: { rows: 10, cols: 15 }, A20: { rows: 10, cols: 15 },
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

function parseCode(code: string): { tier: string; zoneNo: number } {
  const m = code.match(/^([A-Z]+)(\d+)$/);
  return m ? { tier: m[1], zoneNo: Number(m[2]) } : { tier: code, zoneNo: 1 };
}

function genSection(code: string): ShowSeat[] {
  const { rows, cols } = LAYOUT[code] ?? { rows: 10, cols: 15 };
  const { tier, zoneNo } = parseCode(code);
  const rand = seededRand(hashStr(code));
  const seats: ShowSeat[] = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      seats.push({
        seatId: `${tier}-${zoneNo}-${r}-${c}`,
        sectionCode: code,
        tier,
        zoneNo,
        row: String(r),
        number: c,
        sellable: rand() > 0.35,
      });
    }
  }
  return seats;
}

let _cache: ShowSeat[] | null = null;
function getAllSeats(): ShowSeat[] {
  if (!_cache) _cache = Object.keys(LAYOUT).flatMap(genSection);
  return _cache;
}

export async function getShowSeats(
  eventId: string | number,
  showId: string | number,
): Promise<ShowSeatsData> {
  await delay(400);
  return { eventId: Number(eventId), showId: Number(showId), seats: getAllSeats() };
}
