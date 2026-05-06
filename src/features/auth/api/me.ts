import { delay } from "@/shared/lib/mockDelay";
import type { AuthUser } from "../model/types";
import { mockUser } from "@/shared/lib/mocks/user";

const mockAuthUser: AuthUser = {
  userId: 1,
  email: "wooru@urr.kr",
  nickname: "김우르",
  name: "김우르",
  phoneNumber: "01012345678",
  role: "USER",
  onboardingCompleted: true,
  marketingConsent: true,
  pushConsent: true,
  smsConsent: false,
  memberships: mockUser.memberships.map((m) => ({
    artistId: Number(m.artistId),
    artistName: m.artistName,
    tier: m.tier,
    endDate: m.expiresAt.slice(0, 10),
  })),
};

export async function fetchMe(): Promise<AuthUser> {
  await delay(300);
  return mockAuthUser;
}
