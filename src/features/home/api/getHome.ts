import { delay } from "@/shared/lib/mockDelay";
import { mockEvents } from "@/shared/lib/mocks/events";
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

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export async function getHome(): Promise<HomeData> {
  await delay(400);

  const today = new Date().toISOString().split("T")[0];
  const activeEvents = mockEvents.filter(
    (e) => e.active && (!e.endDate || e.endDate >= today),
  );

  const shuffledForTrending = shuffle(activeEvents);
  const shuffledForRanking = shuffle(activeEvents);

  const trendingEvents: HomeTrendingEvent[] = shuffledForTrending.slice(0, 10).map((e) => ({
    eventId: e.eventId,
    eventTitle: e.title,
    artistId: e.artistId,
    artistName: e.artistName,
    posterImageUrl: e.posterImageUrl,
    venueAddress: e.venueName,
    openDate: e.openDate,
    endDate: e.endDate,
  }));

  const popularEventRanking: HomeRankingEvent[] = shuffledForRanking.slice(0, 8).map((e, i) => ({
    rank: i + 1,
    eventId: e.eventId,
    eventTitle: e.title,
    artistId: e.artistId,
    artistName: e.artistName,
    posterImageUrl: e.posterImageUrl,
    openDate: e.openDate,
    endDate: e.endDate,
  }));

  const popularArtists: HomePopularArtist[] = shuffle(mockArtists).slice(0, 10).map((a) => ({
    artistId: a.id,
    artistName: a.name,
    profileImageUrl: a.profileImageUrl,
    followerCount: a.followerCount ?? 0,
    category: a.category ?? "solo",
  }));

  const presaleOpeningSoon: HomePresaleEvent[] = activeEvents
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
    popularArtists,
    trendingEvents,
    presaleOpeningSoon,
    newArtists: [],
  };
}
