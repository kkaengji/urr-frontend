import type { Ticket, Event, TransferStatus } from "@/shared/types";
import { findMockEvent } from "./events";

// ── Transfer Record (user perspective) ──────────────────

export interface MyTransferRecord {
  id: string;
  ticketId: string;
  eventId: string;
  role: "seller" | "buyer";
  counterpartyName: string;
  price: number;
  faceValue: number;
  platformFee: number;
  section: string;
  seatInfo: string;
  status: TransferStatus;
  createdAt: string;
}

// ── Helper: MockEvent → shared Event type ────────────────

function toEvent(eventId: number): Event {
  const e = findMockEvent(eventId);
  if (!e) throw new Error(`MockEvent not found: ${eventId}`);
  return {
    id: String(e.eventId),
    artistId: String(e.artistId),
    title: e.title,
    venue: e.venueName,
    dates: e.shows.map((s) => ({
      id: s.id,
      date: s.date,
      bookingWindows: [],
      totalSeats: s.totalSeats,
      remainingSeats: s.remainingSeats,
    })),
    poster: e.posterImageUrl,
    status: e.active ? "open" : "closed",
  };
}

// ── User's Tickets ──────────────────────────────────────

const myTickets: (Ticket & { event: Event })[] = [
  // Upcoming
  {
    id: "my-tk-001", eventId: "1",
    section: "VIP석", row: "3", seatNumber: "15",
    price: 165000, tierFee: 0, qrCode: "URR-TK-IU2026-001",
    isTransferable: true, isUpcoming: true,
    event: toEvent(1),
  },
  {
    id: "my-tk-002", eventId: "2",
    section: "R석", row: "7", seatNumber: "22",
    price: 143000, tierFee: 3000, qrCode: "URR-TK-BTS2026-002",
    isTransferable: true, isUpcoming: true,
    event: toEvent(2),
  },
  {
    id: "my-tk-003", eventId: "4",
    section: "S석", row: "12", seatNumber: "8",
    price: 121000, tierFee: 5000, qrCode: "URR-TK-AE2025-003",
    isTransferable: false, isUpcoming: false,
    event: toEvent(4),
  },
  // Past
  {
    id: "my-tk-004", eventId: "13",
    section: "R석", row: "5", seatNumber: "10",
    price: 143000, tierFee: 0, qrCode: "URR-TK-IU2025-004",
    isTransferable: false, isUpcoming: false,
    event: toEvent(13),
  },
  {
    id: "my-tk-005", eventId: "2",
    section: "A석", row: "15", seatNumber: "3",
    price: 99000, tierFee: 5000, qrCode: "URR-TK-BTS2025-005",
    isTransferable: false, isUpcoming: false,
    event: toEvent(2),
  },
];

// ── Transfer Records ────────────────────────────────────

const myTransferRecords: (MyTransferRecord & { event: Event })[] = [
  {
    id: "my-tf-001", ticketId: "my-tk-extra-001", eventId: "1",
    role: "seller", counterpartyName: "",
    price: 180000, faceValue: 165000, platformFee: 9000,
    section: "R석", seatInfo: "A구역 5열 20번",
    status: "listed", createdAt: "2026-03-01T10:00:00+09:00",
    event: toEvent(1),
  },
  {
    id: "my-tf-002", ticketId: "my-tk-extra-002", eventId: "2",
    role: "seller", counterpartyName: "이팬심",
    price: 110000, faceValue: 99000, platformFee: 5500,
    section: "S석", seatInfo: "B구역 8열 14번",
    status: "completed", createdAt: "2025-10-20T14:30:00+09:00",
    event: toEvent(2),
  },
  {
    id: "my-tf-003", ticketId: "my-tk-extra-003", eventId: "4",
    role: "buyer", counterpartyName: "박음악",
    price: 135000, faceValue: 121000, platformFee: 0,
    section: "R석", seatInfo: "A구역 4열 19번",
    status: "completed", createdAt: "2026-02-15T09:00:00+09:00",
    event: toEvent(4),
  },
];

// ── Export helpers ───────────────────────────────────────

export function getMyTickets(): (Ticket & { event: Event })[] {
  return myTickets;
}

export function getMyTransferRecords(): (MyTransferRecord & {
  event: Event;
})[] {
  return myTransferRecords;
}

export function addMyTicket(ticket: Ticket & { event: Event }): void {
  myTickets.unshift(ticket);
}

export function addMyTransferRecord(
  record: MyTransferRecord & { event: Event },
): void {
  myTransferRecords.unshift(record);
}
