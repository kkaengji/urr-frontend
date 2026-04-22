import { delay } from "@/shared/lib/mockDelay";
import { getMyTickets } from "@/shared/lib/mocks/my-page";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "EXPIRED" | "FAILED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
export type RefundStatus = "NONE" | "REQUESTED" | "COMPLETED";

export interface ReservationSummary {
  reservationId: string;
  eventId: number;
  showId: number;
  seatId: string;
  userId: number;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  refundStatus: RefundStatus;
  expiresAt: string | null;
  refundedAt: string | null;
  updatedAt: string;
  transferEligible: boolean;
  paymentId?: number | null;
}

export async function getMyReservations(
  _userId: string | number,
  status?: ReservationStatus,
): Promise<ReservationSummary[]> {
  await delay(350);
  const tickets = getMyTickets();
  const reservations: ReservationSummary[] = tickets.map((t) => ({
    reservationId: `res-${t.id}`,
    eventId: Number(t.eventId) || 1,
    showId: 101,
    seatId: `${t.section.replace("석", "")}-1-${t.row}-${t.seatNumber}`,
    userId: 1,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paidAt: "2026-04-20T10:05:00+09:00",
    refundStatus: "NONE",
    expiresAt: null,
    refundedAt: null,
    updatedAt: "2026-04-20T10:05:00+09:00",
    transferEligible: t.isTransferable,
    paymentId: 1001,
  }));
  if (!status) return reservations;
  return reservations.filter((r) => r.status === status);
}
