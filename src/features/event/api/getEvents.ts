import { delay } from "@/shared/lib/mockDelay";

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

const mockEventSummaries: EventSummary[] = [
  { eventId: 2,  artistId: 2, title: "BTS WORLD TOUR 'ARIRANG' IN BUSAN",                  description: "BTS 월드투어 부산 공연",                                                             venueTemplateId: 2, venueTemplateName: "부산아시아드 주경기장",            venueAddress: "부산광역시 연제구 월드컵대로 344",   openDate: "2026-06-12", endDate: "2026-06-13", active: true, posterImageUrl: "/artists/2/events/poster.gif",  artistName: "BTS",      category: "concert"    },
  { eventId: 4,  artistId: 3, title: "2025 aespa LIVE TOUR - SYNK : aeXIS LINE -",         description: "aespa 단독 콘서트",                                                                 venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",     openDate: "2025-08-29", endDate: "2025-08-31", active: true, posterImageUrl: "/artists/3/events/poster.jpg",  artistName: "aespa",  category: "concert",   tags: ["단독판매", "인증예매"] },
  { eventId: 5,  artistId: 5, title: "2026 LUCY 9TH CONCERT 〈ISLAND〉",                   description: "LUCY 단독 콘서트",                                                                  venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",     openDate: "2026-05-16", endDate: "2026-05-17", active: true, posterImageUrl: "/artists/5/events/poster.gif",  artistName: "LUCY",   category: "concert"    },
  { eventId: 8,  artistId: 6, title: "DAY6 10th Anniversary Tour 〈The DECADE〉 in BUSAN", description: "DAY6 데뷔 10주년 기념 투어 부산 공연",                                               venueTemplateId: 6, venueTemplateName: "벡스코 제1전시장 1~2홀",            venueAddress: "부산광역시 해운대구 APEC로 55",      openDate: "2026-05-16", endDate: "2026-05-17", active: true, posterImageUrl: "/artists/6/events/poster.gif",  artistName: "DAY6",     category: "concert"    },
  { eventId: 9,  artistId: 7, title: "2026 KiiiKiii FAN CONCERT 〈KiiiKiii FesTiiival〉", description: "KiiiKiii 팬콘서트",                                                                  venueTemplateId: 7, venueTemplateName: "블루스퀘어 우리WON뱅킹홀",          venueAddress: "서울특별시 용산구 한남대로 347",     openDate: "2026-05-16", endDate: "2026-05-17", active: true, posterImageUrl: "/artists/7/events/poster.gif",  artistName: "KiiiKiii", category: "fanmeeting" },
{ eventId: 13, artistId: 1, title: "2025 IU FAN MEET-UP [Bye, Summer]",                 description: "아이유의 여름 마지막을 함께하는 특별한 팬미팅. 두근두근 설레는 순간들이 가득한 행복한 시간.", venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424", openDate: "2025-09-13", endDate: "2025-09-14", active: true, posterImageUrl: "/artists/1/events/poster.jpg",  artistName: "IU",       category: "fanmeeting", tags: ["단독판매", "인증예매"] },
  { eventId: 10, title: "2026 Weverse Con Festival",                                         description: "2026 위버스콘 페스티벌 CON TICKET, CON TICKET＋",                                venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",     openDate: "2026-06-06", endDate: "2026-06-07", active: true, posterImageUrl: "/events/1/poster.gif",  category: "festival",  tags: ["단독판매", "얼굴패스", "안심예매"] },
  { eventId: 11, title: "2026 서울파크뮤직페스티벌",                                          description: "2026 서울파크뮤직페스티벌 (26SPMF)",                                              venueTemplateId: 8, venueTemplateName: "올림픽공원 88잔디마당",                  venueAddress: "서울특별시 송파구 올림픽로 424",     openDate: "2026-06-20", endDate: "2026-06-21", active: true, posterImageUrl: "/events/2/poster.gif",  category: "festival",  tags: ["단독판매", "청년문화패스"] },
  { eventId: 12, title: "오피셜히게단디즘 아시아 투어 2026 in SEOUL",                         description: "OFFICIAL HIGE DANDISM ASIA TOUR 2026 in SEOUL",                               venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",     openDate: "2026-08-08", endDate: "2026-08-09", active: true, posterImageUrl: "/events/3/poster.gif",  category: "concert",   tags: ["단독판매", "안심예매"] },
  { eventId: 14, title: "뮤지컬 〈킹키부츠〉 - 부산",                                          description: "브로드웨이 토니상 수상작 뮤지컬 킹키부츠 부산 공연.",                         venueTemplateId: 9,  venueTemplateName: "부산 드림씨어터",                       venueAddress: "부산광역시 수영구 민락동 192-2",     openDate: "2026-04-25", endDate: "2026-05-03", active: true, posterImageUrl: "/events/4/poster.gif",  category: "musical",   tags: ["좌석우위", "예매대기", "청년문화패스"] },
  { eventId: 15, title: "민트페스타 vol.83",                                                    description: "KT&G 상상마당 홍대 라이브홀에서 만나는 민트페스타 vol.83.",                  venueTemplateId: 10, venueTemplateName: "KT&G 상상마당 홍대 라이브홀",            venueAddress: "서울특별시 마포구 어울마당로 65",    openDate: "2026-06-07", endDate: "2026-06-07", active: true, posterImageUrl: "/events/5/poster.gif",  category: "concert",   tags: ["단독판매", "안심예매", "예매대기", "청년문화패스"] },
  { eventId: 16, title: "뮤지컬 〈김종욱 찾기〉",                                               description: "뮤지컬 주간 41위, 평점 9.9. 대학로 틴틴홀 장기 롱런 뮤지컬.",              venueTemplateId: 11, venueTemplateName: "대학로 틴틴홀",                          venueAddress: "서울특별시 종로구 대학로12길 31",    openDate: "2026-03-07", endDate: "2026-05-31", active: true, posterImageUrl: "/events/6/poster.gif",  category: "musical" },
  { eventId: 17, title: "아라리오뮤지엄 인 스페이스",                                           description: "서울 종로구 아라리오뮤지엄 인 스페이스 상설 전시.",                          venueTemplateId: 12, venueTemplateName: "아라리오뮤지엄 인 스페이스",              venueAddress: "서울특별시 종로구 율곡로 83",        openDate: "2026-01-01", endDate: "2026-12-31", active: true, posterImageUrl: "/events/7/poster.gif",  category: "etc",       tags: ["청년문화패스"] },
  { eventId: 18, title: "PEAK FESTIVAL 2026",                                                   description: "난지한강공원에서 펼쳐지는 대규모 야외 음악 페스티벌.",                       venueTemplateId: 13, venueTemplateName: "난지한강공원",                            venueAddress: "서울특별시 마포구 하늘공원로 95",    openDate: "2026-05-23", endDate: "2026-05-24", active: true, posterImageUrl: "/events/8/poster.gif",  category: "festival",  tags: ["청년문화패스"] },
];

export async function getEvents(): Promise<EventSummary[]> {
  await delay(400);
  return mockEventSummaries;
}
