import { delay } from "@/shared/lib/mockDelay";
import type { EventDate, Section } from "@/shared/types";
import type { EventApiCategory } from "./getEvents";

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

const iuCancellationPolicy: EventDetailCancellationRule[] = [
  { period: "예매 후 7일이내", fee: "없음" },
  { period: "예매 후 8일 ~ 관람일 10일이내", fee: "장당 4,000원 (티켓금액의 10% 한도)" },
  { period: "관람일 9일 전 ~ 7일전", fee: "티켓금액의 10%" },
  { period: "관람일 6일 전 ~ 3일전", fee: "티켓금액의 20%" },
  { period: "관람일 2일 전 ~ 1일전", fee: "티켓금액의 30%" },
];

const iuOrganizer: EventDetailOrganizer = {
  host: "EDAM 엔터테인먼트",
  manager: "주식회사 공연팀",
  contact: "1899-0042",
  email: "help@melon.com",
};

const aespaOrganizer: EventDetailOrganizer = {
  host: "SM Entertainment",
  manager: "SM 공연사업팀",
  contact: "1899-0042",
  email: "help@melon.com",
};

const lucyOrganizer: EventDetailOrganizer = {
  host: "Antenna Entertainment",
  manager: "Antenna 공연팀",
  contact: "1544-1555",
  email: "concert@antenna.kr",
};

