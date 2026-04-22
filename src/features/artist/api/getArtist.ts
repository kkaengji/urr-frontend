import { delay } from "@/shared/lib/mockDelay";
import { mockArtists } from "@/shared/lib/mocks/artists";
import type { ArtistCategory } from "./getArtists";

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
  const artist = mockArtists.find((a) => String(a.id) === String(artistId));
  if (!artist) {
    const fallback = mockArtists[0];
    return {
      id: Number(artistId),
      name: fallback.name,
      profileImageUrl: fallback.avatar,
      description: fallback.bio ?? "",
      isFollowing: false,
      followerCount: fallback.followerCount,
      bio: fallback.bio,
      bannerImageUrl: fallback.banner,
      category: fallback.category as ArtistCategory,
    };
  }
  return {
    id: Number(artist.id),
    name: artist.name,
    profileImageUrl: artist.avatar,
    description: artist.bio ?? "",
    isFollowing: true,
    followerCount: artist.followerCount,
    bio: artist.bio,
    bannerImageUrl: artist.banner,
    category: artist.category as ArtistCategory,
  };
}
