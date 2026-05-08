import { delay } from "@/shared/lib/mockDelay";

function todayKSTAt(hour: number, offsetDays = 0): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const base = new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate() + offsetDays));
  const y = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, "0");
  const d = String(base.getUTCDate()).padStart(2, "0");
  return `${y}-${mo}-${d}T${String(hour).padStart(2, "0")}:00:00+09:00`;
}

export type ShowStatus = "DRAFT" | "ON_SALE" | "OPEN" | "CLOSED" | "CANCELLED";
export type BookingWindowTier = "LIGHTNING" | "THUNDER" | "CLOUD" | "MIST";

export interface BookingWindow {
  tier: BookingWindowTier;
  opensAt: string;
  fee: number;
}

export interface ShowSummary {
  showId: number;
  sessionNo: number;
  startAt: string;
  endAt: string;
  capacity: number;
  remainingSeats: number;
  saleOpenAt: string;
  saleCloseAt: string;
  bookingWindows: BookingWindow[];
  status: ShowStatus;
  active: boolean;
  seatmapVersion: number;
}

const btsBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-05-01T10:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-05-01T11:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-05-03T10:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-05-03T11:00:00+09:00", fee: 8000 },
];

const day6BookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-04-15T19:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-04-15T20:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-04-17T19:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-04-17T20:00:00+09:00", fee: 8000 },
];

const iuBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2025-08-11T20:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2025-08-11T21:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2025-08-13T20:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2025-08-13T21:00:00+09:00", fee: 8000 },
];

const iuNewBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-08-11T20:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-08-11T21:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-08-13T20:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-08-13T21:00:00+09:00", fee: 8000 },
];

const weverseBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-05-10T20:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-05-10T21:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-05-12T20:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-05-12T21:00:00+09:00", fee: 8000 },
];

const aespaBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2025-06-26T20:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2025-06-26T21:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2025-06-27T20:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2025-06-27T21:00:00+09:00", fee: 8000 },
];

const lucyBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-04-15T19:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-04-15T20:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-04-17T19:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-04-17T20:00:00+09:00", fee: 8000 },
];

const musicalBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-03-01T10:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-03-01T11:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-03-03T10:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-03-03T11:00:00+09:00", fee: 8000 },
];

const festivalBookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-03-04T18:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-03-04T19:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-03-06T18:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-03-06T19:00:00+09:00", fee: 8000 },
];

