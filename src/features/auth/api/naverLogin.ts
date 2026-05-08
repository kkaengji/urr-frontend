import { delay } from "@/shared/lib/mockDelay";
import type { AuthResponseData } from "../model/types";

export async function naverLogin(
  _code: string,
  _redirectUri: string,
): Promise<AuthResponseData> {
  await delay(800);
  return {
    tokens: {
      accessToken: "mock-access-token",
      tokenType: "Bearer",
      expiresInSeconds: 3600,
    },
    user: {
      userId: 1,
      email: "naver@urr.kr",
      nickname: "김우르",
      role: "USER",
      onboardingCompleted: true,
      marketingConsent: true,
      pushConsent: true,
      smsConsent: false,
    },
    onboardingRequired: false,
    nextPath: "/",
  };
}
