import { delay } from "@/shared/lib/mockDelay";
import { mockEvents } from "@/shared/lib/mocks/events";

export type EventApiCategory = "concert" | "fanmeeting" | "festival" | "musical" | "etc";

export const eventApiCategoryLabels: Record<EventApiCategory, string> = {
  concert: "콘서트",
  fanmeeting: "팬미팅",
  festival: "페스티벌",
  musical: "뮤지컬",
  etc: "기타",
};

export function getEventCategoryLabel(category: EventApiCategory | string): string {
  return eventApiCategoryLabels[category as EventApiCategory] ?? category;
}

export interface EventSummary {
  eventId: number;
  artistId?: number;
  title: string;
  subtitle?: string;
  description: string;
  venueTemplateId: number;
  venueTemplateName: string;
  venueAddress?: string;
  openDate: string;
  active: boolean;
  posterImageUrl?: string;
  artistName?: string;
  category?: EventApiCategory;
  tags?: string[];
  endDate?: string;
}

export async function getEvents(): Promise<EventSummary[]> {
  await delay(400);
  return mockEvents
    .filter((e) => e.eventId !== 3)
    .map((e) => ({
      eventId: e.eventId,
      artistId: e.artistId || undefined,
      title: e.title,
      subtitle: e.subtitle,
      description: e.description,
      venueTemplateId: e.venueTemplateId,
      venueTemplateName: e.venueName,
      venueAddress: e.venueAddress,
      openDate: e.openDate,
      endDate: e.endDate,
      active: e.active,
      posterImageUrl: e.posterImageUrl,
      artistName: e.artistName || undefined,
      category: e.category as EventApiCategory,
      tags: e.tags,
    }));
}
