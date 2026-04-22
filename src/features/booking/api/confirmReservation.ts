import { delay } from "@/shared/lib/mockDelay";

export interface ConfirmReservationParams {
  reservationIds: string[];
  userId: string | number;
}

export interface ConfirmReservationItem {
  reservationId: string;
  eventId: number;
  showId: number;
  seatId: string;
  userId: number;
  status: string;
  paymentStatus: string;
  paidAt: string;
  refundStatus: string | null;
  expiresAt: string;
  refundedAt: string | null;
  updatedAt: string;
}

export interface ConfirmReservationResponse {
  paymentId: number;
  reservations: ConfirmReservationItem[];
}

export async function confirmReservation(
  params: ConfirmReservationParams,
): Promise<ConfirmReservationResponse> {
  await delay(400);
  const now = new Date().toISOString();
  return {
    paymentId: 1001,
    reservations: params.reservationIds.map((id) => ({
      reservationId: id,
      eventId: 1,
      showId: 101,
      seatId: id.replace("mock-res-", "seat-"),
      userId: Number(params.userId),
      status: "CONFIRMED",
      paymentStatus: "PAID",
      paidAt: now,
      refundStatus: null,
      expiresAt: now,
      refundedAt: null,
      updatedAt: now,
    })),
  };
}
