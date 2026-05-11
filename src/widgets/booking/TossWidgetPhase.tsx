"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import { formatPrice, formatDateDot } from "@/shared/lib/format";
import {
  initTossWidgets,
  TOSS_CLIENT_KEY,
  type TossWidgets,
} from "@/features/payment/lib/tossWidget";
import type { BookingEvent } from "@/features/booking/model/BookingContext";
import type { EventDate } from "@/shared/types";

interface TossWidgetPhaseProps {
  event: BookingEvent | null;
  selectedDate: EventDate | null;
  seatDisplayNames: string[];
  hasUserTierWindow: boolean;
  subtotal: number;
  feeTotal: number;
  total: number;
  buyerName: string;
  buyerPhone: string;
  isFormValid: boolean;
  isSubmitting?: boolean;
  showDeliveryMethod?: boolean;
  deliveryMethod?: "mobile" | "onsite";
  onDeliveryMethodChange?: (method: "mobile" | "onsite") => void;
  onBack: () => void;
  onCancel: () => void;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  onWidgetReady: (widgets: TossWidgets) => void;
}

export function TossWidgetPhase({
  event,
  selectedDate,
  seatDisplayNames,
  hasUserTierWindow,
  subtotal,
  feeTotal,
  total,
  buyerName,
  buyerPhone,
  isFormValid,
  isSubmitting,
  showDeliveryMethod,
  deliveryMethod,
  onDeliveryMethodChange,
  onBack,
  onCancel,
  onNameChange,
  onPhoneChange,
  onSubmit,
  onWidgetReady,
}: TossWidgetPhaseProps) {
  const [widgetLoading, setWidgetLoading] = useState(!!TOSS_CLIENT_KEY);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !TOSS_CLIENT_KEY) return;
    initializedRef.current = true;

    initTossWidgets(total)
      .then(async (widgets) => {
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#toss-payment-method",
            variantKey: "DEFAULT",
          }),
          widgets.renderAgreement({
            selector: "#toss-agreement",
            variantKey: "AGREEMENT",
          }),
        ]);
        onWidgetReady(widgets);
        setWidgetLoading(false);
      })
      .catch(() => setWidgetLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-205 rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={onBack}
                  className="p-1 rounded-md hover:bg-accent transition-colors"
                >
                  <ArrowLeft size={18} className="text-muted-foreground" />
                </button>
                <h2 className="text-lg font-bold">주문 결제</h2>
              </div>
              <button
                onClick={onCancel}
                className="p-1 rounded-md hover:bg-accent transition-colors"
              >
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex-1 overflow-hidden flex min-h-0">
            {/* Left: buyer info + Toss widget */}
            <div className="flex-1 overflow-y-auto border-r border-border">
              {/* Buyer info */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-bold mb-3">주문자 정보</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      이름 *
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="성함을 입력하세요"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      전화번호 *
                    </label>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => onPhoneChange(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      maxLength={13}
                    />
                  </div>
                </div>
              </div>

              {showDeliveryMethod && (
                <>
                  <Separator />
                  <div className="px-6 py-5">
                    <h3 className="text-sm font-bold mb-3">수령 방법</h3>
                    <div className="space-y-2">
                      {(["mobile", "onsite"] as const).map((method) => (
                        <label
                          key={method}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all",
                            deliveryMethod === method
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50",
                          )}
                        >
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value={method}
                            checked={deliveryMethod === method}
                            onChange={() => onDeliveryMethodChange?.(method)}
                            className="accent-primary"
                          />
                          <span className="text-sm font-medium">
                            {method === "mobile"
                              ? "모바일 티켓 (앱 내 QR코드)"
                              : "현장 수령"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Toss widget area */}
              {widgetLoading && (
                <div className="flex items-center justify-center py-16">
                  <Loader2
                    size={28}
                    className="animate-spin text-muted-foreground"
                  />
                </div>
              )}
              <div id="toss-payment-method" />
              <div id="toss-agreement" />
            </div>

            {/* Right: order summary */}
            <div className="w-[240px] shrink-0 px-5 py-5 bg-muted/30 overflow-y-auto">
              <h3 className="text-sm font-bold mb-3">주문 상품</h3>

              <div className="mb-3">
                <p className="text-sm font-semibold leading-snug">
                  {event?.title}
                </p>
                {selectedDate && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {formatDateDot(selectedDate.date)}
                  </p>
                )}
              </div>

              <div className="space-y-1 mb-4">
                {seatDisplayNames.map((name, i) => (
                  <p key={i} className="text-xs text-muted-foreground">
                    {name}
                  </p>
                ))}
              </div>

              <Separator className="mb-3" />

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">티켓</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {hasUserTierWindow && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">수수료</span>
                    <span className="tabular-nums">
                      {formatPrice(feeTotal)}
                    </span>
                  </div>
                )}
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">총액</span>
                <span className="text-lg font-bold tabular-nums text-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 border-t border-border shrink-0">
            <Button
              className="w-full"
              size="lg"
              disabled={!isFormValid || widgetLoading || isSubmitting}
              onClick={onSubmit}
            >
              {widgetLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  결제 준비 중...
                </span>
              ) : isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  처리 중...
                </span>
              ) : (
                `${formatPrice(total)} 결제하기`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