const mockEventDetails: Record<number, EventDetailResponse> = {
  4: {
    eventId: 4, artistId: 3, artistName: "aespa",
    title: "2025 aespa LIVE TOUR - SYNK : aeXIS LINE -", subtitle: "aeXIS LINE",
    description: "aespa 단독 콘서트 aeXIS LINE. 팬클럽 'MY' 멤버십(GL) 선예매.",
    venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/artists/3/events/poster.jpg",
    detailInfoImageUrl: "/artists/3/events/detail-info.jpg",
    category: "concert", tags: ["단독판매", "인증예매"],
    openDate: "2025-08-29", endDate: "2025-08-31", active: true,
    runtime: "공연 시간 미정", ageRating: "미취학아동 입장 불가",
    notices: [
      "팬클럽 선예매: aespa 공식 팬클럽 'MY' 멤버십(GL) 회원에 한하여 가능합니다.",
      "팬클럽 선예매 인증 기간: 2025년 6월 10일(화) 3:00PM ~ 2025년 6월 26일(목) 11:59PM (KST)",
      "팬클럽 선예매 기간: 2025년 6월 26일(목) 8:00PM ~ 11:59PM (KST)",
      "일반예매 기간: 2025년 6월 27일(금) 8:00PM (KST)~",
      "예매수수료: 장당 4,000원 (전화예매 시 장당 5,000원)",
      "공연 당일 현장판매 진행되지 않습니다. 공연 6시간 전까지 예매 가능.",
      "티켓 분실, 파손 등 어떠한 경우에도 재발권 및 입장 불가.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "멜론티켓 예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    castInfo: "aespa (카리나, 지젤, 윈터, 닝닝)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄 배송 (8월 7일부터 순차 배송)"],
    sections: [
      { name: "aeXIS석", price: 198000, totalSeats: 2000 },
      { name: "일반석",   price: 154000, totalSeats: 13000 },
    ],
    organizer: aespaOrganizer,
  },
  5: {
    eventId: 5, artistId: 5, artistName: "LUCY",
    title: "2026 LUCY 9TH CONCERT 〈ISLAND〉", subtitle: "ISLAND",
    description: "LUCY 9번째 단독 콘서트 ISLAND. 두 번의 공연으로 만나는 LUCY의 감성.",
    venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/artists/5/events/poster.gif",
    detailInfoImageUrl: "/artists/5/events/detail-info.jpg",
    category: "concert", tags: [],
    openDate: "2026-05-16", endDate: "2026-05-17", active: true,
    runtime: "130분", ageRating: "8세 이상 관람가능",
    notices: [
      "일괄배송: 4월 22일(수) ~ 4월 27일(월), 4일간",
      "일괄 배송은 2026년 4월 15일(수) 09:59AM(KST)까지 예매 완료된 건부터 순차적으로 배송됩니다.",
      "일괄 배송일 이후 예매하시는 분들은 현장 수령만 가능합니다.",
      "2026년 4월 16일(목) 09:59AM(KST)까지 배송지 변경 가능.",
      "휠체어석 예매: 2026년 4월 14일(화) 9:00AM(KST)~ (NOL 고객센터 1544-1555, 전화예매만 가능)",
      "본 공연은 안심예매 서비스를 적용합니다.",
      "본 공연은 예매대기서비스와 동일좌석 재예매서비스 이용이 제한됩니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    castInfo: "LUCY (완, 상엽, 현철, 광선)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.04.22~27)"],
    sections: [
      { name: "스탠딩석", price: 154000, totalSeats: 5000 },
      { name: "지정석R",  price: 154000, totalSeats: 5000 },
      { name: "지정석S",  price: 143000, totalSeats: 5000 },
    ],
    organizer: lucyOrganizer,
  },
  2: {
    eventId: 2, artistId: 2, artistName: "BTS",
    title: "BTS WORLD TOUR 'ARIRANG' IN BUSAN", subtitle: "ARIRANG",
    description: "BTS 월드투어 부산 공연. 360도 무대로 공연장 전체 구역에서 관람 가능.",
    venueTemplateId: 2, venueTemplateName: "부산아시아드 주경기장",
    venueAddress: "부산광역시 연제구 월드컵대로 344",
    posterImageUrl: "/artists/2/events/poster.gif",
    detailInfoImageUrl: "/artists/2/events/detail-info.jpg",
    category: "concert", tags: ["콘서트", "월드투어"],
    openDate: "2026-06-12", endDate: "2026-06-13", active: true,
    runtime: "120분", ageRating: "만 9세 이상",
    notices: [
      "비정상적이거나 부정한 방법(예: 매크로 사용 등)을 이용한 티켓 구매가 확인된 건들은 예매 취소 처리될 예정입니다.",
      "공연장에서 모바일 티켓 열람 시, 데이터 트래픽에 의해 원활하지 않을 수 있으니 공연장 출발 전 모바일 티켓 사전 열람 및 저장 후 도착 바랍니다.",
      "본 공연은 360도 무대로 무대 정면이 지정되어 있지 않고 공연장 전체 구역에서 관람이 가능합니다.",
      "공연장 내 음료 및 음식물 반입 금지. 병, 폭죽, 레이저 등 위험 물질과 반려동물, 꽃다발, 풍선 반입 제한.",
      "공연 당일 공연장 내 주차가 불가하므로 대중교통을 이용하시기 바랍니다.",
      "본 공연은 야외 공연으로 기상 악화에 대비해 주시기 바랍니다. 객석 내 우산·양산 사용 금지.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
      "본 공연은 예매대기서비스와 동일좌석 재예매서비스 이용이 제한됩니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    castInfo: "BTS (RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "SOUND CHECK", price: 264000, totalSeats: 500 },
      { name: "GENERAL R",   price: 220000, totalSeats: 20000 },
      { name: "GENERAL S",   price: 198000, totalSeats: 30000 },
    ],
    organizer: { host: "HYBE", manager: "HYBE 공연사업팀", contact: "1544-1234", email: "concert@hybe.com" },
  },
  8: {
    eventId: 8, artistId: 6, artistName: "DAY6",
    title: "DAY6 10th Anniversary Tour 〈The DECADE〉 in BUSAN", subtitle: "The DECADE",
    description: "DAY6 데뷔 10주년 기념 전국 투어 부산 공연.",
    venueTemplateId: 6, venueTemplateName: "벡스코 제1전시장 1~2홀",
    venueAddress: "부산광역시 해운대구 APEC로 55",
    posterImageUrl: "/artists/6/events/poster.gif",
    detailInfoImageUrl: "/artists/6/events/detail-info.jpg",
    category: "concert", tags: ["콘서트", "10주년"],
    openDate: "2026-05-16", endDate: "2026-05-17", active: true,
    runtime: "120분", ageRating: "만 7세 이상",
    notices: [
      "My Day 6기 선예매 인증: 2026년 4월 10일(금) 4PM ~ 2026년 4월 16일(목) 11:59PM (KST)",
      "선예매 인증 기간이 지나면 인증이 불가하며, 선예매 참여가 불가합니다. 사전에 미리 인증해 주시기 바랍니다.",
      "부정예매가 의심되는 경우 현장에서 예매자 본인확인 및 부정 예매에 대한 추가 확인 절차가 진행될 수 있습니다.",
      "반드시 공연을 관람할 본인의 이름으로 예매해야 하며 예매자 본인이 아닌 경우 공연 관람이 불가합니다.",
      "2026년 04월 17일 00시 00분~2026년 05월 17일 23시 59분까지 무통장입금 결제가 불가능합니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    castInfo: "DAY6 (Young K, Wonpil, Dowoon, Sungjin, Jae)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "지정석", price: 154000, totalSeats: 10000 },
    ],
    organizer: { host: "JYP Entertainment", manager: "JYP 공연사업팀", contact: "02-2600-6000", email: "concert@jype.com" },
  },
  9: {
    eventId: 9, artistId: 7, artistName: "KiiiKiii",
    title: "2026 KiiiKiii FAN CONCERT 〈KiiiKiii FesTiiival〉", subtitle: "KiiiKiii FesTiiival",
    description: "KiiiKiii 팬콘서트 서울 공연.",
    venueTemplateId: 7, venueTemplateName: "블루스퀘어 우리WON뱅킹홀",
    venueAddress: "서울특별시 용산구 한남대로 347",
    posterImageUrl: "/artists/7/events/poster.gif",
    detailInfoImageUrl: "/artists/7/events/detail-info.jpg",
    category: "fanmeeting", tags: ["팬콘서트"],
    openDate: "2026-05-16", endDate: "2026-05-17", active: true,
    runtime: "120분", ageRating: "7세 이상 관람가능",
    notices: [
      "팬클럽 인증 기간: 2026년 4월 13일(월) 오후 2시 ~ 16일(목) 오후 11시 59분까지",
      "팬클럽 선예매 기간: 2026년 4월 15일(수) 오후 7시 ~ 16일(목) 오후 11시 59분까지",
      "일반예매: 2026년 4월 17일(금) 오후 7시",
      "매수제한: 회차별 1인 2매 (선예매 회차별 1인 1매 포함)",
      "일괄배송: 4월 20일(월) ~ 4월 21일(화)",
      "7세 이상(2019년생 포함 이전 출생자) 관람가로, 관람 연령 미만은 보호자 동반 여부와 관계없이 입장 불가.",
      "휠체어석 예매는 4월 20일(월) 오전 10시부터 블루스퀘어 고객센터를 통해서만 예매 가능 (1544-1591)",
    ],
    identityVerification: [
      "부정 예매 방지를 위해 본인 인증이 완료된 계정에 한하여 예매 가능합니다.",
      "NOL 계정 관리 > 본인 인증 페이지에서 반드시 본인 인증을 완료해 주시기 바랍니다.",
    ],
    castInfo: "KiiiKiii",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.04.20~21)"],
    sections: [
      { name: "전석", price: 121000, totalSeats: 2000 },
    ],
    organizer: { host: "IST Entertainment", manager: "IST 공연사업팀", contact: "02-1234-5678", email: "concert@ist.com" },
  },
  10: {
    eventId: 10,
    title: "2026 Weverse Con Festival", subtitle: "CON TICKET, CON TICKET＋",
    description: "2026 위버스콘 페스티벌. CON TICKET(지정석)과 CON TICKET＋(스탠딩) 두 종류로 구성된 콘서트 패키지.",
    venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/events/1/poster.gif",
    detailInfoImageUrl: "/events/1/detail-info.jpg",
    category: "festival", tags: ["단독판매", "얼굴패스", "안심예매"],
    openDate: "2026-06-06", endDate: "2026-06-07", active: true,
    runtime: "공연 시간 미정", ageRating: "만 9세 이상",
    notices: [
      "2026 위버스콘 페스티벌 홈페이지에서 상세 안내 확인 바랍니다.",
      "티켓은 총 5종이며, 각 상품별로 적용 장소 및 관람 가능시간이 다릅니다.",
      "공연 안내사항을 반드시 확인하고 숙지하신 후 예매하시기 바랍니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
      "본 공연은 예매대기서비스와 동일좌석 재예매서비스 이용이 제한됩니다.",
      "본 공연은 안심예매 서비스를 적용합니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    castInfo: "",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "CON TICKET＋ (스탠딩)", price: 165000, totalSeats: 5000 },
      { name: "CON TICKET (지정석)",   price: 154000, totalSeats: 10000 },
    ],
    organizer: { host: "Weverse Con Festival", manager: "공연사업팀", contact: "1544-1555", email: "help@weverse.io" },
  },
  11: {
    eventId: 11,
    title: "2026 서울파크뮤직페스티벌", subtitle: "26SPMF",
    description: "2026 서울파크뮤직페스티벌. 올림픽공원 88잔디마당에서 열리는 대규모 야외 음악 페스티벌.",
    venueTemplateId: 8, venueTemplateName: "올림픽공원 88잔디마당",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/events/2/poster.gif",
    detailInfoImageUrl: "/events/2/detail-info.jpg",
    category: "festival", tags: ["단독판매", "청년문화패스"],
    openDate: "2026-06-20", endDate: "2026-06-21", active: true,
    runtime: "540분", ageRating: "전체관람가",
    notices: [
      "토요일: 14:00~22:30 / 일요일: 14:00~21:30",
      "우천 시에도 공연은 진행되며 필요 시 우비를 배포합니다.",
      "출연 아티스트와 공연 시간은 부득이한 사정으로 변경될 수 있습니다.",
      "티켓 양도 및 개인 간의 거래는 명백한 불법입니다.",
      "예매자 본인 외에는 티켓 및 입장팔찌의 대리 수령이 불가합니다.",
      "2026년 03월 06일 00시~2026년 06월 21일 23시 59분까지 무통장입금 결제가 불가합니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자 본인 외 대리 수령 불가.",
    ],
    castInfo: "",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["현장 수령 (손목밴드)"],
    sections: [
      { name: "오피셜 티켓", price: 119000, totalSeats: 20000 },
    ],
    organizer: { host: "서울파크뮤직페스티벌", manager: "공연사업팀", contact: "1544-1555", email: "help@spmf.kr" },
  },
  14: {
    eventId: 14,
    title: "뮤지컬 〈킹키부츠〉 - 부산", subtitle: "KINKY BOOTS",
    description: "브로드웨이 토니상 수상작 뮤지컬 킹키부츠 부산 공연.",
    venueTemplateId: 9, venueTemplateName: "부산 드림씨어터",
    venueAddress: "부산광역시 수영구 민락동 192-2",
    posterImageUrl: "/events/4/poster.gif",
    detailInfoImageUrl: "/events/4/detail-info.jpg",
    category: "musical", tags: ["좌석우위", "예매대기", "청년문화패스"],
    openDate: "2026-04-25", endDate: "2026-05-03", active: true,
    runtime: "155분 (인터미션 20분 포함)", ageRating: "8세 이상 관람가능",
    notices: [
      "4.25(토) ~ 26(일) 2시, 7시 / 5.1(금) 7시 / 5.2(토) 2시, 7시 / 5.3(일) 2시",
      "*4.27(월)~4.30(목) 공연없음",
      "본 공연은 재판매·불법거래 방지를 위해 무통장 입금을 제한합니다. (2026.04.10~05.03)",
      "일괄배송: 2026년 4월 1일(수) ~ 3일(금)",
      "공연당일 혼잡 방지를 위해 초기 예매분은 일괄배송 방식으로만 운영합니다.",
      "휠체어석은 공연 3일 전까지 드림씨어터 고객센터(1833-3755)를 통한 전화 예매만 가능합니다.",
      "본 공연은 오케스트라 연주가 아닌 MR로 진행됩니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "증빙이 필요한 할인 내역이 있는 경우 공연 당일 증빙서류를 반드시 지참해 주시기 바랍니다.",
    ],
    castInfo: "찰리(김호영/이재환/신재범), 롤라(강홍석/백형훈/서경수), 로렌(한재아/허윤슬), 돈(신승환/심재현/김동현)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["일괄배송 (2026.04.01~03)"],
    sections: [
      { name: "VIP석", price: 170000, totalSeats: 300 },
      { name: "R석",   price: 140000, totalSeats: 500 },
      { name: "S석",   price: 110000, totalSeats: 800 },
      { name: "A석",   price: 80000,  totalSeats: 400 },
    ],
    organizer: defaultOrganizer,
  },
  15: {
    eventId: 15,
    title: "민트페스타 vol.83", subtitle: "MINT FESTA vol.83",
    description: "KT&G 상상마당 홍대 라이브홀에서 만나는 민트페스타 vol.83.",
    venueTemplateId: 10, venueTemplateName: "KT&G 상상마당 홍대 라이브홀",
    venueAddress: "서울특별시 마포구 어울마당로 65",
    posterImageUrl: "/events/5/poster.gif",
    detailInfoImageUrl: "/events/5/detail-info.jpg",
    category: "concert", tags: ["단독판매", "안심예매", "예매대기", "청년문화패스"],
    openDate: "2026-06-07", endDate: "2026-06-07", active: true,
    runtime: "150분", ageRating: "만 7세 이상",
    notices: [
      "2026년 6월 7일(일) 5PM",
      "본 공연은 안심예매 서비스가 적용됩니다.",
      "전석 스탠딩 공연으로 빠른 번호를 예매하실수록 먼저 입장하실 수 있습니다.",
      "회차별 1인당 2매까지 예매 가능합니다.",
      "직계 가족 외 티켓의 대리 수령 및 양도는 허용하지 않습니다.",
      "무통장 입금: 4월 28일(화) ~ 5월 31일(일) 23:59까지 가능.",
      "일괄 배송일: 2026년 5월 14일(목) ~ 15일(금)",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "직계 가족 명의 예매 시 가족관계증명서류·예매자 본인 신분증·관람자 본인 신분증 모두 지참 필요",
    ],
    castInfo: "",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["일괄배송 (2026.05.14~15)", "현장 수령"],
    sections: [
      { name: "스탠딩", price: 66000, totalSeats: 500 },
    ],
    organizer: defaultOrganizer,
  },
  16: {
    eventId: 16,
    title: "뮤지컬 〈김종욱 찾기〉", subtitle: "FINDING MR. KIM",
    description: "뮤지컬 주간 41위, 평점 9.9. 대학로 틴틴홀 장기 롱런 뮤지컬.",
    venueTemplateId: 11, venueTemplateName: "대학로 틴틴홀",
    venueAddress: "서울특별시 종로구 대학로12길 31",
    posterImageUrl: "/events/6/poster.gif",
    detailInfoImageUrl: "/events/6/detail-info.jpg",
    category: "musical", tags: [],
    openDate: "2026-03-07", endDate: "2026-05-31", active: true,
    runtime: "100분", ageRating: "만 7세 이상",
    notices: [
      "평일: 2시, 5시, 8시 / 주말 및 공휴일: 1시, 3시 10분, 5시 30분, 7시 40분",
      "*5/20(수)는 8시 1회만 진행됩니다.",
      "공연 시작 이후에는 입장 및 재입장이 불가합니다. 반드시 공연 시작 전까지 입장해 주시기 바랍니다.",
      "공연 당일에는 취소·변경·환불이 불가합니다. (문의: 인터파크 1544-1555)",
      "관람 당일 할인 증빙자료 미지참 시 정가 기준의 차액을 지불해야 합니다.",
      "관람 등급 미만 관람객은 보호자 동반 여부와 관계없이 입장이 불가합니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    castInfo: "그남자(김도휘/김도현/염승윤) 등",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["현장 수령"],
    sections: [
      { name: "전석", price: 50000, totalSeats: 200 },
    ],
    organizer: { host: "주식회사 네오", manager: "공연사업팀", contact: "1544-1555", email: "concert@neo.kr" },
  },
  17: {
    eventId: 17,
    title: "아라리오뮤지엄 인 스페이스", subtitle: "ARARIO MUSEUM IN SPACE",
    description: "서울 종로구에 위치한 아라리오뮤지엄 인 스페이스 상설 전시.",
    venueTemplateId: 12, venueTemplateName: "아라리오뮤지엄 인 스페이스",
    venueAddress: "서울특별시 종로구 율곡로 83",
    posterImageUrl: "/events/7/poster.gif",
    detailInfoImageUrl: "/events/7/detail-info.jpg",
    category: "etc", tags: ["청년문화패스"],
    openDate: "2026-01-01", endDate: "2026-12-31", active: true,
    runtime: "90분", ageRating: "만 11세 이상",
    notices: [
      "운영시간: 화~일 10:00~19:00 (입장마감 18:00) / 매주 월요일 정규 휴관",
      "예매 마감시간 — 화~토요일(공휴일 포함): 전일 17시 / 일요일: 전일 11시",
      "당일 예매 변경 및 취소는 불가합니다.",
    ],
    identityVerification: [],
    castInfo: "",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["현장 수령"],
    sections: [
      { name: "입장권 - 성인",     price: 15000, totalSeats: 100 },
      { name: "입장권 - 청소년",   price: 9000,  totalSeats: 100 },
      { name: "입장권 - 초등학생", price: 6000,  totalSeats: 100 },
    ],
    organizer: { host: "아라리오뮤지엄", manager: "운영팀", contact: "02-736-5700", email: "info@arariomuseum.or.kr" },
  },
  18: {
    eventId: 18,
    title: "PEAK FESTIVAL 2026", subtitle: "PEAK FESTIVAL",
    description: "난지한강공원에서 펼쳐지는 대규모 야외 음악 페스티벌.",
    venueTemplateId: 13, venueTemplateName: "난지한강공원",
    venueAddress: "서울특별시 마포구 하늘공원로 95",
    posterImageUrl: "/events/8/poster.gif",
    detailInfoImageUrl: "/events/8/detail-info.jpg",
    category: "festival", tags: ["청년문화패스"],
    openDate: "2026-05-23", endDate: "2026-05-24", active: true,
    runtime: "540분", ageRating: "전체관람가",
    notices: [
      "2026년 05월 23일(토) 12:00~ / 2026년 05월 24일(일) 12:00~",
      "일반 티켓: 2026년 3월 4일(수) 오후 6시부터 예매 가능",
      "일일권과 양일권 모두 구매 가능하며, 권종별 할당 수량 소진 시 조기 마감될 수 있습니다.",
      "일일권은 예매하신 날짜에만 관람 가능하며, 다른 날짜로의 변경은 불가합니다.",
      "양일권은 5월 23일 날짜 선택 후 양일권 권종으로 예매해 주시기 바랍니다.",
      "공식 예매처 외 경로로 구매한 티켓은 부정 티켓으로 간주되며 강제 취소 처리됩니다.",
      "일괄배송일: 4월 29일(목) ~ 30일(금)",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    castInfo: "스파이에어, 쏜애플, 이디오테잎, 솔루션스, 초록불꽃소년단, 정우, 넬 (5/23) / 자우림, 10cm, 로맨틱펀치, 바이바이배드맨, 리도어, 윤마치, 원위, 나상현씨밴드, 신인류, FT아일랜드 (5/24)",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["일괄배송 (2026.04.29~30)"],
    sections: [
      { name: "양일권",     price: 149000, totalSeats: 10000 },
      { name: "일일권(토)", price: 110000, totalSeats: 6000 },
      { name: "일일권(일)", price: 110000, totalSeats: 6000 },
    ],
    organizer: defaultOrganizer,
  },
  12: {
    eventId: 12,
    title: "오피셜히게단디즘 아시아 투어 2026 in SEOUL", subtitle: "OFFICIAL HIGE DANDISM ASIA TOUR 2026",
    description: "일본 밴드 오피셜히게단디즘의 아시아 투어 서울 공연.",
    venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/events/3/poster.gif",
    detailInfoImageUrl: "/events/3/detail-info.jpg",
    category: "concert", tags: ["단독판매", "안심예매"],
    openDate: "2026-08-08", endDate: "2026-08-09", active: true,
    runtime: "공연 시간 미정", ageRating: "만 12세 이상",
    notices: [
      "본 공연은 아이디당 1인 2매까지 구매 가능하며, 해당 예매 매수 제한은 공연 회차당이 아닙니다.",
      "(8월 8일 공연에서 2매를 예매한 경우, 동일 아이디로 8월 9일 공연 예매는 불가)",
      "본 공연은 예매대기 서비스를 진행하지 않습니다.",
      "2026년 4월 16일 오후 7시 ~ 2026년 4월 17일 오후 11시 59분 무통장입금 결제 불가.",
      "휠체어석은 콜센터를 통한 전화예매만 가능합니다. (tel.1544-1555)",
      "일괄 배송: 2026년 07월 20일~23일 (4일간)",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    castInfo: "Official HIGE DANDism",
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄 배송 (2026.07.20~23)"],
    sections: [
      { name: "스탠딩R", price: 165000, totalSeats: 3000 },
      { name: "스탠딩S", price: 154000, totalSeats: 3000 },
      { name: "지정석R", price: 165000, totalSeats: 2000 },
      { name: "지정석S", price: 154000, totalSeats: 2000 },
      { name: "지정석A", price: 143000, totalSeats: 2000 },
      { name: "지정석B", price: 132000, totalSeats: 2000 },
    ],
    organizer: { host: "FNC Entertainment", manager: "공연사업팀", contact: "1544-1555", email: "concert@fnc.co.kr" },
  },
  13: {
    eventId: 13, artistId: 1, artistName: "IU",
    title: "2025 IU FAN MEET-UP [Bye, Summer]", subtitle: "Bye, Summer",
    description: "아이유의 여름 마지막을 함께하는 특별한 팬미팅. 두근두근 설레는 순간들이 가득한 행복한 시간.",
    venueTemplateId: 1, venueTemplateName: "KSPO DOME (올림픽 체조 경기장)",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    posterImageUrl: "/artists/1/events/poster.jpg",
    detailInfoImageUrl: "/artists/1/events/detail-info.png",
    category: "fanmeeting", tags: ["단독판매", "인증예매"],
    openDate: "2025-09-13", endDate: "2025-09-14", active: true,
    runtime: "120분", ageRating: "전체 관람가",
    notices: [
      "본 공연은 단독판매 · 인증예매 상품입니다.",
      "선예매: 2025년 8월 11일(월) 오후 8시 ~ 오후 11시 59분 (KST)",
      "일반예매: 2025년 8월 13일(수) 오후 8시 (KST)",
      "매수제한: 회원별 1인 1매 (아이디가 여러 개인 경우 본인인증 받은 모든 아이디 합산 적용)",
      "1회차 예매마감: 2025년 9월 11일(목) 오전 9시 59분 (KST)",
      "2회차 예매마감: 2025년 9월 12일(금) 오전 9시 59분 (KST)",
      "무통장 입금 제한: 2025년 9월 8일(월) 오전 12시부터 무통장 입금 예매 불가",
      "장애인(1~6급), 국가유공자 50% 할인 (본인만 / 증빙서류 미지참 시 현장 차액 지불)",
    ],
    identityVerification: [
      "본인인증 예매 상품으로 예매 시 본인인증이 필요합니다.",
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "본인 확인 불가 시 입장이 제한될 수 있습니다.",
    ],
    castInfo: "IU (아이유)",
    cancellationPolicy: iuCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "VIP석", price: 88000, totalSeats: 500 },
      { name: "R석",   price: 77000, totalSeats: 2000 },
      { name: "S석",   price: 66000, totalSeats: 3000 },
      { name: "A석",   price: 55000, totalSeats: 2500 },
    ],
    organizer: iuOrganizer,
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
    detailInfoImageUrl: "",
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
