import { delay } from "@/shared/lib/mockDelay";
import type { Event } from "@/shared/types";
import type { MyTransferRecord } from "@/shared/lib/mocks/my-page";
import { getMyTransferRecords } from "@/shared/lib/mocks/my-page";

export async function getMySales(
  _userId?: string | number,
): Promise<(MyTransferRecord & { event: Event })[]> {
  await delay(350);
  return getMyTransferRecords().filter((r) => r.role === "seller");
}

export async function getMyPurchases(
  _userId?: string | number,
): Promise<(MyTransferRecord & { event: Event })[]> {
  await delay(350);
  return getMyTransferRecords().filter((r) => r.role === "buyer");
}
