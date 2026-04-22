import { delay } from "@/shared/lib/mockDelay";

export interface ReleaseReservationParams {
  reservationIds: string[];
  reason?: string;
}

export interface ReleaseReservationResponse {
  requestedCount: number;
  releasedCount: number;
  releasedReservationIds: string[];
  skippedReservations: Record<string, string>;
}

export async function releaseReservation(
  params: ReleaseReservationParams,
  _userId: number | string,
): Promise<ReleaseReservationResponse> {
  await delay(300);
  return {
    requestedCount: params.reservationIds.length,
    releasedCount: params.reservationIds.length,
    releasedReservationIds: params.reservationIds,
    skippedReservations: {},
  };
}
