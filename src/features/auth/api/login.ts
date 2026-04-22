import { delay } from "@/shared/lib/mockDelay";
import type { AuthResponseData } from "../model/types";

export async function login(
  _email: string,
  _password: string,
): Promise<AuthResponseData> {
  await delay(600);
  return {
    tokens: {
      accessToken: "mock-access-token",
      tokenType: "Bearer",
      expiresInSeconds: 3600,
    },
    user: {
      userId: 1,
      email: _email,
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
