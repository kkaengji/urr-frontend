export type MockEventCategory = "concert" | "fanmeeting" | "domestic" | "festival" | "musical" | "etc";

export interface MockEventSection {
  name: string;
  price: number;
  totalSeats: number;
}

export interface MockEventOrganizer {
  host: string;
  manager: string;
  contact: string;
  email: string;
}

export interface MockCancellationRule {
  period: string;
  fee: string;
}

export interface MockEventShow {
  id: string;
  date: string;
  totalSeats: number;
  remainingSeats: number;
}

export interface MockEvent {
  eventId: number;
  artistId: number;
  artistName: string;
  title: string;
  subtitle: string;
  description: string;
  posterImageUrl: string;
  detailInfoImageUrl: string;
  venueName: string;
  venueAddress: string;
  venueTemplateId: number;
  openDate: string;
  endDate: string;
  active: boolean;
  category: MockEventCategory;
  tags: string[];
  runtime: string;
  ageRating: string;
  castInfo: string;
  notices: string[];
  identityVerification: string[];
  cancellationPolicy: MockCancellationRule[];
  ticketDelivery: string[];
  sections: MockEventSection[];
  organizer: MockEventOrganizer;
  shows: MockEventShow[];
  presaleShowId?: number;
  presaleSaleOpenAt?: string;
}

// ── Shared defaults ──────────────────────────────────────

const defaultOrganizer: MockEventOrganizer = {
  host: "URR Entertainment",
  manager: "URR 공연사업팀",
  contact: "02-1234-5678",
  email: "concert@urr.kr",
};

const defaultCancellationPolicy: MockCancellationRule[] = [
  { period: "공연일 10일 전까지", fee: "없음" },
  { period: "공연일 9~7일 전", fee: "티켓금액의 10%" },
  { period: "공연일 6~3일 전", fee: "티켓금액의 20%" },
  { period: "공연일 2~1일 전", fee: "티켓금액의 30%" },
  { period: "공연 당일", fee: "환불 불가" },
];

const iuCancellationPolicy: MockCancellationRule[] = [
  { period: "예매 후 7일이내", fee: "없음" },
  { period: "예매 후 8일 ~ 관람일 10일이내", fee: "장당 4,000원 (티켓금액의 10% 한도)" },
  { period: "관람일 9일 전 ~ 7일전", fee: "티켓금액의 10%" },
  { period: "관람일 6일 전 ~ 3일전", fee: "티켓금액의 20%" },
  { period: "관람일 2일 전 ~ 1일전", fee: "티켓금액의 30%" },
];

const iuOrganizer: MockEventOrganizer = {
  host: "EDAM 엔터테인먼트",
  manager: "주식회사 공연팀",
  contact: "1899-0042",
  email: "help@melon.com",
};

const aespaOrganizer: MockEventOrganizer = {
  host: "SM Entertainment",
  manager: "SM 공연사업팀",
  contact: "1899-0042",
  email: "help@melon.com",
};

const lucyOrganizer: MockEventOrganizer = {
  host: "Antenna Entertainment",
  manager: "Antenna 공연팀",
  contact: "1544-1555",
  email: "concert@antenna.kr",
};

// ── Master event list ────────────────────────────────────

