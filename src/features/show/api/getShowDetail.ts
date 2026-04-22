import { delay } from "@/shared/lib/mockDelay";
import type { ShowStatus } from "./getShows";

export interface ShowDetail {
  showId: number;
  eventId: number;
  sessionNo: number;
  startAt: string;
  endAt: string;
  capacity: number;
  saleOpenAt: string;
  saleCloseAt: string;
  status: ShowStatus;
  active: boolean;
  seatmapVersion: number;
  seatmapJson: string;
}

export async function getShowDetail(
  eventId: string | number,
  showId: string | number,
): Promise<ShowDetail> {
  await delay(300);
  return {
    showId: Number(showId),
    eventId: Number(eventId),
    sessionNo: 1,
    startAt: "2026-06-01T18:00:00+09:00",
    endAt: "2026-06-01T20:30:00+09:00",
    capacity: 15000,
    saleOpenAt: "2026-04-20T10:00:00+09:00",
    saleCloseAt: "2026-06-01T17:00:00+09:00",
    status: "ON_SALE",
    active: true,
    seatmapVersion: 1,
    seatmapJson: "",
  };
}
