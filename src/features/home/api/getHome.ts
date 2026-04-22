import { delay } from "@/shared/lib/mockDelay";
import { mockArtists } from "@/shared/lib/mocks/artists";

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
  { rank: 1, eventId: 2, eventTitle: "BTS YET TO COME ENCORE IN SEOUL", artistId: 2, artistName: "BTS", posterImageUrl: "/artists/2/events/event_bts-yet-to-come-in-cinema.png", openDate: "2026-08-01", endDate: "2026-08-03" },
  { rank: 2, eventId: 7, eventTitle: "BLACKPINK BORN PINK WORLD TOUR SEOUL", artistId: 5, artistName: "BLACKPINK", posterImageUrl: "/artists/5/events/event_blackpink-born-pink.png", openDate: "2026-07-15", endDate: "2026-07-16" },
  { rank: 3, eventId: 1, eventTitle: "G-Dragon 2026 DOME TOUR", artistId: 1, artistName: "G-Dragon", posterImageUrl: "/artists/1/events/upcoming_gdragon-2026-mama.png", openDate: "2026-06-01", endDate: "2026-06-02" },
  { rank: 4, eventId: 5, eventTitle: "IVE WORLD TOUR SHOW WHAT I AM", artistId: 4, artistName: "IVE", posterImageUrl: "/artists/4/events/event_ive-show-what-i-am.png", openDate: "2026-06-20", endDate: "2026-06-22" },
  { rank: 5, eventId: 4, eventTitle: "aespa LIVE SYNK : PARALLEL", artistId: 3, artistName: "aespa", posterImageUrl: "/artists/3/events/event_aespa-live-synk-parallel.png", openDate: "2026-09-20", endDate: "2026-09-21" },
];

const mockTrending: HomeTrendingEvent[] = [
  { eventId: 2, eventTitle: "BTS YET TO COME ENCORE IN SEOUL", artistId: 2, artistName: "BTS", posterImageUrl: "/artists/2/events/event_bts-yet-to-come-in-cinema.png", venueAddress: "잠실종합운동장 주경기장", openDate: "2026-08-01", endDate: "2026-08-03" },
  { eventId: 7, eventTitle: "BLACKPINK BORN PINK WORLD TOUR SEOUL", artistId: 5, artistName: "BLACKPINK", posterImageUrl: "/artists/5/events/event_blackpink-born-pink.png", venueAddress: "고척스카이돔", openDate: "2026-07-15", endDate: "2026-07-16" },
  { eventId: 5, eventTitle: "IVE WORLD TOUR SHOW WHAT I AM", artistId: 4, artistName: "IVE", posterImageUrl: "/artists/4/events/event_ive-show-what-i-am.png", venueAddress: "KSPO DOME", openDate: "2026-06-20", endDate: "2026-06-22" },
  { eventId: 9, eventTitle: "SEVENTEEN WORLD TOUR BE THE SUN", artistId: 7, artistName: "SEVENTEEN", posterImageUrl: "/artists/7/events/event_seventeen-be-the-sun.png", venueAddress: "잠실종합운동장 주경기장", openDate: "2026-05-25", endDate: "2026-05-27" },
];

const mockPresale: HomePresaleEvent[] = [
  { showId: 101, eventId: 1, eventTitle: "G-Dragon 2026 DOME TOUR", artistId: 1, artistName: "G-Dragon", saleOpenAt: "2026-05-01T10:00:00+09:00", venueAddress: "KSPO DOME" },
  { showId: 201, eventId: 4, eventTitle: "aespa LIVE SYNK : PARALLEL", artistId: 3, artistName: "aespa", saleOpenAt: "2026-06-15T10:00:00+09:00", venueAddress: "KSPO DOME" },
];

export async function getHome(): Promise<HomeData> {
  await delay(400);
  return {
    popularEventRanking: mockRanking,
    popularArtists: mockArtists.slice(0, 8).map((a) => ({
      artistId: Number(a.id),
      artistName: a.name,
      profileImageUrl: a.avatar,
      followerCount: a.followerCount ?? 0,
      category: a.category ?? "etc",
    })),
    trendingEvents: mockTrending,
    presaleOpeningSoon: mockPresale,
    newArtists: mockArtists.slice(8, 14).map((a) => ({
      artistId: Number(a.id),
      artistName: a.name,
      profileImageUrl: a.avatar,
      followerCount: a.followerCount ?? 0,
      category: a.category ?? "etc",
    })),
  };
}
