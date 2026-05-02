import { delay } from "@/shared/lib/mockDelay";
import { findMockArtist, toArtistDetail } from "@/shared/lib/mocks/artists";
import type { ArtistCategory } from "./getArtists";

export interface ArtistExtendedInfo {
  artistId: string;
  debutDate: string;
  agency: string;
  genres: string[];
  memberCount?: number;
}

export interface ArtistDetail {
  id: number;
  name: string;
  profileImageUrl: string;
  description: string;
  isFollowing: boolean;
  followerCount?: number;
  bio?: string;
  bannerImageUrl?: string;
  category?: ArtistCategory;
}

export async function getArtist(
  artistId: string | number,
  _userId?: number,
): Promise<ArtistDetail> {
  await delay(300);
  const artist = findMockArtist(artistId);
  if (!artist) {
    return { id: Number(artistId), name: "", profileImageUrl: "", description: "", isFollowing: false };
  }
  return toArtistDetail(artist);
}
