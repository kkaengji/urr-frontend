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

const bookingWindows: BookingWindow[] = [
  { tier: "LIGHTNING", opensAt: "2026-04-20T10:00:00+09:00", fee: 0 },
  { tier: "THUNDER",   opensAt: "2026-04-20T11:00:00+09:00", fee: 3000 },
  { tier: "CLOUD",     opensAt: "2026-04-22T10:00:00+09:00", fee: 5000 },
  { tier: "MIST",      opensAt: "2026-04-22T11:00:00+09:00", fee: 8000 },
];

const showsByEvent: Record<number, ShowSummary[]> = {
  1: [
    { showId: 101, sessionNo: 1, startAt: "2026-06-01T18:00:00+09:00", endAt: "2026-06-01T20:30:00+09:00", capacity: 15000, remainingSeats: 4230, saleOpenAt: "2026-04-20T10:00:00+09:00", saleCloseAt: "2026-06-01T17:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 102, sessionNo: 2, startAt: "2026-06-02T18:00:00+09:00", endAt: "2026-06-02T20:30:00+09:00", capacity: 15000, remainingSeats: 8100, saleOpenAt: "2026-04-20T10:00:00+09:00", saleCloseAt: "2026-06-02T17:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
  2: [
    { showId: 201, sessionNo: 1, startAt: "2026-08-01T19:00:00+09:00", endAt: "2026-08-01T22:00:00+09:00", capacity: 45000, remainingSeats: 12000, saleOpenAt: "2026-06-01T10:00:00+09:00", saleCloseAt: "2026-08-01T18:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 202, sessionNo: 2, startAt: "2026-08-02T19:00:00+09:00", endAt: "2026-08-02T22:00:00+09:00", capacity: 45000, remainingSeats: 22000, saleOpenAt: "2026-06-01T10:00:00+09:00", saleCloseAt: "2026-08-02T18:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: 203, sessionNo: 3, startAt: "2026-08-03T19:00:00+09:00", endAt: "2026-08-03T22:00:00+09:00", capacity: 45000, remainingSeats: 31000, saleOpenAt: "2026-06-01T10:00:00+09:00", saleCloseAt: "2026-08-03T18:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ],
};

function generateShows(eventId: number): ShowSummary[] {
  return [
    { showId: eventId * 100 + 1, sessionNo: 1, startAt: "2026-07-01T19:00:00+09:00", endAt: "2026-07-01T21:30:00+09:00", capacity: 15000, remainingSeats: 5000, saleOpenAt: "2026-05-01T10:00:00+09:00", saleCloseAt: "2026-07-01T18:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
    { showId: eventId * 100 + 2, sessionNo: 2, startAt: "2026-07-02T19:00:00+09:00", endAt: "2026-07-02T21:30:00+09:00", capacity: 15000, remainingSeats: 8000, saleOpenAt: "2026-05-01T10:00:00+09:00", saleCloseAt: "2026-07-02T18:00:00+09:00", bookingWindows, status: "ON_SALE", active: true, seatmapVersion: 1 },
  ];
}

export async function getShows(eventId: string | number): Promise<ShowSummary[]> {
  await delay(350);
  return showsByEvent[Number(eventId)] ?? generateShows(Number(eventId));
}
