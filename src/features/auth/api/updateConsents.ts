import { delay } from "@/shared/lib/mockDelay";

export interface UpdateConsentsParams {
  marketingConsent: boolean;
  pushConsent: boolean;
  smsConsent: boolean;
}

export async function updateConsents(_params: UpdateConsentsParams): Promise<void> {
  await delay(300);
}