export const mockEvents: MockEvent[] = [
  {
    eventId: 1, artistId: 1, artistName: "IU",
    title: "2026 IU CONCERT 〈The Golden Hour〉", subtitle: "The Golden Hour",
    description: "아이유 2026 단독 콘서트. 황금빛 시간을 함께하는 특별한 밤.",
    posterImageUrl: "/artists/1/events/poster2.jpg",
    detailInfoImageUrl: "/artists/1/events/detail-info.png",
    venueName: "KSPO DOME (올림픽체조경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 1,
    openDate: "2026-10-11", endDate: "2026-10-12", active: true,
    category: "concert", tags: ["단독판매", "인증예매"],
    runtime: "120분", ageRating: "전체 관람가",
    castInfo: "IU (아이유)",
    notices: [
      "본 공연은 단독판매 · 인증예매 상품입니다.",
      "유애나 선예매: 2026년 8월 11일(화) 오후 8시 ~ 오후 11시 59분 (KST)",
      "일반예매: 2026년 8월 13일(목) 오후 8시 (KST)",
      "매수제한: 회원별 1인 2매",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "본인 확인 불가 시 입장이 제한될 수 있습니다.",
    ],
    cancellationPolicy: iuCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "VIP석", price: 165000, totalSeats: 1000 },
      { name: "R석",   price: 143000, totalSeats: 5000 },
      { name: "S석",   price: 121000, totalSeats: 6000 },
      { name: "A석",   price: 99000,  totalSeats: 3000 },
    ],
    organizer: iuOrganizer,
    shows: [{ id: "iu-d1", date: "2026-10-11T18:00:00+09:00", totalSeats: 15000, remainingSeats: 3200 }],
  },
  {
    eventId: 2, artistId: 2, artistName: "BTS",
    title: "BTS WORLD TOUR 'ARIRANG' IN BUSAN", subtitle: "ARIRANG",
    description: "BTS 월드투어 부산 공연. 360도 무대로 공연장 전체 구역에서 관람 가능.",
    posterImageUrl: "/artists/2/events/poster.gif",
    detailInfoImageUrl: "/artists/2/events/detail-info.jpg",
    venueName: "부산아시아드 주경기장", venueAddress: "부산광역시 연제구 월드컵대로 344",
    venueTemplateId: 2,
    openDate: "2026-06-12", endDate: "2026-06-13", active: true,
    category: "concert", tags: ["콘서트", "월드투어"],
    runtime: "120분", ageRating: "만 9세 이상",
    castInfo: "BTS (RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook)",
    notices: [
      "비정상적이거나 부정한 방법(예: 매크로 사용 등)을 이용한 티켓 구매가 확인된 건들은 예매 취소 처리될 예정입니다.",
      "본 공연은 360도 무대로 무대 정면이 지정되어 있지 않고 공연장 전체 구역에서 관람이 가능합니다.",
      "공연장 내 음료 및 음식물 반입 금지. 병, 폭죽, 레이저 등 위험 물질과 반려동물, 꽃다발, 풍선 반입 제한.",
      "본 공연은 야외 공연으로 기상 악화에 대비해 주시기 바랍니다. 객석 내 우산·양산 사용 금지.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "SOUND CHECK", price: 264000, totalSeats: 500 },
      { name: "GENERAL R",   price: 220000, totalSeats: 20000 },
      { name: "GENERAL S",   price: 198000, totalSeats: 30000 },
    ],
    organizer: { host: "HYBE", manager: "HYBE 공연사업팀", contact: "1544-1234", email: "concert@hybe.com" },
    shows: [{ id: "bts-d1", date: "2026-06-12T19:00:00+09:00", totalSeats: 65000, remainingSeats: 12000 }],
  },

  {
    eventId: 4, artistId: 3, artistName: "aespa",
    title: "2025 aespa LIVE TOUR - SYNK : aeXIS LINE -", subtitle: "aeXIS LINE",
    description: "aespa 단독 콘서트 aeXIS LINE. 팬클럽 'MY' 멤버십(GL) 선예매.",
    posterImageUrl: "/artists/3/events/poster.jpg",
    detailInfoImageUrl: "/artists/3/events/detail-info.jpg",
    venueName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 1,
    openDate: "2025-08-29", endDate: "2025-08-31", active: false,
    category: "concert", tags: ["단독판매", "인증예매"],
    runtime: "공연 시간 미정", ageRating: "미취학아동 입장 불가",
    castInfo: "aespa (카리나, 지젤, 윈터, 닝닝)",
    notices: [
      "팬클럽 선예매: aespa 공식 팬클럽 'MY' 멤버십(GL) 회원에 한하여 가능합니다.",
      "팬클럽 선예매 인증 기간: 2025년 6월 10일(화) 3:00PM ~ 2025년 6월 26일(목) 11:59PM (KST)",
      "팬클럽 선예매 기간: 2025년 6월 26일(목) 8:00PM ~ 11:59PM (KST)",
      "일반예매 기간: 2025년 6월 27일(금) 8:00PM (KST)~",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "멜론티켓 예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄 배송 (8월 7일부터 순차 배송)"],
    sections: [
      { name: "aeXIS석", price: 198000, totalSeats: 2000 },
      { name: "일반석",   price: 154000, totalSeats: 13000 },
    ],
    organizer: aespaOrganizer,
    shows: [{ id: "ae-d1", date: "2025-08-29T18:00:00+09:00", totalSeats: 15000, remainingSeats: 0 }],
  },
  {
    eventId: 5, artistId: 5, artistName: "LUCY",
    title: "2026 LUCY 9TH CONCERT 〈ISLAND〉", subtitle: "ISLAND",
    description: "LUCY 9번째 단독 콘서트 ISLAND. 두 번의 공연으로 만나는 LUCY의 감성.",
    posterImageUrl: "/artists/5/events/poster.gif",
    detailInfoImageUrl: "/artists/5/events/detail-info.jpg",
    venueName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 1,
    openDate: "2026-05-16", endDate: "2026-05-17", active: true,
    category: "concert", tags: [],
    runtime: "130분", ageRating: "8세 이상 관람가능",
    castInfo: "LUCY (완, 상엽, 현철, 광선)",
    notices: [
      "일괄배송: 4월 22일(수) ~ 4월 27일(월), 4일간",
      "일괄 배송은 2026년 4월 15일(수) 09:59AM(KST)까지 예매 완료된 건부터 순차적으로 배송됩니다.",
      "본 공연은 안심예매 서비스를 적용합니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.04.22~27)"],
    sections: [
      { name: "스탠딩석", price: 154000, totalSeats: 5000 },
      { name: "지정석R",  price: 154000, totalSeats: 5000 },
      { name: "지정석S",  price: 143000, totalSeats: 5000 },
    ],
    organizer: lucyOrganizer,
    shows: [],
    presaleShowId: 501, presaleSaleOpenAt: "2026-04-15T19:00:00+09:00",
  },
  {
    eventId: 8, artistId: 6, artistName: "DAY6",
    title: "DAY6 10th Anniversary Tour 〈The DECADE〉 in BUSAN", subtitle: "The DECADE",
    description: "DAY6 데뷔 10주년 기념 전국 투어 부산 공연.",
    posterImageUrl: "/artists/6/events/poster.gif",
    detailInfoImageUrl: "/artists/6/events/detail-info.jpg",
    venueName: "벡스코 제1전시장 1~2홀", venueAddress: "부산광역시 해운대구 APEC로 55",
    venueTemplateId: 6,
    openDate: "2026-05-16", endDate: "2026-05-17", active: true,
    category: "concert", tags: ["콘서트", "10주년"],
    runtime: "120분", ageRating: "만 7세 이상",
    castInfo: "DAY6 (Young K, Wonpil, Dowoon, Sungjin, Jae)",
    notices: [
      "My Day 6기 선예매 인증: 2026년 4월 10일(금) 4PM ~ 2026년 4월 16일(목) 11:59PM (KST)",
      "부정예매가 의심되는 경우 현장에서 예매자 본인확인 및 부정 예매에 대한 추가 확인 절차가 진행될 수 있습니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [{ name: "지정석", price: 154000, totalSeats: 10000 }],
    organizer: { host: "JYP Entertainment", manager: "JYP 공연사업팀", contact: "02-2600-6000", email: "concert@jype.com" },
    shows: [],
  },
  {
    eventId: 9, artistId: 7, artistName: "KiiiKiii",
    title: "2026 KiiiKiii FAN CONCERT 〈KiiiKiii FesTiiival〉", subtitle: "KiiiKiii FesTiiival",
    description: "KiiiKiii 팬콘서트 서울 공연.",
    posterImageUrl: "/artists/7/events/poster.gif",
    detailInfoImageUrl: "/artists/7/events/detail-info.jpg",
    venueName: "블루스퀘어 우리WON뱅킹홀", venueAddress: "서울특별시 용산구 한남대로 347",
    venueTemplateId: 7,
    openDate: "2026-05-16", endDate: "2026-05-17", active: true,
    category: "fanmeeting", tags: ["팬콘서트"],
    runtime: "120분", ageRating: "7세 이상 관람가능",
    castInfo: "KiiiKiii",
    notices: [
      "팬클럽 인증 기간: 2026년 4월 13일(월) 오후 2시 ~ 16일(목) 오후 11시 59분까지",
      "팬클럽 선예매 기간: 2026년 4월 15일(수) 오후 7시 ~ 16일(목) 오후 11시 59분까지",
      "일반예매: 2026년 4월 17일(금) 오후 7시",
      "매수제한: 회차별 1인 2매 (선예매 회차별 1인 1매 포함)",
    ],
    identityVerification: [
      "부정 예매 방지를 위해 본인 인증이 완료된 계정에 한하여 예매 가능합니다.",
      "NOL 계정 관리 > 본인 인증 페이지에서 반드시 본인 인증을 완료해 주시기 바랍니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.04.20~21)"],
    sections: [{ name: "전석", price: 121000, totalSeats: 2000 }],
    organizer: { host: "IST Entertainment", manager: "IST 공연사업팀", contact: "02-1234-5678", email: "concert@ist.com" },
    shows: [],
  },
  {
    eventId: 10, artistId: 0, artistName: "Weverse Con Festival",
    title: "2026 Weverse Con Festival", subtitle: "CON TICKET, CON TICKET＋",
    description: "2026 위버스콘 페스티벌. CON TICKET(지정석)과 CON TICKET＋(스탠딩) 두 종류로 구성된 콘서트 패키지.",
    posterImageUrl: "/events/1/poster.gif",
    detailInfoImageUrl: "/events/1/detail-info.jpg",
    venueName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 1,
    openDate: "2026-06-06", endDate: "2026-06-07", active: true,
    category: "festival", tags: ["단독판매", "얼굴패스", "안심예매"],
    runtime: "공연 시간 미정", ageRating: "만 9세 이상",
    castInfo: "",
    notices: [
      "2026 위버스콘 페스티벌 홈페이지에서 상세 안내 확인 바랍니다.",
      "티켓은 총 5종이며, 각 상품별로 적용 장소 및 관람 가능시간이 다릅니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "CON TICKET＋ (스탠딩)", price: 165000, totalSeats: 5000 },
      { name: "CON TICKET (지정석)",   price: 154000, totalSeats: 10000 },
    ],
    organizer: { host: "Weverse Con Festival", manager: "공연사업팀", contact: "1544-1555", email: "help@weverse.io" },
    shows: [],
    presaleShowId: 1001, presaleSaleOpenAt: "2026-05-10T20:00:00+09:00",
  },
  {
    eventId: 11, artistId: 0, artistName: "서울파크뮤직페스티벌",
    title: "2026 서울파크뮤직페스티벌", subtitle: "26SPMF",
    description: "2026 서울파크뮤직페스티벌. 올림픽공원 88잔디마당에서 열리는 대규모 야외 음악 페스티벌.",
    posterImageUrl: "/events/2/poster.gif",
    detailInfoImageUrl: "/events/2/detail-info.jpg",
    venueName: "올림픽공원 88잔디마당", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 8,
    openDate: "2026-06-20", endDate: "2026-06-21", active: true,
    category: "festival", tags: ["단독판매", "청년문화패스"],
    runtime: "540분", ageRating: "전체관람가",
    castInfo: "",
    notices: [
      "토요일: 14:00~22:30 / 일요일: 14:00~21:30",
      "우천 시에도 공연은 진행되며 필요 시 우비를 배포합니다.",
      "출연 아티스트와 공연 시간은 부득이한 사정으로 변경될 수 있습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자 본인 외 대리 수령 불가.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["현장 수령 (손목밴드)"],
    sections: [{ name: "오피셜 티켓", price: 119000, totalSeats: 20000 }],
    organizer: { host: "서울파크뮤직페스티벌", manager: "공연사업팀", contact: "1544-1555", email: "help@spmf.kr" },
    shows: [],
  },
  {
    eventId: 12, artistId: 0, artistName: "Official HIGE DANDism",
    title: "오피셜히게단디즘 아시아 투어 2026 in SEOUL", subtitle: "OFFICIAL HIGE DANDISM ASIA TOUR 2026",
    description: "일본 밴드 오피셜히게단디즘의 아시아 투어 서울 공연.",
    posterImageUrl: "/events/3/poster.gif",
    detailInfoImageUrl: "/events/3/detail-info.jpg",
    venueName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 1,
    openDate: "2026-08-08", endDate: "2026-08-09", active: true,
    category: "domestic", tags: ["단독판매", "안심예매"],
    runtime: "공연 시간 미정", ageRating: "만 12세 이상",
    castInfo: "Official HIGE DANDism",
    notices: [
      "본 공연은 아이디당 1인 2매까지 구매 가능하며, 해당 예매 매수 제한은 공연 회차당이 아닙니다.",
      "본 공연은 예매대기 서비스를 진행하지 않습니다.",
      "일괄 배송: 2026년 07월 20일~23일 (4일간)",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
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
    shows: [],
    presaleShowId: 1201, presaleSaleOpenAt: "2026-05-17T20:00:00+09:00",
  },
  {
    eventId: 13, artistId: 1, artistName: "IU",
    title: "2025 IU FAN MEET-UP [Bye, Summer]", subtitle: "Bye, Summer",
    description: "아이유의 여름 마지막을 함께하는 특별한 팬미팅. 두근두근 설레는 순간들이 가득한 행복한 시간.",
    posterImageUrl: "/artists/1/events/poster.jpg",
    detailInfoImageUrl: "/artists/1/events/detail-info.png",
    venueName: "KSPO DOME (올림픽 체조 경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 1,
    openDate: "2025-09-13", endDate: "2025-09-14", active: false,
    category: "fanmeeting", tags: ["단독판매", "인증예매"],
    runtime: "120분", ageRating: "전체 관람가",
    castInfo: "IU (아이유)",
    notices: [
      "본 공연은 단독판매 · 인증예매 상품입니다.",
      "선예매: 2025년 8월 11일(월) 오후 8시 ~ 오후 11시 59분 (KST)",
      "일반예매: 2025년 8월 13일(수) 오후 8시 (KST)",
      "매수제한: 회원별 1인 1매 (아이디가 여러 개인 경우 본인인증 받은 모든 아이디 합산 적용)",
    ],
    identityVerification: [
      "본인인증 예매 상품으로 예매 시 본인인증이 필요합니다.",
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    cancellationPolicy: iuCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "VIP석", price: 88000, totalSeats: 500 },
      { name: "R석",   price: 77000, totalSeats: 2000 },
      { name: "S석",   price: 66000, totalSeats: 3000 },
      { name: "A석",   price: 55000, totalSeats: 2500 },
    ],
    organizer: iuOrganizer,
    shows: [{ id: "iu-past", date: "2025-09-13T18:00:00+09:00", totalSeats: 15000, remainingSeats: 0 }],
  },
  {
    eventId: 14, artistId: 0, artistName: "",
    title: "뮤지컬 〈킹키부츠〉 - 부산", subtitle: "KINKY BOOTS",
    description: "브로드웨이 토니상 수상작 뮤지컬 킹키부츠 부산 공연.",
    posterImageUrl: "/events/4/poster.gif",
    detailInfoImageUrl: "/events/4/detail-info.jpg",
    venueName: "부산 드림씨어터", venueAddress: "부산광역시 수영구 민락동 192-2",
    venueTemplateId: 9,
    openDate: "2026-04-25", endDate: "2026-05-03", active: true,
    category: "musical", tags: ["좌석우위", "예매대기", "청년문화패스"],
    runtime: "155분 (인터미션 20분 포함)", ageRating: "8세 이상 관람가능",
    castInfo: "찰리(김호영/이재환/신재범), 롤라(강홍석/백형훈/서경수), 로렌(한재아/허윤슬), 돈(신승환/심재현/김동현)",
    notices: [
      "4.25(토) ~ 26(일) 2시, 7시 / 5.1(금) 7시 / 5.2(토) 2시, 7시 / 5.3(일) 2시",
      "*4.27(월)~4.30(목) 공연없음",
      "일괄배송: 2026년 4월 1일(수) ~ 3일(금)",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["일괄배송 (2026.04.01~03)"],
    sections: [
      { name: "VIP석", price: 170000, totalSeats: 300 },
      { name: "R석",   price: 140000, totalSeats: 500 },
      { name: "S석",   price: 110000, totalSeats: 800 },
      { name: "A석",   price: 80000,  totalSeats: 400 },
    ],
    organizer: defaultOrganizer,
    shows: [],
  },
  {
    eventId: 15, artistId: 0, artistName: "",
    title: "민트페스타 vol.83", subtitle: "MINT FESTA vol.83",
    description: "KT&G 상상마당 홍대 라이브홀에서 만나는 민트페스타 vol.83.",
    posterImageUrl: "/events/5/poster.gif",
    detailInfoImageUrl: "/events/5/detail-info.jpg",
    venueName: "KT&G 상상마당 홍대 라이브홀", venueAddress: "서울특별시 마포구 어울마당로 65",
    venueTemplateId: 10,
    openDate: "2026-06-07", endDate: "2026-06-07", active: true,
    category: "concert", tags: ["단독판매", "안심예매", "예매대기", "청년문화패스"],
    runtime: "150분", ageRating: "만 7세 이상",
    castInfo: "",
    notices: [
      "2026년 6월 7일(일) 5PM",
      "본 공연은 안심예매 서비스가 적용됩니다.",
      "전석 스탠딩 공연으로 빠른 번호를 예매하실수록 먼저 입장하실 수 있습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["일괄배송 (2026.05.14~15)", "현장 수령"],
    sections: [{ name: "스탠딩", price: 66000, totalSeats: 500 }],
    organizer: defaultOrganizer,
    shows: [],
  },
  {
    eventId: 16, artistId: 0, artistName: "",
    title: "뮤지컬 〈김종욱 찾기〉", subtitle: "FINDING MR. KIM",
    description: "뮤지컬 주간 41위, 평점 9.9. 대학로 틴틴홀 장기 롱런 뮤지컬.",
    posterImageUrl: "/events/6/poster.gif",
    detailInfoImageUrl: "/events/6/detail-info.jpg",
    venueName: "대학로 틴틴홀", venueAddress: "서울특별시 종로구 대학로12길 31",
    venueTemplateId: 11,
    openDate: "2026-03-07", endDate: "2026-05-31", active: true,
    category: "musical", tags: [],
    runtime: "100분", ageRating: "만 7세 이상",
    castInfo: "그남자(김도휘/김도현/염승윤) 등",
    notices: [
      "평일: 2시, 5시, 8시 / 주말 및 공휴일: 1시, 3시 10분, 5시 30분, 7시 40분",
      "*5/20(수)는 8시 1회만 진행됩니다.",
      "공연 당일에는 취소·변경·환불이 불가합니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["현장 수령"],
    sections: [{ name: "전석", price: 50000, totalSeats: 200 }],
    organizer: { host: "주식회사 네오", manager: "공연사업팀", contact: "1544-1555", email: "concert@neo.kr" },
    shows: [],
  },
  {
    eventId: 17, artistId: 0, artistName: "",
    title: "아라리오뮤지엄 인 스페이스", subtitle: "ARARIO MUSEUM IN SPACE",
    description: "서울 종로구에 위치한 아라리오뮤지엄 인 스페이스 상설 전시.",
    posterImageUrl: "/events/7/poster.gif",
    detailInfoImageUrl: "/events/7/detail-info.jpg",
    venueName: "아라리오뮤지엄 인 스페이스", venueAddress: "서울특별시 종로구 율곡로 83",
    venueTemplateId: 12,
    openDate: "2026-01-01", endDate: "2026-12-31", active: true,
    category: "etc", tags: ["청년문화패스"],
    runtime: "90분", ageRating: "만 11세 이상",
    castInfo: "",
    notices: [
      "운영시간: 화~일 10:00~19:00 (입장마감 18:00) / 매주 월요일 정규 휴관",
      "예매 마감시간 — 화~토요일(공휴일 포함): 전일 17시 / 일요일: 전일 11시",
      "당일 예매 변경 및 취소는 불가합니다.",
    ],
    identityVerification: [],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["현장 수령"],
    sections: [
      { name: "입장권 - 성인",     price: 15000, totalSeats: 100 },
      { name: "입장권 - 청소년",   price: 9000,  totalSeats: 100 },
      { name: "입장권 - 초등학생", price: 6000,  totalSeats: 100 },
    ],
    organizer: { host: "아라리오뮤지엄", manager: "운영팀", contact: "02-736-5700", email: "info@arariomuseum.or.kr" },
    shows: [],
  },
  {
    eventId: 18, artistId: 0, artistName: "PEAK FESTIVAL",
    title: "PEAK FESTIVAL 2026", subtitle: "PEAK FESTIVAL",
    description: "난지한강공원에서 펼쳐지는 대규모 야외 음악 페스티벌.",
    posterImageUrl: "/events/8/poster.gif",
    detailInfoImageUrl: "/events/8/detail-info.jpg",
    venueName: "난지한강공원", venueAddress: "서울특별시 마포구 하늘공원로 95",
    venueTemplateId: 13,
    openDate: "2026-05-23", endDate: "2026-05-24", active: true,
    category: "festival", tags: ["청년문화패스"],
    runtime: "540분", ageRating: "전체관람가",
    castInfo: "스파이에어, 쏜애플, 이디오테잎, 솔루션스, 초록불꽃소년단, 정우, 넬 (5/23) / 자우림, 10cm, 로맨틱펀치, 바이바이배드맨, 리도어, 윤마치, 원위, 나상현씨밴드, 신인류, FT아일랜드 (5/24)",
    notices: [
      "2026년 05월 23일(토) 12:00~ / 2026년 05월 24일(일) 12:00~",
      "일반 티켓: 2026년 3월 4일(수) 오후 6시부터 예매 가능",
      "일일권과 양일권 모두 구매 가능하며, 권종별 할당 수량 소진 시 조기 마감될 수 있습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["일괄배송 (2026.04.29~30)"],
    sections: [
      { name: "양일권",     price: 149000, totalSeats: 10000 },
      { name: "일일권(토)", price: 110000, totalSeats: 6000 },
      { name: "일일권(일)", price: 110000, totalSeats: 6000 },
    ],
    organizer: defaultOrganizer,
    shows: [],
  },
  {
    eventId: 19, artistId: 8, artistName: "RIIZE",
    title: "RIIZE 1000 DAYS FAN PARTY [RIIZE OFFIICE]", subtitle: "RIIZE OFFIICE",
    description: "RIIZE 1000일 기념 팬파티. 두 회차로 만나는 특별한 팬과의 만남.",
    posterImageUrl: "/artists/8/events/poster.jpg",
    detailInfoImageUrl: "/artists/8/events/detail-info.jpg",
    venueName: "송도컨벤시아", venueAddress: "인천광역시 연수구 컨벤시아대로 204",
    venueTemplateId: 14,
    openDate: "2026-05-30", endDate: "2026-05-30", active: true,
    category: "fanmeeting", tags: ["단독판매", "인증예매"],
    runtime: "공연 시간 미정", ageRating: "만 7세 이상",
    castInfo: "RIIZE (숏호민, 원빈, 성찬, 승한, 은석, 소희, 조이)",
    notices: [
      "팬클럽 사전 인증 기간: 2026년 4월 21일(화) 6PM ~ 4월 27일(월) 11:59PM (KST)",
      "팬클럽 선예매 기간: 2026년 4월 27일(월) 8PM ~ 11:59PM (KST)",
      "일반예매 기간: 2026년 4월 28일(화) 8PM (KST)~",
      "매수제한: 회당 1인 1매 (팬클럽 선예매 매수 포함)",
      "티켓 일괄 배송일: 2026년 5월 12일(화)부터 순차 배송",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.05.12~)"],
    sections: [{ name: "팬파티석", price: 55000, totalSeats: 3000 }],
    organizer: { host: "SM Entertainment", manager: "SM 공연사업팀", contact: "02-6240-9600", email: "concert@smtown.com" },
    shows: [
      { id: "riize-d1", date: "2026-05-30T13:00:00+09:00", totalSeats: 1500, remainingSeats: 320 },
      { id: "riize-d2", date: "2026-05-30T18:00:00+09:00", totalSeats: 1500, remainingSeats: 180 },
    ],
  },
  {
    eventId: 20, artistId: 9, artistName: "이영지",
    title: "2026 LEE YOUNGJI WORLD TOUR 〈2.0〉 IN SEOUL", subtitle: "2.0",
    description: "이영지 월드투어 서울 공연. 올림픽공원 올림픽홀에서 만나는 뜨거운 무대.",
    posterImageUrl: "/artists/9/events/poster.gif",
    detailInfoImageUrl: "/artists/9/events/detail-info.jpg",
    venueName: "올림픽공원 올림픽홀", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 15,
    openDate: "2026-03-07", endDate: "2026-03-08", active: false,
    category: "concert", tags: ["단독판매"],
    runtime: "120분", ageRating: "만 7세 이상",
    castInfo: "이영지",
    notices: [
      "본 공연은 회차당 1인 2매까지 예매 가능합니다.",
      "2026년 3월 7일(토) 6PM (KST) / 2026년 3월 8일(일) 5PM (KST)",
      "본 공연은 안심예매 서비스가 적용됩니다.",
      "본 공연은 예매대기 서비스 및 동일좌석 재예매 서비스 이용이 제한됩니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.02.12~13)"],
    sections: [
      { name: "스탠딩 R", price: 110000, totalSeats: 2000 },
      { name: "스탠딩 S", price: 99000,  totalSeats: 2000 },
      { name: "지정석",   price: 110000, totalSeats: 2000 },
    ],
    organizer: { host: "아메바컬쳐", manager: "공연사업팀", contact: "02-1234-5678", email: "concert@amoeba.kr" },
    shows: [{ id: "youngji-d1", date: "2026-03-07T18:00:00+09:00", totalSeats: 6000, remainingSeats: 0 }],
  },
  {
    eventId: 21, artistId: 10, artistName: "최예나",
    title: "2026 YENA LIVE TOUR ［잡힐 듯 말 듯 한, 2세계!］ In Seoul", subtitle: "잡힐 듯 말 듯 한, 2세계!",
    description: "최예나 단독 라이브 투어 서울 공연. 블루스퀘어 우리WON뱅킹홀에서 두 회차로 진행.",
    posterImageUrl: "/artists/10/events/poster.gif",
    detailInfoImageUrl: "/artists/10/events/detail-info.jpg",
    venueName: "블루스퀘어 우리WON뱅킹홀", venueAddress: "서울특별시 용산구 한남대로 347",
    venueTemplateId: 7,
    openDate: "2026-04-04", endDate: "2026-04-05", active: false,
    category: "concert", tags: ["단독판매"],
    runtime: "120분", ageRating: "8세 이상 관람가능",
    castInfo: "최예나 (YENA)",
    notices: [
      "1회차: 2026년 4월 4일(토) 오후 6시 / 2회차: 2026년 4월 5일(일) 오후 4시",
      "본 공연은 안심예매 서비스를 적용합니다.",
      "본 공연은 예매대기서비스와 동일좌석 재예매서비스 이용이 제한됩니다.",
      "일괄배송일: 3월 16일(월) ~ 18일(수), 3일간",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.03.16~18)"],
    sections: [{ name: "전석", price: 88000, totalSeats: 2000 }],
    organizer: { host: "IST Entertainment", manager: "IST 공연사업팀", contact: "02-1234-5678", email: "concert@ist.com" },
    shows: [{ id: "yena-d1", date: "2026-04-04T18:00:00+09:00", totalSeats: 2000, remainingSeats: 0 }],
  },
  {
    eventId: 22, artistId: 11, artistName: "ILLIT",
    title: "ILLIT LIVE 'PRESS START♥' in SEOUL", subtitle: "PRESS START♥",
    description: "ILLIT 단독 라이브 서울 공연. 티켓링크 라이브 아레나에서 만나는 첫 번째 단독 공연.",
    posterImageUrl: "/artists/11/events/poster.gif",
    detailInfoImageUrl: "/artists/11/events/detail-info.jpg",
    venueName: "티켓링크 라이브 아레나", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 16,
    openDate: "2026-03-14", endDate: "2026-03-15", active: false,
    category: "concert", tags: ["단독판매", "얼굴패스"],
    runtime: "공연 시간 미정", ageRating: "만 9세 이상",
    castInfo: "ILLIT (모카, 민주, 릴리, 원희, 이로하)",
    notices: [
      "2026년 3월 14일(토) 6PM / 2026년 3월 15일(일) 5PM",
      "본 공연은 얼굴패스가 적용된 상품입니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
      "공연당일 현장판매는 진행되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "얼굴패스와 IN-PASS를 통해 현장 본인 확인이 진행됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "스탠딩 R", price: 132000, totalSeats: 2000 },
      { name: "스탠딩 S", price: 121000, totalSeats: 2000 },
      { name: "지정석",   price: 121000, totalSeats: 2000 },
    ],
    organizer: { host: "HYBE Labels", manager: "공연사업팀", contact: "1544-1555", email: "concert@hybe.com" },
    shows: [{ id: "illit-d1", date: "2026-03-14T18:00:00+09:00", totalSeats: 6000, remainingSeats: 0 }],
  },
  {
    eventId: 23, artistId: 12, artistName: "LE SSERAFIM",
    title: "LE SSERAFIM TOUR 'EASY CRAZY HOT' ENCORE IN SEOUL", subtitle: "EASY CRAZY HOT ENCORE",
    description: "LE SSERAFIM 투어 앙코르 서울 공연. 잠실실내체육관에서 열리는 뜨거운 피날레.",
    posterImageUrl: "/artists/12/events/poster.gif",
    detailInfoImageUrl: "/artists/12/events/detail-info.jpg",
    venueName: "잠실실내체육관", venueAddress: "서울특별시 송파구 올림픽로 25",
    venueTemplateId: 17,
    openDate: "2026-01-31", endDate: "2026-02-01", active: false,
    category: "concert", tags: ["단독판매", "얼굴패스"],
    runtime: "공연 시간 미정", ageRating: "만 9세 이상",
    castInfo: "LE SSERAFIM (사쿠라, 김채원, 허윤진, 카즈하, 홍은채)",
    notices: [
      "2026년 1월 31일(토) 6PM / 2026년 2월 1일(일) 5PM",
      "본 공연은 얼굴패스가 적용된 상품입니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
      "공연당일 현장판매는 진행되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [
      { name: "스탠딩 R", price: 154000, totalSeats: 2000 },
      { name: "스탠딩 S", price: 143000, totalSeats: 2000 },
      { name: "지정석 R", price: 154000, totalSeats: 2000 },
      { name: "지정석 S", price: 143000, totalSeats: 2000 },
    ],
    organizer: { host: "Source Music / HYBE", manager: "공연사업팀", contact: "1544-1555", email: "concert@hybe.com" },
    shows: [{ id: "lsf-d1", date: "2026-01-31T18:00:00+09:00", totalSeats: 8000, remainingSeats: 0 }],
  },
  {
    eventId: 24, artistId: 13, artistName: "TWS",
    title: "2026 TWS 2ND FANMEETING 〈42:CLUB〉 IN SEOUL", subtitle: "42:CLUB",
    description: "TWS 2번째 팬미팅 서울 공연. 총 3회차로 만나는 특별한 팬과의 시간.",
    posterImageUrl: "/artists/13/events/poster.gif",
    detailInfoImageUrl: "/artists/13/events/detail-info.jpg",
    venueName: "티켓링크 라이브 아레나 (올림픽공원 핸드볼경기장)", venueAddress: "서울특별시 송파구 올림픽로 424",
    venueTemplateId: 16,
    openDate: "2026-03-27", endDate: "2026-03-29", active: false,
    category: "fanmeeting", tags: ["단독판매", "얼굴패스"],
    runtime: "공연 시간 미정", ageRating: "만 9세 이상",
    castInfo: "TWS (희승, 도요, 태양, 하루토, 지훈, 규빈)",
    notices: [
      "2026년 3월 27일(금) 7PM / 28일(토) 6PM / 29일(일) 5PM",
      "본 공연은 얼굴패스가 적용된 상품입니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
      "공연당일 현장판매는 진행되지 않습니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [{ name: "전석", price: 110000, totalSeats: 3000 }],
    organizer: { host: "PLEDIS Entertainment / HYBE", manager: "공연사업팀", contact: "1544-1555", email: "concert@pledis.co.kr" },
    shows: [{ id: "tws-d1", date: "2026-03-27T19:00:00+09:00", totalSeats: 3000, remainingSeats: 0 }],
  },
  {
    eventId: 25, artistId: 14, artistName: "Stray Kids",
    title: "Stray Kids 6TH FANMEETING 'STAY in Our Little House'", subtitle: "STAY in Our Little House",
    description: "Stray Kids 6번째 팬미팅. INSPIRE ARENA에서 4회차로 만나는 팬과의 특별한 공간.",
    posterImageUrl: "/artists/14/events/poster.gif",
    detailInfoImageUrl: "/artists/14/events/detail-info.jpg",
    venueName: "INSPIRE ARENA", venueAddress: "인천광역시 중구 영종해안남로 321번길 186",
    venueTemplateId: 18,
    openDate: "2026-03-28", endDate: "2026-04-05", active: false,
    category: "fanmeeting", tags: ["단독판매"],
    runtime: "공연 시간 미정", ageRating: "만 7세 이상",
    castInfo: "Stray Kids (방찬, 리노, 창빈, 현진, 한, 필릭스, 승민, I.N)",
    notices: [
      "2026년 3월 28일(토) 6PM / 29일(일) 5PM / 4월 4일(토) 6PM / 5일(일) 5PM",
      "원활한 예매 진행을 위해 티켓 구매 시 무통장 입금 결제는 제한됩니다.",
      "본 공연은 모바일티켓 서비스로만 이용 가능하며, 실물티켓이 제공되지 않습니다.",
      "본 공연은 예매대기서비스와 동일좌석 재예매서비스 이용이 제한됩니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "NOL 티켓 예매자와 실 관람자(신분증 지참) 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)"],
    sections: [{ name: "전석", price: 110000, totalSeats: 5000 }],
    organizer: { host: "JYP Entertainment", manager: "JYP 공연사업팀", contact: "02-2600-6000", email: "concert@jype.com" },
    shows: [{ id: "skz-d1", date: "2026-03-28T18:00:00+09:00", totalSeats: 5000, remainingSeats: 0 }],
  },
  {
    eventId: 26, artistId: 0, artistName: "Charlie Puth",
    title: "Charlie Puth - Whatever's Clever! World Tour in Seoul", subtitle: "Whatever's Clever!",
    description: "찰리 푸스 내한공연. 고양종합운동장 주경기장에서 만나는 글로벌 팝스타의 단독 공연.",
    posterImageUrl: "/events/9/poster.gif",
    detailInfoImageUrl: "/events/9/detail-info.jpg",
    venueName: "고양종합운동장 주경기장", venueAddress: "경기도 고양시 일산서구 대화동 2100",
    venueTemplateId: 19,
    openDate: "2026-10-11", endDate: "2026-10-11", active: true,
    category: "domestic", tags: ["단독판매", "안심예매", "예매대기"],
    runtime: "공연 시간 미정", ageRating: "만 12세 이상",
    castInfo: "Charlie Puth",
    notices: [
      "공연 일시: 2026년 10월 11일(일) 오후 7시",
      "일괄 배송: 2026년 09월 16일(수) ~ 18일(금), 3일간",
      "2026년 04월 27일 00시 00분~10월 11일 23시 59분까지 무통장입금 결제가 불가능합니다.",
      "휠체어석 구매는 2026년 4월 29일(수) 오후 12시부터 NOL 티켓 고객센터(1544-1555)를 통한 전화예매만 가능합니다.",
    ],
    identityVerification: [
      "예매자 본인 신분증 지참 필수 (주민등록증, 운전면허증, 여권 등)",
      "예매자와 실 관람자 정보가 모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.",
    ],
    cancellationPolicy: defaultCancellationPolicy,
    ticketDelivery: ["모바일 티켓 (앱 내 QR코드)", "일괄배송 (2026.09.16~18)"],
    sections: [
      { name: "PROFESSOR PUTH VIP EXPERIENCE", price: 785000, totalSeats: 200 },
      { name: "WHATEVER'S CLEVER! EXPERIENCE", price: 536000, totalSeats: 300 },
      { name: "WHATEVER'S CLEVER! MERCH PACKAGE", price: 353000, totalSeats: 500 },
      { name: "지정석 P석", price: 250000, totalSeats: 1000 },
      { name: "지정석 R석", price: 220000, totalSeats: 5000 },
      { name: "스탠딩석",   price: 154000, totalSeats: 5000 },
      { name: "지정석 S석", price: 187000, totalSeats: 3000 },
      { name: "지정석 A석", price: 169000, totalSeats: 3000 },
      { name: "지정석 B석", price: 158000, totalSeats: 3000 },
      { name: "지정석 C석", price: 143000, totalSeats: 3000 },
      { name: "지정석 D석", price: 110000, totalSeats: 2000 },
      { name: "지정석 E석", price: 99000,  totalSeats: 2000 },
    ],
    organizer: { host: "URR Entertainment", manager: "공연사업팀", contact: "1544-1555", email: "concert@urr.kr" },
    shows: [{ id: "cputh-d1", date: "2026-10-11T19:00:00+09:00", totalSeats: 28000, remainingSeats: 8500 }],
    presaleShowId: 2601, presaleSaleOpenAt: "2026-09-01T20:00:00+09:00",
  },
];

export function findMockEvent(eventId: number | string): MockEvent | undefined {
  return mockEvents.find((e) => e.eventId === Number(eventId));
}
