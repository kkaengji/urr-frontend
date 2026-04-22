import { delay } from "@/shared/lib/mockDelay";
import type { EventTag } from "@/entities/event";

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
  artistId: number;
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
  tags?: EventTag[];
  endDate?: string;
}

const mockEventSummaries: EventSummary[] = [
  { eventId: 1, artistId: 1, title: "G-Dragon 2026 DOME TOUR", description: "G-Dragon 2026 국내 돔투어", venueTemplateId: 1, venueTemplateName: "KSPO DOME", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-06-01", endDate: "2026-06-02", active: true, posterImageUrl: "/artists/1/events/upcoming_gdragon-2026-mama.png", artistName: "G-Dragon", category: "concert" },
  { eventId: 2, artistId: 2, title: "BTS YET TO COME ENCORE IN SEOUL", description: "BTS 앙코르 콘서트", venueTemplateId: 2, venueTemplateName: "잠실종합운동장 주경기장", venueAddress: "서울 송파구 올림픽로 25", openDate: "2026-08-01", endDate: "2026-08-03", active: true, posterImageUrl: "/artists/2/events/event_bts-yet-to-come-in-cinema.png", artistName: "BTS", category: "concert" },
  { eventId: 3, artistId: 2, title: "BTS 2026 FANMEETING", description: "BTS 팬미팅", venueTemplateId: 3, venueTemplateName: "올림픽 체조 경기장", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-03-01", endDate: "2026-03-01", active: true, posterImageUrl: "/artists/2/events/event_bts-yet-to-come-in-cinema.png", artistName: "BTS", category: "fanmeeting" },
  { eventId: 4, artistId: 3, title: "aespa LIVE SYNK : PARALLEL", description: "aespa 단독 콘서트", venueTemplateId: 1, venueTemplateName: "KSPO DOME", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-09-20", endDate: "2026-09-21", active: true, posterImageUrl: "/artists/3/events/event_aespa-live-synk-parallel.png", artistName: "aespa", category: "concert" },
  { eventId: 5, artistId: 4, title: "IVE WORLD TOUR SHOW WHAT I AM", description: "IVE 월드투어 서울", venueTemplateId: 1, venueTemplateName: "KSPO DOME", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-06-20", endDate: "2026-06-22", active: true, posterImageUrl: "/artists/4/events/event_ive-show-what-i-am.png", artistName: "IVE", category: "concert" },
  { eventId: 6, artistId: 4, title: "IVE FANCON 2026", description: "IVE 팬콘서트", venueTemplateId: 3, venueTemplateName: "올림픽 체조 경기장", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-04-05", endDate: "2026-04-06", active: true, posterImageUrl: "/artists/4/events/event_ive-show-what-i-am.png", artistName: "IVE", category: "fanmeeting" },
  { eventId: 7, artistId: 5, title: "BLACKPINK BORN PINK WORLD TOUR SEOUL", description: "블랙핑크 월드투어 서울", venueTemplateId: 4, venueTemplateName: "고척스카이돔", venueAddress: "서울 구로구 경인로 430", openDate: "2026-07-15", endDate: "2026-07-16", active: true, posterImageUrl: "/artists/5/events/event_blackpink-born-pink.png", artistName: "BLACKPINK", category: "concert" },
  { eventId: 8, artistId: 6, title: "Stray Kids 5-STAR DOME TOUR 2026", description: "스트레이 키즈 돔투어", venueTemplateId: 1, venueTemplateName: "KSPO DOME", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-05-10", endDate: "2026-05-11", active: true, posterImageUrl: "/artists/6/events/event_stray-kids-domin-world-tour.png", artistName: "Stray Kids", category: "concert" },
  { eventId: 9, artistId: 7, title: "SEVENTEEN WORLD TOUR BE THE SUN", description: "세븐틴 월드투어 서울", venueTemplateId: 2, venueTemplateName: "잠실종합운동장 주경기장", venueAddress: "서울 송파구 올림픽로 25", openDate: "2026-05-25", endDate: "2026-05-27", active: true, posterImageUrl: "/artists/7/events/event_seventeen-be-the-sun.png", artistName: "SEVENTEEN", category: "concert" },
  { eventId: 10, artistId: 8, title: "NewJeans 2nd Concert", description: "뉴진스 두 번째 콘서트", venueTemplateId: 1, venueTemplateName: "KSPO DOME", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-10-01", endDate: "2026-10-02", active: true, posterImageUrl: "/artists/8/events/presale_newjeans-fan-meeting.png", artistName: "NewJeans", category: "concert" },
  { eventId: 11, artistId: 8, title: "NewJeans × COMPLEXCON", description: "뉴진스 콤플렉스콘", venueTemplateId: 5, venueTemplateName: "Long Beach Convention Center", venueAddress: "Long Beach, CA", openDate: "2026-05-10", endDate: "2026-05-11", active: true, posterImageUrl: "/artists/8/events/event_newjeans-complexcon.png", artistName: "NewJeans", category: "festival" },
  { eventId: 12, artistId: 16, title: "IU CONCERT 'The Golden Hour'", description: "아이유 단독 콘서트", venueTemplateId: 1, venueTemplateName: "KSPO DOME", venueAddress: "서울 송파구 올림픽로 424", openDate: "2026-11-15", endDate: "2026-11-16", active: true, posterImageUrl: "/home/featured-iu.png", artistName: "IU", category: "concert" },
];

export async function getEvents(): Promise<EventSummary[]> {
  await delay(400);
  return mockEventSummaries;
}
