import { delay } from "@/shared/lib/mockDelay";
import type { AuthResponseData, KakaoRejoinConfirmationResponse } from "../model/types";

export type KakaoLoginResponse =
  | AuthResponseData
  | KakaoRejoinConfirmationResponse;

export async function kakaoLogin(
  _code: string,
  _redirectUri: string,
): Promise<KakaoLoginResponse> {
  await delay(800);
  return {
    tokens: {
      accessToken: "mock-access-token",
      tokenType: "Bearer",
      expiresInSeconds: 3600,
    },
    user: {
      userId: 1,
      email: "kakao@urr.kr",
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
