import { tokenStore } from "@/shared/api/tokenStore";
import { delay } from "@/shared/lib/mockDelay";
import type { AuthUser } from "../model/types";

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
  memberships: [
    { artistId: 1, artistName: "G-Dragon", tier: "LIGHTNING", endDate: "2026-12-31" },
    { artistId: 2, artistName: "BTS", tier: "THUNDER", endDate: "2026-06-30" },
    { artistId: 3, artistName: "aespa", tier: "CLOUD", endDate: "2026-09-15" },
    { artistId: 4, artistName: "IVE", tier: "MIST", endDate: "2026-08-10" },
  ],
};

export async function fetchMe(): Promise<AuthUser> {
  await delay(300);
  if (!tokenStore.getToken()) {
    throw new Error("Unauthorized");
  }
  return mockAuthUser;
}
