import { delay } from "@/shared/lib/mockDelay";
import type { EventApiCategory } from "./getEvents";

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
  artistId: number;
  artistName: string;
  title: string;
  subtitle: string;
  description: string;
  venueTemplateId: number;
  venueTemplateName: string;
  venueAddress: string;
  posterImageUrl: string;
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

const defaultOrganizer: EventDetailOrganizer = {
  host: "URR Entertainment",
  manager: "URR 공연사업팀",
  contact: "02-1234-5678",
  email: "concert@urr.kr",
};

const defaultCancellationPolicy: EventDetailCancellationRule[] = [
  { period: "공연일 10일 전까지", fee: "없음" },
  { period: "공연일 9~7일 전", fee: "티켓금액의 10%" },
  { period: "공연일 6~3일 전", fee: "티켓금액의 20%" },
  { period: "공연일 2~1일 전", fee: "티켓금액의 30%" },
  { period: "공연 당일", fee: "환불 불가" },
];

const mockEventDetails: Record<number, EventDetailResponse> = {
  1: {
    eventId: 1, artistId: 1, artistName: "G-Dragon",
    title: "G-Dragon 2026 DOME TOUR", subtitle: "POWER",
    description: "G-Dragon의 전설적인 돔투어가 서울에서 펼쳐집니다.",
    venueTemplateId: 1, venueTemplateName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/artists/1/events/upcoming_gdragon-2026-mama.png",
    category: "concert", tags: ["콘서트", "단독공연"],
    openDate: "2026-06-01", endDate: "2026-06-02", active: true,
    runtime: "150분", ageRating: "만 7세 이상",
    notices: ["본 공연은 전석 지정석입니다.", "공연 시작 30분 전까지 입장 바랍니다."],
    identityVerification: ["예매자 본인 신분증 지참 필수"],
    castInfo: "G-Dragon",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "VIP", price: 198000, totalSeats: 500 },
      { name: "S", price: 132000, totalSeats: 3000 },
      { name: "R", price: 110000, totalSeats: 5000 },
      { name: "A", price: 99000, totalSeats: 6500 },
    ],
    organizer: defaultOrganizer,
  },
  2: {
    eventId: 2, artistId: 2, artistName: "BTS",
    title: "BTS YET TO COME ENCORE IN SEOUL", subtitle: "THE CITY",
    description: "BTS의 전 세계를 사로잡은 앙코르 콘서트가 서울에서 열립니다.",
    venueTemplateId: 2, venueTemplateName: "잠실종합운동장 주경기장",
    venueAddress: "서울특별시 송파구 올림픽로 25",
    posterImageUrl: "/artists/2/events/event_bts-yet-to-come-in-cinema.png",
    category: "concert", tags: ["콘서트", "앙코르"],
    openDate: "2026-08-01", endDate: "2026-08-03", active: true,
    runtime: "180분", ageRating: "전체 관람가",
    notices: ["공연 중 촬영 금지", "응원봉은 공식 응원봉만 허용됩니다."],
    identityVerification: ["예매자 본인 신분증 지참 필수"],
    castInfo: "BTS (RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "VIP", price: 220000, totalSeats: 1000 },
      { name: "S", price: 165000, totalSeats: 8000 },
      { name: "R", price: 143000, totalSeats: 15000 },
      { name: "A", price: 110000, totalSeats: 20000 },
    ],
    organizer: defaultOrganizer,
  },
};

function generateFallback(eventId: number): EventDetailResponse {
  return {
    eventId, artistId: 1, artistName: "아티스트",
    title: "공연 상세", subtitle: "",
    description: "공연 설명입니다.",
    venueTemplateId: 1, venueTemplateName: "공연장",
    venueAddress: "서울특별시",
    posterImageUrl: "",
    category: "concert", tags: [],
    openDate: "2026-06-01", endDate: "2026-06-01", active: true,
    runtime: "120분", ageRating: "전체 관람가",
    notices: [], identityVerification: [],
    castInfo: "",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓"],
    sections: [
      { name: "VIP", price: 198000, totalSeats: 500 },
      { name: "S", price: 132000, totalSeats: 3000 },
      { name: "R", price: 110000, totalSeats: 5000 },
      { name: "A", price: 99000, totalSeats: 6500 },
    ],
    organizer: defaultOrganizer,
  };
}

export async function getEventDetail(
  _artistId: string | number,
  eventId: string | number,
): Promise<EventDetailResponse> {
  await delay(350);
  return mockEventDetails[Number(eventId)] ?? generateFallback(Number(eventId));
}
