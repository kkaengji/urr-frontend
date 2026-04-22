import { delay } from "@/shared/lib/mockDelay";
import { mockArtists } from "@/shared/lib/mocks/artists";

export type ArtistCategory =
  | "boygroup"
  | "girlgroup"
  | "coedgroup"
  | "solo"
  | "band";

export const artistCategoryLabels: Record<ArtistCategory, string> = {
  boygroup: "보이그룹",
  girlgroup: "걸그룹",
  coedgroup: "혼성그룹",
  solo: "솔로",
  band: "밴드",
};

export function getArtistCategoryLabel(
  category: ArtistCategory | string,
): string {
  return artistCategoryLabels[category as ArtistCategory] ?? category;
}

export interface ArtistSummary {
  id: number;
  name: string;
  profileImageUrl: string;
  followerCount?: number;
  bio?: string;
  bannerImageUrl?: string;
  category?: ArtistCategory;
}

export async function getArtists(): Promise<ArtistSummary[]> {
  await delay(400);
  return mockArtists.map((a) => ({
    id: Number(a.id),
    name: a.name,
    profileImageUrl: a.avatar,
    followerCount: a.followerCount,
    bio: a.bio,
    bannerImageUrl: a.banner,
    category: a.category as ArtistCategory,
  }));
}
