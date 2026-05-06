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
  {
    id: 8,
    name: "RIIZE",
    profileImageUrl: "/artists/8/profile.jpg",
    bannerImageUrl: "/artists/8/banner.jpg",
    bio: "2023년 SM엔터테인먼트에서 데뷔한 7인조 보이그룹. 청량하고 성숙한 무드를 동시에 갖춘 라이징 K-POP 아이콘.",
    followerCount: 2_000_000,
    category: "boygroup",
    extendedInfo: {
      artistId: "8",
      debutDate: "2023.09.04",
      agency: "SM Entertainment",
      genres: ["Pop", "Dance", "K-POP"],
      memberCount: 7,
    },
  },
  {
    id: 9,
    name: "이영지",
    profileImageUrl: "/artists/9/profile.jpg",
    bannerImageUrl: "/artists/9/banner.jpg",
    bio: "2021년 데뷔한 솔로 래퍼. 「차트를 달리는 여자」로 알려진 아메바컬쳐 소속 아티스트. 음악·예능을 오가며 폭발적인 인기를 누리고 있다.",
    followerCount: 1_500_000,
    category: "solo",
    extendedInfo: {
      artistId: "9",
      debutDate: "2021.10.27",
      agency: "아메바컬쳐",
      genres: ["Hip-hop", "R&B", "Pop"],
    },
  },
  {
    id: 10,
    name: "최예나",
    profileImageUrl: "/artists/10/profile.jpg",
    bannerImageUrl: "/artists/10/banner.jpg",
    bio: "2021년 솔로 데뷔한 IST엔터테인먼트 소속 아티스트. 아이즈원 출신으로 솔로 전환 후에도 꾸준한 팬덤과 음악성으로 사랑받고 있다.",
    followerCount: 600_000,
    category: "solo",
    extendedInfo: {
      artistId: "10",
      debutDate: "2021.05.26",
      agency: "IST Entertainment",
      genres: ["Pop", "Dance", "K-POP"],
    },
  },
  {
    id: 11,
    name: "ILLIT",
    profileImageUrl: "/artists/11/profile.jpg",
    bannerImageUrl: "/artists/11/banner.jpg",
    bio: "2024년 HYBE 레이블즈에서 데뷔한 5인조 걸그룹. 데뷔와 동시에 글로벌 차트를 휩쓸며 4세대 K-POP을 이끄는 신예.",
    followerCount: 3_000_000,
    category: "girlgroup",
    extendedInfo: {
      artistId: "11",
      debutDate: "2024.03.25",
      agency: "HYBE Labels",
      genres: ["Pop", "Dance", "K-POP"],
      memberCount: 5,
    },
  },
  {
    id: 12,
    name: "LE SSERAFIM",
    profileImageUrl: "/artists/12/profile.jpg",
    bannerImageUrl: "/artists/12/banner.jpg",
    bio: "2022년 Source Music에서 데뷔한 5인조 걸그룹. 강렬한 퍼포먼스와 'FEARLESS' 정신으로 전 세계 팬들을 사로잡고 있다.",
    followerCount: 8_000_000,
    category: "girlgroup",
    extendedInfo: {
      artistId: "12",
      debutDate: "2022.05.02",
      agency: "Source Music / HYBE",
      genres: ["Pop", "Dance", "K-POP"],
      memberCount: 5,
    },
  },
  {
    id: 13,
    name: "TWS",
    profileImageUrl: "/artists/13/profile.jpg",
    bannerImageUrl: "/artists/13/banner.jpg",
    bio: "2024년 PLEDIS엔터테인먼트에서 데뷔한 6인조 보이그룹. 청량하고 풋풋한 에너지로 데뷔 직후부터 글로벌 팬덤을 형성한 라이징 아티스트.",
    followerCount: 1_200_000,
    category: "boygroup",
    extendedInfo: {
      artistId: "13",
      debutDate: "2024.01.22",
      agency: "PLEDIS Entertainment / HYBE",
      genres: ["Pop", "Dance", "K-POP"],
      memberCount: 6,
    },
  },
  {
    id: 14,
    name: "Stray Kids",
    profileImageUrl: "/artists/14/profile.jpg",
    bannerImageUrl: "/artists/14/banner.jpg",
    bio: "2018년 JYP엔터테인먼트에서 데뷔한 8인조 보이그룹. 자체 프로덕션 유닛 3RACHA를 필두로 직접 작사·작곡하며 독보적인 음악 세계를 구축하고 있다.",
    followerCount: 12_000_000,
    category: "boygroup",
    extendedInfo: {
      artistId: "14",
      debutDate: "2018.03.25",
      agency: "JYP Entertainment",
      genres: ["Hip-hop", "Pop", "Dance"],
      memberCount: 8,
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
