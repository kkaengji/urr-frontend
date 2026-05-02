import type { ArtistCategory } from "@/features/artist/api/getArtists";
import type {
  ArtistDetail,
  ArtistExtendedInfo,
} from "@/features/artist/api/getArtist";

export interface MockArtist {
  id: number;
  name: string;
  profileImageUrl: string;
  bannerImageUrl?: string;
  bio?: string;
  followerCount?: number;
  category?: ArtistCategory;
  extendedInfo?: ArtistExtendedInfo;
}

export const mockArtists: MockArtist[] = [
  {
    id: 1,
    name: "IU",
    profileImageUrl: "/artists/1/profile.jpg",
    bannerImageUrl: "/artists/1/banner.jpeg",
    bio: "2008년 데뷔 후 꾸준한 사랑을 받고 있는 국민 솔로 아티스트. 음악, 연기, 예능을 넘나드는 만능 엔터테이너.",
    followerCount: 7_800_000,
    category: "solo",
    extendedInfo: {
      artistId: "1",
      debutDate: "2008.09.18",
      agency: "KAKAO Entertainment",
      genres: ["Ballad", "Pop", "K-POP"],
    },
  },
  {
    id: 2,
    name: "BTS",
    profileImageUrl: "/artists/2/profile.jpg",
    bannerImageUrl: "/artists/2/banner.jpg",
    bio: "2013년 데뷔한 글로벌 보이그룹. 전 세계 음악 시장을 석권한 K-POP의 아이콘.",
    followerCount: 50_000_000,
    category: "boygroup",
    extendedInfo: {
      artistId: "2",
      debutDate: "2013.06.13",
      agency: "HYBE",
      genres: ["Hip-hop", "Pop", "R&B"],
      memberCount: 7,
    },
  },
  {
    id: 3,
    name: "aespa",
    profileImageUrl: "/artists/3/profile.jpg",
    bannerImageUrl: "/artists/3/banner.png",
    bio: "2020년 데뷔한 SM엔터테인먼트의 4인조 걸그룹. 아바타 세계관으로 주목받는 차세대 K-POP 아이콘.",
    followerCount: 12_000_000,
    category: "girlgroup",
    extendedInfo: {
      artistId: "3",
      debutDate: "2020.11.17",
      agency: "SM Entertainment",
      genres: ["Pop", "Electronic", "K-POP"],
      memberCount: 4,
    },
  },
  {
    id: 4,
    name: "IVE",
    profileImageUrl: "/artists/4/profile.jpg",
    bannerImageUrl: "/artists/4/banner.jpg",
    bio: "2021년 데뷔한 HYBE의 5인조 걸그룹. 매력적인 무대와 뛰어난 음악성으로 많은 사랑을 받고 있는 K-POP 아티스트.",
    followerCount: 15_000_000,
    category: "girlgroup",
    extendedInfo: {
      artistId: "4",
      debutDate: "2021.02.11",
      agency: "HYBE",
      genres: ["Pop", "Electronic", "K-POP"],
      memberCount: 5,
    },
  },
  {
    id: 5,
    name: "LUCY",
    profileImageUrl: "/artists/5/profile.jpg",
    bannerImageUrl: "/artists/5/banner.jpg",
    bio: "2019년 데뷔한 4인조 밴드. 직접 작사·작곡한 감성적인 음악과 뛰어난 연주 실력으로 인디씬을 넘어 대중적인 사랑을 받고 있는 안테나 소속 밴드.",
    followerCount: 800_000,
    category: "boygroup",
    extendedInfo: {
      artistId: "5",
      debutDate: "2019.05.17",
      agency: "Antenna Entertainment",
      genres: ["Indie Pop", "Alt-Rock", "K-Pop"],
      memberCount: 4,
    },
  },
  {
    id: 6,
    name: "DAY6",
    profileImageUrl: "/artists/6/profile.jpg",
    bannerImageUrl: "/artists/6/banner.png",
    bio: "2015년 데뷔한 JYP엔터테인먼트의 밴드. 직접 작사·작곡하며 K-POP 밴드의 새 지평을 열었다.",
    followerCount: 5_000_000,
    category: "boygroup",
    extendedInfo: {
      artistId: "6",
      debutDate: "2015.09.07",
      agency: "JYP Entertainment",
      genres: ["Rock", "Pop", "Ballad"],
      memberCount: 4,
    },
  },
  {
    id: 7,
    name: "KiiiKiii",
    profileImageUrl: "/artists/7/profile.jpg",
    bannerImageUrl: "/artists/7/banner.jpg",
    bio: "2024년 데뷔한 신예 걸그룹. 개성 넘치는 퍼포먼스와 음악으로 주목받는 라이징 아티스트.",
    followerCount: 800_000,
    category: "girlgroup",
    extendedInfo: {
      artistId: "7",
      debutDate: "2024.01.01",
      agency: "IST Entertainment",
      genres: ["Pop", "Dance", "K-POP"],
      memberCount: 5,
    },
  },
];

export function findMockArtist(
  artistId: string | number,
): MockArtist | undefined {
  return mockArtists.find((a) => a.id === Number(artistId));
}

export function toArtistDetail(a: MockArtist): ArtistDetail {
  return {
    id: a.id,
    name: a.name,
    profileImageUrl: a.profileImageUrl,
    description: a.bio ?? "",
    isFollowing: false,
    followerCount: a.followerCount,
    bio: a.bio,
    bannerImageUrl: a.bannerImageUrl,
    category: a.category,
  };
}
