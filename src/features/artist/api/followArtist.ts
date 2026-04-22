import { delay } from "@/shared/lib/mockDelay";

export async function followArtist(
  _artistId: string | number,
  _userId: number,
): Promise<void> {
  await delay();
}
