import { delay } from "@/shared/lib/mockDelay";

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
  { tier: "MIST",      opensAt: "2025-08-13T20:00:00+09:00", fee: 8000 },
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

const showsByEvent: Record<number, ShowSummary[]> = {
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
  13: [
    { showId: 1301, sessionNo: 1, startAt: "2025-09-13T17:00:00+09:00", endAt: "2025-09-13T19:00:00+09:00", capacity: 8000, remainingSeats: 0, saleOpenAt: "2025-08-13T20:00:00+09:00", saleCloseAt: "2025-09-11T09:59:00+09:00", bookingWindows: iuBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
    { showId: 1302, sessionNo: 2, startAt: "2025-09-14T16:00:00+09:00", endAt: "2025-09-14T18:00:00+09:00", capacity: 8000, remainingSeats: 0, saleOpenAt: "2025-08-13T20:00:00+09:00", saleCloseAt: "2025-09-12T09:59:00+09:00", bookingWindows: iuBookingWindows, status: "CLOSED", active: true, seatmapVersion: 1 },
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
  return showsByEvent[Number(eventId)] ?? generateShows(Number(eventId));
}
