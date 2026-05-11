import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

export const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? "";

type TossPaymentsSDK = Awaited<ReturnType<typeof loadTossPayments>>;
export type TossWidgets = ReturnType<TossPaymentsSDK["widgets"]>;

export async function initTossWidgets(amount: number): Promise<TossWidgets> {
  const toss = await loadTossPayments(TOSS_CLIENT_KEY);
  const widgets = toss.widgets({ customerKey: ANONYMOUS });
  await widgets.setAmount({ currency: "KRW", value: amount });
  return widgets;
}