const showsByEvent: Record<number, ShowSummary[]> = {
  1: [
    { showId: 101, sessionNo: 1, startAt: "2026-10-11T18:00:00+09:00", endAt: "2026-10-11T20:00:00+09:00", capacity: 15000, remainingSeats: 3200, saleOpenAt: "2026-08-11T20:00:00+09:00", saleCloseAt: "2026-10-11T17:00:00+09:00", bookingWindows: iuNewBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  4: [
    { showId: 401, sessionNo: 1, startAt: "2025-08-29T20:00:00+09:00", endAt: "2025-08-29T22:30:00+09:00", capacity: 15000, remainingSeats: 0, saleOpenAt: "2025-06-26T20:00:00+09:00", saleCloseAt: "2025-08-23T09:59:00+09:00", bookingWindows: aespaBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
    { showId: 402, sessionNo: 2, startAt: "2025-08-30T18:00:00+09:00", endAt: "2025-08-30T20:30:00+09:00", capacity: 15000, remainingSeats: 0, saleOpenAt: "2025-06-26T20:00:00+09:00", saleCloseAt: "2025-08-24T09:59:00+09:00", bookingWindows: aespaBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
    { showId: 403, sessionNo: 3, startAt: "2025-08-31T17:00:00+09:00", endAt: "2025-08-31T19:30:00+09:00", capacity: 15000, remainingSeats: 0, saleOpenAt: "2025-06-26T20:00:00+09:00", saleCloseAt: "2025-08-25T09:59:00+09:00", bookingWindows: aespaBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
  ],
  5: [
    { showId: 501, sessionNo: 1, startAt: "2026-05-16T18:00:00+09:00", endAt: "2026-05-16T20:10:00+09:00", capacity: 15000, remainingSeats: 7000, saleOpenAt: "2026-04-15T19:00:00+09:00", saleCloseAt: "2026-05-16T17:00:00+09:00", bookingWindows: lucyBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 502, sessionNo: 2, startAt: "2026-05-17T16:00:00+09:00", endAt: "2026-05-17T18:10:00+09:00", capacity: 15000, remainingSeats: 9000, saleOpenAt: "2026-04-15T19:00:00+09:00", saleCloseAt: "2026-05-17T15:00:00+09:00", bookingWindows: lucyBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  2: [
    { showId: 201, sessionNo: 1, startAt: "2026-06-12T19:00:00+09:00", endAt: "2026-06-12T21:00:00+09:00", capacity: 50000, remainingSeats: 18000, saleOpenAt: "2026-05-01T10:00:00+09:00", saleCloseAt: "2026-06-12T18:00:00+09:00", bookingWindows: btsBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 202, sessionNo: 2, startAt: "2026-06-13T19:00:00+09:00", endAt: "2026-06-13T21:00:00+09:00", capacity: 50000, remainingSeats: 23000, saleOpenAt: "2026-05-01T10:00:00+09:00", saleCloseAt: "2026-06-13T18:00:00+09:00", bookingWindows: btsBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  8: [
    { showId: 801, sessionNo: 1, startAt: "2026-05-16T17:00:00+09:00", endAt: "2026-05-16T19:00:00+09:00", capacity: 10000, remainingSeats: 3500, saleOpenAt: "2026-04-17T19:00:00+09:00", saleCloseAt: "2026-05-16T16:00:00+09:00", bookingWindows: day6BookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 802, sessionNo: 2, startAt: "2026-05-17T16:00:00+09:00", endAt: "2026-05-17T18:00:00+09:00", capacity: 10000, remainingSeats: 5200, saleOpenAt: "2026-04-17T19:00:00+09:00", saleCloseAt: "2026-05-17T15:00:00+09:00", bookingWindows: day6BookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  9: [
    { showId: 901, sessionNo: 1, startAt: "2026-05-16T18:00:00+09:00", endAt: "2026-05-16T20:00:00+09:00", capacity: 2000, remainingSeats: 420, saleOpenAt: "2026-04-17T19:00:00+09:00", saleCloseAt: "2026-05-16T17:00:00+09:00", bookingWindows: day6BookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 902, sessionNo: 2, startAt: "2026-05-17T17:00:00+09:00", endAt: "2026-05-17T19:00:00+09:00", capacity: 2000, remainingSeats: 870, saleOpenAt: "2026-04-17T19:00:00+09:00", saleCloseAt: "2026-05-17T16:00:00+09:00", bookingWindows: day6BookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  12: [
    { showId: 1201, sessionNo: 1, startAt: "2026-08-08T19:00:00+09:00", endAt: "2026-08-08T21:30:00+09:00", capacity: 12000, remainingSeats: 8500, saleOpenAt: "2026-04-28T20:00:00+09:00", saleCloseAt: "2026-08-08T18:00:00+09:00", bookingWindows: [{ tier: "LIGHTNING", opensAt: "2026-04-28T20:00:00+09:00", fee: 0 }, { tier: "THUNDER", opensAt: "2026-04-28T21:00:00+09:00", fee: 3000 }, { tier: "CLOUD", opensAt: "2026-04-30T20:00:00+09:00", fee: 5000 }, { tier: "MIST", opensAt: "2026-04-30T21:00:00+09:00", fee: 8000 }], status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1202, sessionNo: 2, startAt: "2026-08-09T17:00:00+09:00", endAt: "2026-08-09T19:30:00+09:00", capacity: 12000, remainingSeats: 9200, saleOpenAt: "2026-04-28T20:00:00+09:00", saleCloseAt: "2026-08-09T16:00:00+09:00", bookingWindows: [{ tier: "LIGHTNING", opensAt: "2026-04-28T20:00:00+09:00", fee: 0 }, { tier: "THUNDER", opensAt: "2026-04-28T21:00:00+09:00", fee: 3000 }, { tier: "CLOUD", opensAt: "2026-04-30T20:00:00+09:00", fee: 5000 }, { tier: "MIST", opensAt: "2026-04-30T21:00:00+09:00", fee: 8000 }], status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  13: [
    { showId: 1301, sessionNo: 1, startAt: "2025-09-13T17:00:00+09:00", endAt: "2025-09-13T19:00:00+09:00", capacity: 8000, remainingSeats: 0, saleOpenAt: "2025-08-13T20:00:00+09:00", saleCloseAt: "2025-09-11T09:59:00+09:00", bookingWindows: iuBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
    { showId: 1302, sessionNo: 2, startAt: "2025-09-14T16:00:00+09:00", endAt: "2025-09-14T18:00:00+09:00", capacity: 8000, remainingSeats: 0, saleOpenAt: "2025-08-13T20:00:00+09:00", saleCloseAt: "2025-09-12T09:59:00+09:00", bookingWindows: iuBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
  ],
  // 뮤지컬 킹키부츠 (eventId 14)
  14: [
    { showId: 1401, sessionNo: 1, startAt: "2026-04-25T14:00:00+09:00", endAt: "2026-04-25T16:35:00+09:00", capacity: 2000, remainingSeats: 180, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-04-25T13:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1402, sessionNo: 2, startAt: "2026-04-25T19:00:00+09:00", endAt: "2026-04-25T21:35:00+09:00", capacity: 2000, remainingSeats: 250, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-04-25T18:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1403, sessionNo: 3, startAt: "2026-04-26T14:00:00+09:00", endAt: "2026-04-26T16:35:00+09:00", capacity: 2000, remainingSeats: 400, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-04-26T13:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1404, sessionNo: 4, startAt: "2026-04-26T19:00:00+09:00", endAt: "2026-04-26T21:35:00+09:00", capacity: 2000, remainingSeats: 320, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-04-26T18:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1405, sessionNo: 5, startAt: "2026-05-01T19:00:00+09:00", endAt: "2026-05-01T21:35:00+09:00", capacity: 2000, remainingSeats: 850, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-05-01T18:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1406, sessionNo: 6, startAt: "2026-05-02T14:00:00+09:00", endAt: "2026-05-02T16:35:00+09:00", capacity: 2000, remainingSeats: 520, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-05-02T13:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1407, sessionNo: 7, startAt: "2026-05-02T19:00:00+09:00", endAt: "2026-05-02T21:35:00+09:00", capacity: 2000, remainingSeats: 680, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-05-02T18:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1408, sessionNo: 8, startAt: "2026-05-03T14:00:00+09:00", endAt: "2026-05-03T16:35:00+09:00", capacity: 2000, remainingSeats: 1200, saleOpenAt: "2026-03-01T10:00:00+09:00", saleCloseAt: "2026-05-03T13:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  // 뮤지컬 김종욱 찾기 (eventId 16)
  16: [
    { showId: 1601, sessionNo: 1, startAt: "2026-05-05T14:00:00+09:00", endAt: "2026-05-05T15:40:00+09:00", capacity: 200, remainingSeats: 45, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-05T13:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1602, sessionNo: 2, startAt: "2026-05-05T17:00:00+09:00", endAt: "2026-05-05T18:40:00+09:00", capacity: 200, remainingSeats: 78, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-05T16:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1603, sessionNo: 3, startAt: "2026-05-05T20:00:00+09:00", endAt: "2026-05-05T21:40:00+09:00", capacity: 200, remainingSeats: 120, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-05T19:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1604, sessionNo: 4, startAt: "2026-05-06T14:00:00+09:00", endAt: "2026-05-06T15:40:00+09:00", capacity: 200, remainingSeats: 90, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-06T13:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1605, sessionNo: 5, startAt: "2026-05-06T17:00:00+09:00", endAt: "2026-05-06T18:40:00+09:00", capacity: 200, remainingSeats: 155, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-06T16:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1606, sessionNo: 6, startAt: "2026-05-06T20:00:00+09:00", endAt: "2026-05-06T21:40:00+09:00", capacity: 200, remainingSeats: 180, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-06T19:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1607, sessionNo: 7, startAt: "2026-05-07T14:00:00+09:00", endAt: "2026-05-07T15:40:00+09:00", capacity: 200, remainingSeats: 0, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-07T13:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1608, sessionNo: 8, startAt: "2026-05-07T17:00:00+09:00", endAt: "2026-05-07T18:40:00+09:00", capacity: 200, remainingSeats: 62, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-07T16:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1609, sessionNo: 9, startAt: "2026-05-07T20:00:00+09:00", endAt: "2026-05-07T21:40:00+09:00", capacity: 200, remainingSeats: 140, saleOpenAt: "2026-02-01T10:00:00+09:00", saleCloseAt: "2026-05-07T19:30:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  // 아라리오뮤지엄 (eventId 17) — 일별 입장 슬롯
  17: [
    { showId: 1701, sessionNo: 1, startAt: "2026-05-06T10:00:00+09:00", endAt: "2026-05-06T11:30:00+09:00", capacity: 100, remainingSeats: 42, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-05T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1702, sessionNo: 2, startAt: "2026-05-06T11:00:00+09:00", endAt: "2026-05-06T12:30:00+09:00", capacity: 100, remainingSeats: 67, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-05T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1703, sessionNo: 3, startAt: "2026-05-06T13:00:00+09:00", endAt: "2026-05-06T14:30:00+09:00", capacity: 100, remainingSeats: 88, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-05T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1704, sessionNo: 4, startAt: "2026-05-06T14:00:00+09:00", endAt: "2026-05-06T15:30:00+09:00", capacity: 100, remainingSeats: 55, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-05T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1705, sessionNo: 5, startAt: "2026-05-06T15:00:00+09:00", endAt: "2026-05-06T16:30:00+09:00", capacity: 100, remainingSeats: 70, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-05T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1706, sessionNo: 6, startAt: "2026-05-07T10:00:00+09:00", endAt: "2026-05-07T11:30:00+09:00", capacity: 100, remainingSeats: 85, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-06T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1707, sessionNo: 7, startAt: "2026-05-07T13:00:00+09:00", endAt: "2026-05-07T14:30:00+09:00", capacity: 100, remainingSeats: 92, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-06T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1708, sessionNo: 8, startAt: "2026-05-07T15:00:00+09:00", endAt: "2026-05-07T16:30:00+09:00", capacity: 100, remainingSeats: 78, saleOpenAt: "2026-01-01T10:00:00+09:00", saleCloseAt: "2026-05-06T17:00:00+09:00", bookingWindows: musicalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  // PEAK FESTIVAL (eventId 18)
  18: [
    { showId: 1801, sessionNo: 1, startAt: "2026-05-23T12:00:00+09:00", endAt: "2026-05-23T22:30:00+09:00", capacity: 22000, remainingSeats: 14200, saleOpenAt: "2026-03-04T18:00:00+09:00", saleCloseAt: "2026-05-23T11:00:00+09:00", bookingWindows: festivalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1802, sessionNo: 2, startAt: "2026-05-24T12:00:00+09:00", endAt: "2026-05-24T21:30:00+09:00", capacity: 22000, remainingSeats: 17500, saleOpenAt: "2026-03-04T18:00:00+09:00", saleCloseAt: "2026-05-24T11:00:00+09:00", bookingWindows: festivalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  // Weverse Con Festival (eventId 10)
  10: [
    { showId: 1001, sessionNo: 1, startAt: "2026-06-06T12:00:00+09:00", endAt: "2026-06-06T22:00:00+09:00", capacity: 15000, remainingSeats: 5200, saleOpenAt: "2026-05-10T20:00:00+09:00", saleCloseAt: "2026-06-06T11:00:00+09:00", bookingWindows: weverseBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1002, sessionNo: 2, startAt: "2026-06-07T12:00:00+09:00", endAt: "2026-06-07T22:00:00+09:00", capacity: 15000, remainingSeats: 8100, saleOpenAt: "2026-05-10T20:00:00+09:00", saleCloseAt: "2026-06-07T11:00:00+09:00", bookingWindows: weverseBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  // 서울파크뮤직페스티벌 (eventId 11)
  11: [
    { showId: 1101, sessionNo: 1, startAt: "2026-06-20T14:00:00+09:00", endAt: "2026-06-20T22:30:00+09:00", capacity: 20000, remainingSeats: 9400, saleOpenAt: "2026-04-01T10:00:00+09:00", saleCloseAt: "2026-06-20T13:00:00+09:00", bookingWindows: festivalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 1102, sessionNo: 2, startAt: "2026-06-21T14:00:00+09:00", endAt: "2026-06-21T21:30:00+09:00", capacity: 20000, remainingSeats: 12000, saleOpenAt: "2026-04-01T10:00:00+09:00", saleCloseAt: "2026-06-21T13:00:00+09:00", bookingWindows: festivalBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
};

function generateShows(eventId: number): ShowSummary[] {
  return [
    { showId: eventId * 100 + 1, sessionNo: 1, startAt: "2026-07-01T19:00:00+09:00", endAt: "2026-07-01T21:30:00+09:00", capacity: 15000, remainingSeats: 5000, saleOpenAt: "2026-05-01T10:00:00+09:00", saleCloseAt: "2026-07-01T18:00:00+09:00", bookingWindows: btsBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: eventId * 100 + 2, sessionNo: 2, startAt: "2026-07-02T19:00:00+09:00", endAt: "2026-07-02T21:30:00+09:00", capacity: 15000, remainingSeats: 8000, saleOpenAt: "2026-05-01T10:00:00+09:00", saleCloseAt: "2026-07-02T18:00:00+09:00", bookingWindows: btsBookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ];
}

export async function getShows(eventId: string | number): Promise<ShowSummary[]> {
  await delay(350);
  const id = Number(eventId);

  if (id === 1) {
    const iuBookingWindowsToday: BookingWindow[] = [
      { tier: "LIGHTNING", opensAt: todayKSTAt(10, -2), fee: 0    },
      { tier: "THUNDER",   opensAt: todayKSTAt(11, -2), fee: 3000 },
      { tier: "CLOUD",     opensAt: todayKSTAt(10, -1), fee: 5000 },
      { tier: "MIST",      opensAt: todayKSTAt(11, -1), fee: 8000 },
    ];
    return [
      {
        showId: 101, sessionNo: 1,
        startAt: "2026-09-21T19:00:00+09:00", endAt: "2026-09-21T21:30:00+09:00",
        capacity: 66000, remainingSeats: 3200,
        saleOpenAt: todayKSTAt(0, -1), saleCloseAt: "2026-09-21T18:00:00+09:00",
        bookingWindows: iuBookingWindowsToday, status: "ON_SALE", active: true, seatmapVersion: 1,
      },
      {
        showId: 102, sessionNo: 2,
        startAt: "2026-09-22T19:00:00+09:00", endAt: "2026-09-22T21:30:00+09:00",
        capacity: 66000, remainingSeats: 8500,
        saleOpenAt: todayKSTAt(0, -1), saleCloseAt: "2026-09-22T18:00:00+09:00",
        bookingWindows: iuBookingWindowsToday, status: "ON_SALE", active: true, seatmapVersion: 1,
      },
    ];
  }

  return showsByEvent[id] ?? generateShows(id);
}
