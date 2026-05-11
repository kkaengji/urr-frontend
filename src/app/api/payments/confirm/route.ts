import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { paymentKey, orderId, amount } = await req.json();

  if (!paymentKey || !orderId || !amount) {
    return NextResponse.json({ message: "필수 파라미터 누락" }, { status: 400 });
  }

  // 데모 모드: 실제 Toss 승인 API 대신 mock 응답 반환
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    paymentKey,
    orderId,
    amount,
    method: "토스페이",
    status: "DONE",
    approvedAt: new Date().toISOString(),
  });
}
