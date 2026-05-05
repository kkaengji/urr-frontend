import { delay } from "@/shared/lib/mockDelay";
import type { AuthResponseData } from "../model/types";

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
  birthDate: string; // "YYYY-MM-DD"
  phone: string;
  gender: "MALE" | "FEMALE";
  marketingConsent: boolean;
}

export async function register(
  params: RegisterParams,
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
      email: params.email,
      nickname: params.name,
      role: "USER",
      onboardingCompleted: true,
      marketingConsent: params.marketingConsent,
      pushConsent: false,
      smsConsent: false,
    },
    onboardingRequired: false,
    nextPath: "/",
  };
}
