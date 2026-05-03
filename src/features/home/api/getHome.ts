import { delay } from "@/shared/lib/mockDelay";
import { mockEvents } from "@/shared/lib/mocks/events";

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

const rankingEventIds = [2, 8, 5, 9, 10, 11, 18, 16];

const mockPopularArtists: HomePopularArtist[] = [
  { artistId: 2, artistName: "BTS",      profileImageUrl: "/artists/2/profile.jpg",  followerCount: 50_000_000, category: "boygroup" },
  { artistId: 4, artistName: "IVE",      profileImageUrl: "/artists/4/profile.jpg",  followerCount: 15_000_000, category: "girlgroup" },
  { artistId: 3, artistName: "aespa",    profileImageUrl: "/artists/3/profile.jpg",  followerCount: 12_000_000, category: "girlgroup" },
  { artistId: 1, artistName: "IU",       profileImageUrl: "/artists/1/profile.jpg",  followerCount: 7_800_000,  category: "solo" },
  { artistId: 6, artistName: "DAY6",     profileImageUrl: "/artists/6/profile.jpg",  followerCount: 5_000_000,  category: "boygroup" },
  { artistId: 5, artistName: "LUCY",     profileImageUrl: "/artists/5/profile.jpg",  followerCount: 800_000,    category: "boygroup" },
  { artistId: 7, artistName: "KiiiKiii", profileImageUrl: "/artists/7/profile.jpg",  followerCount: 800_000,    category: "girlgroup" },
];

const trendingEventIds = [2, 11, 5, 9, 1, 4, 8, 12, 13, 3];

export async function getHome(): Promise<HomeData> {
  await delay(400);

  const popularEventRanking: HomeRankingEvent[] = rankingEventIds
    .flatMap((id, i) => {
      const e = mockEvents.find((ev) => ev.eventId === id);
      if (!e) return [];
      return [{
        rank: i + 1,
        eventId: e.eventId,
        eventTitle: e.title,
        artistId: e.artistId,
        artistName: e.artistName,
        posterImageUrl: e.posterImageUrl,
        openDate: e.openDate,
        endDate: e.endDate,
      }];
    });

  const trendingEvents: HomeTrendingEvent[] = trendingEventIds
    .flatMap((id) => {
      const e = mockEvents.find((ev) => ev.eventId === id);
      if (!e) return [];
      return [{
        eventId: e.eventId,
        eventTitle: e.title,
        artistId: e.artistId,
        artistName: e.artistName,
        posterImageUrl: e.posterImageUrl,
        venueAddress: e.venueName,
        openDate: e.openDate,
        endDate: e.endDate,
      }];
    });

  const presaleOpeningSoon: HomePresaleEvent[] = mockEvents
    .filter((e) => e.presaleShowId !== undefined && e.presaleSaleOpenAt !== undefined)
    .map((e) => ({
      showId: e.presaleShowId!,
      eventId: e.eventId,
      eventTitle: e.title,
      artistId: e.artistId,
      artistName: e.artistName,
      saleOpenAt: e.presaleSaleOpenAt!,
      venueAddress: e.venueName,
    }));

  return {
    popularEventRanking,
    popularArtists: mockPopularArtists,
    trendingEvents,
    presaleOpeningSoon,
    newArtists: [],
  };
}
