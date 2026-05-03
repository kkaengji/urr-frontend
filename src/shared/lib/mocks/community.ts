import type { CommunityPost } from "@/shared/types";

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1-1",
    artistId: "1",
    authorName: "IU",
    authorAvatar: "/artists/1/profile.jpg",
    isOfficial: true,
    content:
      "여러분 오늘 콘서트 정말 너무 행복했어요 😊 이렇게 많이 와주셔서 진심으로 감사드려요. 무대 위에서 바라보는 여러분 한 분 한 분의 표정이 너무 예쁘고 소중했어요. 다음에 또 이런 날이 올 수 있도록 더 열심히 준비할게요 💛",
    images: ["/artists/1/community/post-1-1.jpg"],
    likeCount: 42300,
    commentCount: 3812,
    createdAt: "2025-04-28T21:30:00+09:00",
  },
  {
    id: "post-1-2",
    artistId: "1",
    authorName: "IU",
    authorAvatar: "/artists/1/profile.jpg",
    isOfficial: true,
    content:
      "새 앨범 작업하면서 이 곡을 처음 완성했을 때 혼자 한참 울었어요. 가사 한 줄 한 줄이 지난 시간들이라서요. 듣고 나서 여러분이 어떤 감정을 느끼실지가 너무 궁금하고 기대돼요. 조금만 기다려 주세요 🎵",
    images: ["/artists/1/community/post-2-1.jpg"],
    likeCount: 58100,
    commentCount: 5230,
    createdAt: "2025-04-20T14:05:00+09:00",
  },
  {
    id: "post-1-3",
    artistId: "1",
    authorName: "봄여름가을겨울_아이유",
    authorAvatar: "",
    isOfficial: false,
    content:
      "오늘 팬미팅 당첨돼서 처음으로 아이유 직접 봤어요 ㅠㅠ 진짜 존재 자체가 너무 예쁜 사람이에요… 손 흔들어줬을 때 인생 끝난 줄 알았어요 🫶 5년 기다린 보람이 있다",
    images: ["/artists/1/community/post-3-1.jpg"],
    likeCount: 9870,
    commentCount: 742,
    createdAt: "2025-04-19T23:11:00+09:00",
  },
  {
    id: "post-1-4",
    artistId: "1",
    authorName: "아이유_덕후생활12년차",
    authorAvatar: "",
    isOfficial: false,
    content:
      "신보 들으면서 출근하는데 지하철에서 눈물 흘릴 뻔했잖아요 😭 특히 3번 트랙이 진짜 미쳤어요.. 아이유 음악은 항상 딱 내가 듣고 싶은 말을 해줘서 신기해요. 어떻게 이렇게 쓰는 거지",
    images: ["/artists/1/community/post-4-1.jpg"],
    likeCount: 4521,
    commentCount: 389,
    createdAt: "2025-04-15T08:47:00+09:00",
  },
];

export function getMockCommunityPosts(artistId: string): CommunityPost[] {
  return mockCommunityPosts.filter((p) => p.artistId === artistId);
}
