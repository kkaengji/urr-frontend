import { delay } from "@/shared/lib/mockDelay";

export interface SubscribeMembershipResponse {
  membershipId: number;
  orderId: string;
  paymentId: string;
  pendingExpiresAt: string;
}

export async function subscribeMembership(
  _artistId: string | number,
  _userId: string | number,
): Promise<SubscribeMembershipResponse> {
  await delay(500);
  return {
    membershipId: 100,
    orderId: `mock-sub-${Date.now()}`,
    paymentId: "mock-pay-001",
    pendingExpiresAt: "2026-12-31T23:59:59+09:00",
  };
}
