import { delay } from "@/shared/lib/mockDelay";
import type { EventDate, Section } from "@/shared/types";
import type { EventApiCategory } from "./getEvents";
import { mockEvents, findMockEvent } from "@/shared/lib/mocks/events";

// ─── UI-layer EventDetail type (used by event-detail widgets) ───────────────

export type EventCategory =
  | "concert"
  | "fanmeeting"
  | "domestic"
  | "festival"
  | "musical"
  | "etc";

export type EventCategoryFilter = "all" | EventCategory;

export const eventCategoryFilters: { value: EventCategoryFilter; label: string }[] = [
  { value: "all",        label: "전체" },
  { value: "concert",    label: "콘서트" },
  { value: "fanmeeting", label: "팬미팅" },
  { value: "domestic",   label: "내한공연" },
  { value: "festival",   label: "페스티벌" },
  { value: "musical",    label: "뮤지컬" },
  { value: "etc",        label: "기타" },
];

export interface EventDetail {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  subtitle: string;
  venue: string;
  venueAddress: string;
  dates: EventDate[];
  poster: string;
  detailInfoImage: string;
  status: "open" | "closed" | "upcoming" | "soldout";
  category: EventCategory;
  tags: string[];

  runtime: string;
  ageRating: string;
  notices: string[];
  membershipPreSaleNotice: string[];
  identityVerification: string[];
  castInfo: string;
  performanceDescription: string;

  organizer: EventDetailOrganizer;
  sections: Section[];
  bookingFee: string;
  shippingFee: string;
  validityPeriod: string;
  cancellationPolicy: EventDetailCancellationRule[];
  ticketDelivery: string[];
  mobileTicketInfo: string[];
  precautions: string[];
  sellerInfo: { name: string; bizNumber: string; ceo: string; address: string };
  escrowInfo: string;
}

export interface EventDetailOrganizer {
  host: string;
  manager: string;
  contact: string;
  email: string;
}

export interface EventDetailSection {
  name: string;
  price: number;
  totalSeats: number;
}

export interface EventDetailCancellationRule {
  period: string;
  fee: string;
}

export interface EventDetailResponse {
  eventId: number;
  artistId?: number;
  artistName?: string;
  title: string;
  subtitle: string;
  description: string;
  venueTemplateId: number;
  venueTemplateName: string;
  venueAddress: string;
  posterImageUrl: string;
  detailInfoImageUrl: string;
  category: EventApiCategory;
  tags: string[];
  openDate: string;
  endDate: string;
  active: boolean;
  runtime: string;
  ageRating: string;
  notices: string[];
  identityVerification: string[];
  castInfo: string;
  cancellationPolicy: EventDetailCancellationRule[];
  ticketDelivery: string[];
  sections: EventDetailSection[];
  organizer: EventDetailOrganizer;
}

export async function getEventDetail(
  _artistId: string | number,
  eventId: string | number,
): Promise<EventDetailResponse> {
  await delay(350);
  const e = findMockEvent(eventId);
  if (!e) {
    const fallback = mockEvents[0];
    return {
      eventId: Number(eventId),
      artistId: fallback.artistId || undefined,
      artistName: fallback.artistName || undefined,
      title: "공연 상세",
      subtitle: "",
      description: "공연 설명입니다.",
      venueTemplateId: 1,
      venueTemplateName: "공연장",
      venueAddress: "서울특별시",
      posterImageUrl: "",
      detailInfoImageUrl: "",
      category: "concert",
      tags: [],
      openDate: "2026-06-01",
      endDate: "2026-06-01",
      active: true,
      runtime: "120분",
      ageRating: "전체 관람가",
      notices: [],
      identityVerification: [],
      castInfo: "",
      cancellationPolicy: [
        { period: "공연일 10일 전까지", fee: "없음" },
        { period: "공연 당일", fee: "환불 불가" },
      ],
      ticketDelivery: ["모바일 티켓"],
      sections: [
        { name: "VIP", price: 198000, totalSeats: 500 },
        { name: "S",   price: 132000, totalSeats: 3000 },
        { name: "R",   price: 110000, totalSeats: 5000 },
        { name: "A",   price: 99000,  totalSeats: 6500 },
      ],
      organizer: { host: "URR Entertainment", manager: "URR 공연사업팀", contact: "02-1234-5678", email: "concert@urr.kr" },
    };
  }
  return {
    eventId: e.eventId,
    artistId: e.artistId || undefined,
    artistName: e.artistName || undefined,
    title: e.title,
    subtitle: e.subtitle,
    description: e.description,
    venueTemplateId: e.venueTemplateId,
    venueTemplateName: e.venueName,
    venueAddress: e.venueAddress,
    posterImageUrl: e.posterImageUrl,
    detailInfoImageUrl: e.detailInfoImageUrl,
    category: e.category as EventApiCategory,
    tags: e.tags,
    openDate: e.openDate,
    endDate: e.endDate,
    active: e.active,
    runtime: e.runtime,
    ageRating: e.ageRating,
    notices: e.notices,
    identityVerification: e.identityVerification,
    castInfo: e.castInfo,
    cancellationPolicy: e.cancellationPolicy,
    ticketDelivery: e.ticketDelivery,
    sections: e.sections,
    organizer: e.organizer,
  };
}
