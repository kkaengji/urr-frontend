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
  status: string;
  approvedAt: string;
}

export async function confirmPayment(
  params: ConfirmPaymentParams,
): Promise<ConfirmPaymentResponse> {
  const res = await fetch("/api/payments/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paymentKey: params.paymentKey,
      orderId: params.orderId,
      amount: params.amount,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "결제 승인 실패");
  }

  return res.json();
}
