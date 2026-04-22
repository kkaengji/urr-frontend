import { delay } from "@/shared/lib/mockDelay";

export interface CancelReservationParams {
  eventId: number;
  showId: number;
  seatId: string;
}

export interface CancelReservationResponse {
  reservationId: string;
  eventId: number;
  showId: number;
  seatId: string;
  userId: number;
  status: string;
  paymentStatus: string;
  paidAt: string | null;
  refundStatus: string;
  expiresAt: string;
  refundedAt: string | null;
  updatedAt: string;
}

export async function cancelReservation(
  params: CancelReservationParams,
  userId: number | string,
): Promise<CancelReservationResponse> {
  await delay(400);
  const now = new Date().toISOString();
  return {
    reservationId: `mock-res-cancelled-${params.seatId}`,
    eventId: params.eventId,
    showId: params.showId,
    seatId: params.seatId,
    userId: Number(userId),
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    paidAt: null,
    refundStatus: "COMPLETED",
    expiresAt: now,
    refundedAt: now,
    updatedAt: now,
  };
}
