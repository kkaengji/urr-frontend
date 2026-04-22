import { delay } from "@/shared/lib/mockDelay";

export interface BookTicketParams {
  eventId: number | string;
  showId: number | string;
  artistId: number | string;
  seatIds: string[];
  holdSeconds?: number;
  userId: number | string;
}

export interface BookTicketResponse {
  orderId: string;
  reservationIds: string[];
  seatIds: string[];
  status: string;
  paymentStatus: string;
  paymentId: number;
  totalAmount: number;
  expiresAt: string;
}

export async function bookTicket(params: BookTicketParams): Promise<BookTicketResponse> {
  await delay(500);
  const expiresAt = new Date(Date.now() + 180_000).toISOString();
  return {
    orderId: `mock-order-${Date.now()}`,
    reservationIds: params.seatIds.map((id, i) => `mock-res-${i + 1}-${id}`),
    seatIds: params.seatIds,
    status: "CONFIRMED",
    paymentStatus: "PENDING",
    paymentId: 1001,
    totalAmount: 132000 * params.seatIds.length,
    expiresAt,
  };
}
