import { delay } from "@/shared/lib/mockDelay";
import type { Membership } from "@/shared/types";
import { mockUser } from "@/shared/lib/mocks/user";

export async function getMemberships(_userId: number): Promise<Membership[]> {
  await delay(350);
  return mockUser.memberships;
}
