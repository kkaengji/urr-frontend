import { delay } from "@/shared/lib/mockDelay";

interface CreatePaymentRecordParams {
  userId: string | number;
  referenceId: string;
  orderId: string;
  amount: number;
}

interface CreatePaymentRecordResponse {
  paymentId: number;
  orderId: string;
  referenceId: string;
  amount: number;
  status: string;
}

export async function createPaymentRecord(
  params: CreatePaymentRecordParams,
): Promise<CreatePaymentRecordResponse> {
  await delay(400);
  return {
    paymentId: 1001,
    orderId: params.orderId,
    referenceId: params.referenceId,
    amount: params.amount,
    status: "PAID",
  };
}
