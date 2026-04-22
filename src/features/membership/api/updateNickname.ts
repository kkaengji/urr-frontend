import { delay } from "@/shared/lib/mockDelay";

export async function updateNickname(
  _membershipId: string | number,
  _userId: number,
  _nickname: string,
): Promise<void> {
  await delay(300);
}
