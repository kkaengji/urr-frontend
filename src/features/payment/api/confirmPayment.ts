import { delay } from "@/shared/lib/mockDelay";

interface ConfirmPaymentParams {
  paymentKey: string;
  orderId: string;
  amount: number;
  userId: string | number;
}

export interface ConfirmPaymentResponse {
  paymentKey: string;
  orderId: string;
  amount: number;
  method: string;
  referenceId: string;
  status: string;
  approvedAt: string;
}

export async function confirmPayment(
  params: ConfirmPaymentParams,
): Promise<ConfirmPaymentResponse> {
  await delay(600);
  return {
    paymentKey: params.paymentKey,
    orderId: params.orderId,
    amount: params.amount,
    method: "카드",
    referenceId: `mock-ref-${Date.now()}`,
    status: "DONE",
    approvedAt: new Date().toISOString(),
  };
}
