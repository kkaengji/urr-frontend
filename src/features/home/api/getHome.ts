import { delay } from "@/shared/lib/mockDelay";

export interface HomePopularArtist {
  artistId: number;
  artistName: string;
  profileImageUrl: string | null;
  followerCount: number;
  category: string;
}

export interface HomeRankingEvent {
  rank: number;
  eventId: number;
  eventTitle: string;
  artistId: number;
  artistName: string;
  posterImageUrl: string | null;
  openDate: string;
  endDate: string | null;
}

export interface HomeTrendingEvent {
  eventId: number;
  eventTitle: string;
  artistId: number;
  artistName: string;
  posterImageUrl: string | null;
  venueAddress: string | null;
  openDate: string;
  endDate: string | null;
}

export interface HomePresaleEvent {
  showId: number;
  eventId: number;
  eventTitle: string;
  artistId: number;
  artistName: string;
  saleOpenAt: string;
  venueAddress: string | null;
}

export interface HomeData {
  popularEventRanking: HomeRankingEvent[];
  popularArtists: HomePopularArtist[];
  trendingEvents: HomeTrendingEvent[];
  presaleOpeningSoon: HomePresaleEvent[];
  newArtists: HomePopularArtist[];
}

const mockRanking: HomeRankingEvent[] = [
  { rank: 1, eventId: 2,  eventTitle: "BTS WORLD TOUR 'ARIRANG' IN BUSAN",        artistId: 2, artistName: "BTS",   posterImageUrl: "/artists/2/events/poster.gif", openDate: "2026-06-12", endDate: "2026-06-13" },
  { rank: 2, eventId: 13, eventTitle: "2025 IU FAN MEET-UP [Bye, Summer]",        artistId: 1, artistName: "IU",    posterImageUrl: "/artists/1/events/poster.jpg", openDate: "2025-09-13", endDate: "2025-09-14" },
  { rank: 3, eventId: 8,  eventTitle: "DAY6 10th Anniversary Tour 〈The DECADE〉", artistId: 6, artistName: "DAY6",  posterImageUrl: "/artists/6/events/poster.gif", openDate: "2026-05-16", endDate: "2026-05-17" },
  { rank: 4, eventId: 5,  eventTitle: "2026 LUCY 9TH CONCERT 〈ISLAND〉",          artistId: 5, artistName: "LUCY",  posterImageUrl: "/artists/5/events/poster.gif", openDate: "2026-05-16", endDate: "2026-05-17" },
  { rank: 5, eventId: 4,  eventTitle: "2025 aespa LIVE TOUR - SYNK : aeXIS LINE -", artistId: 3, artistName: "aespa", posterImageUrl: "/artists/3/events/poster.jpg", openDate: "2025-08-29", endDate: "2025-08-31" },
];

const mockTrending: HomeTrendingEvent[] = [
  { eventId: 2,  eventTitle: "BTS WORLD TOUR 'ARIRANG' IN BUSAN",        artistId: 2, artistName: "BTS",      posterImageUrl: "/artists/2/events/poster.gif", venueAddress: "부산아시아드 주경기장",          openDate: "2026-06-12", endDate: "2026-06-13" },
  { eventId: 13, eventTitle: "2025 IU FAN MEET-UP [Bye, Summer]",        artistId: 1, artistName: "IU",       posterImageUrl: "/artists/1/events/poster.jpg", venueAddress: "KSPO DOME (올림픽 체조 경기장)", openDate: "2025-09-13", endDate: "2025-09-14" },
  { eventId: 5,  eventTitle: "2026 LUCY 9TH CONCERT 〈ISLAND〉",          artistId: 5, artistName: "LUCY",     posterImageUrl: "/artists/5/events/poster.gif", venueAddress: "KSPO DOME (올림픽 체조 경기장)", openDate: "2026-05-16", endDate: "2026-05-17" },
  { eventId: 9,  eventTitle: "2026 KiiiKiii FAN CONCERT 〈KiiiKiii FesTiiival〉", artistId: 7, artistName: "KiiiKiii", posterImageUrl: "/artists/7/events/poster.gif", venueAddress: "블루스퀘어 우리WON뱅킹홀", openDate: "2026-05-16", endDate: "2026-05-17" },
];

const mockPopularArtists: HomePopularArtist[] = [
  { artistId: 2,  artistName: "BTS",      profileImageUrl: "/artists/2/profile.jpg",  followerCount: 50_000_000, category: "boygroup" },
  { artistId: 4,  artistName: "IVE",      profileImageUrl: "/artists/4/profile.jpg",  followerCount: 15_000_000, category: "girlgroup" },
  { artistId: 3,  artistName: "aespa",    profileImageUrl: "/artists/3/profile.jpg",  followerCount: 12_000_000, category: "girlgroup" },
  { artistId: 1,  artistName: "IU",       profileImageUrl: "/artists/1/profile.jpg",  followerCount: 7_800_000,  category: "solo" },
  { artistId: 6,  artistName: "DAY6",     profileImageUrl: "/artists/6/profile.jpg",  followerCount: 5_000_000,  category: "boygroup" },
  { artistId: 5,  artistName: "LUCY",     profileImageUrl: "/artists/5/profile.jpg",  followerCount: 800_000,    category: "boygroup" },
  { artistId: 7,  artistName: "KiiiKiii", profileImageUrl: "/artists/7/profile.jpg",  followerCount: 800_000,    category: "girlgroup" },
];

const mockPresale: HomePresaleEvent[] = [
  { showId: 1301, eventId: 13, eventTitle: "2025 IU FAN MEET-UP [Bye, Summer]", artistId: 1, artistName: "IU",    saleOpenAt: "2025-08-11T20:00:00+09:00", venueAddress: "KSPO DOME (올림픽 체조 경기장)" },
  { showId: 501,  eventId: 5,  eventTitle: "2026 LUCY 9TH CONCERT 〈ISLAND〉",   artistId: 5, artistName: "LUCY",  saleOpenAt: "2026-04-15T19:00:00+09:00", venueAddress: "KSPO DOME (올림픽 체조 경기장)" },
];

export async function getHome(): Promise<HomeData> {
  await delay(400);
  return {
    popularEventRanking: mockRanking,
    popularArtists: mockPopularArtists,
    trendingEvents: mockTrending,
    presaleOpeningSoon: mockPresale,
    newArtists: [],
  };
}
