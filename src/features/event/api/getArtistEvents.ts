import { delay } from "@/shared/lib/mockDelay";
import { getEvents } from "./getEvents";
import type { EventSummary } from "./getEvents";

export async function getArtistEvents(
  artistId: string | number,
): Promise<EventSummary[]> {
  await delay(350);
  const all = await getEvents();
  return all.filter((e) => String(e.artistId) === String(artistId));
}
