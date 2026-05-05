import { delay } from "@/shared/lib/mockDelay";

export async function updateName(_name: string): Promise<void> {
  await delay(300);
}
