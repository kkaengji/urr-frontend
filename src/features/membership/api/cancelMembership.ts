import { delay } from "@/shared/lib/mockDelay";

export async function cancelMembership(
  _orderId: string,
  _userId: number,
  _reason: string = "PAYMENT_CANCELED",
): Promise<void> {
  await delay(400);
}
