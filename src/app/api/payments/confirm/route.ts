import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { paymentKey, orderId, amount } = await req.json();

  if (!paymentKey || !orderId || !amount) {
    return NextResponse.json({ message: "필수 파라미터 누락" }, { status: 400 });
  }

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ message: "서버 설정 오류" }, { status: 500 });
  }

  const encoded = Buffer.from(`${secretKey}:`).toString("base64");

  const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const data = await tossRes.json();

  if (!tossRes.ok) {
    return NextResponse.json(data, { status: tossRes.status });
  }

  return NextResponse.json(data);
}
