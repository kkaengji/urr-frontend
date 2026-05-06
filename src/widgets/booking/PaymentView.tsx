"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useBooking } from "@/features/booking/model/BookingContext";
import { useSeatTimer } from "@/features/booking/model/useSeatTimer";
import { usePaymentForm } from "@/shared/lib/usePaymentForm";
import { useCurrentUser } from "@/features/auth/model/useCurrentUser";
import { TimerDisplay } from "@/features/booking/ui/TimerDisplay";
import { parseSeatDisplay } from "@/shared/lib/format";
import { bookTicket } from "@/features/booking/api/bookTicket";
import { cancelReservation } from "@/features/booking/api/cancelReservation";
import { createPaymentRecord } from "@/features/payment/api/createPaymentRecord";
import { getTossPayments, TOSS_METHOD_MAP, TOSS_CLIENT_KEY } from "@/features/payment/lib/toss";
import { ApiError } from "@/shared/api/client";
import {
  useBookingStore,
  type ReservationRef,
} from "@/features/booking/model/useBookingStore";
import { useBookingSession } from "@/features/booking/model/useBookingSession";
import type { ConfirmationData } from "@/shared/types";
import { PaymentProcessingOverlay } from "./PaymentProcessingOverlay";
import { PaymentConfirmPhase } from "./PaymentConfirmPhase";
import { PaymentFormPhase } from "./PaymentFormPhase";

type PaymentPhase =
  | "confirm-seats"
  | "payment-form"
  | "processing"
  | "failed"
  | "failed-expired"
  | "seats-taken";

export function PaymentView() {
  const {
    event,
    eventId,
    artistId,
    selectedDate,
    selectedSeatIds,
    selectedSectionId,
    sectionsForDate,
    mockSections,
    flowType,
    zoneQuantity,
    userTier,
    tierWindows,
    transitionTo,
    setConfirmationData,
  } = useBooking();

  const { reservationRefs, setReservations } = useBookingStore();
  const { data: currentUser } = useCurrentUser();
  const bookingSession = useBookingSession();

  const [phase, setPhase] = useState<PaymentPhase>("confirm-seats");
  const [deliveryMethod, setDeliveryMethod] = useState<"mobile" | "onsite">("mobile");
  const retryTimer = useSeatTimer(60);

  const {
    buyerName,
    buyerPhone,
    selectedMethod,
    termsAgreed,
    isFormValid,
    handleNameChange,
    handlePhoneChange,
    setSelectedMethod,
    toggleTerms,
  } = usePaymentForm({
    initialName: currentUser?.name,
    initialPhone: currentUser?.phoneNumber,
  });

  const isZoneOrPerformance = flowType !== "seat-map";

  // zone/performance: mockSections에서 section 조회, seat-map: sectionsForDate에서 조회
  const section = useMemo(() => {
    if (isZoneOrPerformance) {
      return mockSections.find((s) => s.id === selectedSectionId) ?? null;
    }
    return sectionsForDate.find((s) => s.id === selectedSectionId) ?? null;
  }, [isZoneOrPerformance, mockSections, sectionsForDate, selectedSectionId]);

  const tierFee = tierWindows.find((w) => w.tier === userTier)?.fee ?? 0;
  const hasUserTierWindow = tierWindows.some((w) => w.tier === userTier);

  // zone/performance는 zoneQuantity, seat-map은 selectedSeatIds.length
  const seatCount = isZoneOrPerformance ? zoneQuantity : selectedSeatIds.length;
  const subtotal = section ? section.price * seatCount : 0;
  const feeTotal = tierFee * seatCount;
  const total = subtotal + feeTotal;

  // 표시용 좌석명: zone/performance는 "구역명 N번", seat-map은 기존 방식
  const seatDisplayNames = useMemo(() => {
    if (isZoneOrPerformance) {
      if (!selectedSectionId) return [];
      return Array.from({ length: zoneQuantity }, (_, i) => `${selectedSectionId} ${i + 1}번`);
    }
    if (!section) return [];
    return selectedSeatIds.map((id) => parseSeatDisplay(id, section.name));
  }, [isZoneOrPerformance, selectedSectionId, zoneQuantity, section, selectedSeatIds]);

  // Watch retry timer expiry
  useEffect(() => {
    if (phase === "failed" && retryTimer.isExpired) {
      const t = setTimeout(() => setPhase("failed-expired"), 0);
      return () => clearTimeout(t);
    }
  }, [phase, retryTimer.isExpired]);

  const handleGoToPayment = useCallback(() => {
    setPhase("payment-form");
  }, []);

  const handleBackToConfirm = useCallback(() => {
    setPhase("confirm-seats");
  }, []);

  const handleSubmitPayment = useCallback(async () => {
    if (!selectedDate) return;
    setPhase("processing");

    try {
      // zone/performance: 가상 좌석 ID 생성, seat-map: 실제 좌석 ID
      const seatIdsForBooking = isZoneOrPerformance
        ? Array.from({ length: zoneQuantity }, (_, i) => `zone-${selectedSectionId}-${i + 1}`)
        : selectedSeatIds;

      const reservation = await bookTicket({
        eventId,
        showId: selectedDate.id,
        artistId: artistId ?? "",
        seatIds: seatIdsForBooking,
        userId: currentUser?.userId ?? "",
      });

      const reservationRefList: ReservationRef[] = [
        {
          eventId: Number(eventId),
          showId: Number(selectedDate.id),
          seatIds: reservation.seatIds,
          reservationIds: reservation.reservationIds,
        },
      ];
      setReservations(reservationRefList, reservation.orderId);

      await createPaymentRecord({
        userId: currentUser?.userId ?? "",
        referenceId: reservation.reservationIds.join(","),
        orderId: reservation.orderId,
        amount: total,
      });

      const confirmationData: ConfirmationData = {
        bookingId: reservation.reservationIds[0] ?? "",
        tickets: isZoneOrPerformance
          ? Array.from({ length: zoneQuantity }, (_, i) => ({
              seatId: `zone-${selectedSectionId}-${i + 1}`,
              sectionName: section?.name ?? "",
              row: "",
              seatNumber: String(i + 1),
              price: section?.price ?? 0,
              tierFee,
            }))
          : seatIdsForBooking.map((id) => {
              const parts = id.split("-");
              return {
                seatId: id,
                sectionName: section?.name ?? "",
                row: parts.length >= 2 ? parts[parts.length - 2] : id,
                seatNumber: parts.length >= 1 ? parts[parts.length - 1] : id,
                price: section?.price ?? 0,
                tierFee,
              };
            }),
        totalAmount: total,
        bookedAt: new Date().toISOString(),
        eventTitle: event?.title ?? "",
        eventVenue: event?.venue ?? "",
        showDate: selectedDate?.date ?? "",
        userTier,
        flowType,
        zoneQuantity: isZoneOrPerformance ? zoneQuantity : undefined,
        deliveryMethod: flowType === "performance" ? deliveryMethod : undefined,
      };

      bookingSession.save(
        reservationRefList,
        confirmationData,
        String(currentUser?.userId ?? ""),
      );

      // 데모 모드: Toss 키 없으면 결제창 없이 바로 완료
      if (!TOSS_CLIENT_KEY) {
        setConfirmationData(confirmationData);
        transitionTo("confirmation");
        return;
      }

      const tossPayments = await getTossPayments();
      await tossPayments.requestPayment(TOSS_METHOD_MAP[selectedMethod], {
        amount: total,
        orderId: reservation.orderId,
        orderName: `${event?.title ?? "티켓"} ${seatCount}매`,
        successUrl: `${window.location.origin}/booking/complete`,
        failUrl: `${window.location.origin}${window.location.pathname}?paymentFail=1`,
        customerName: buyerName,
        customerMobilePhone: buyerPhone.replace(/-/g, ""),
      });
    } catch (err) {
      bookingSession.clear();
      if (err instanceof ApiError && err.status === 409) {
        setReservations([], "");
        setPhase("seats-taken");
      } else {
        setPhase("failed");
        retryTimer.start();
      }
    }
  }, [
    selectedDate,
    artistId,
    eventId,
    isZoneOrPerformance,
    zoneQuantity,
    selectedSectionId,
    selectedSeatIds,
    currentUser,
    buyerName,
    buyerPhone,
    selectedMethod,
    event,
    seatCount,
    section,
    tierFee,
    userTier,
    flowType,
    deliveryMethod,
    total,
    retryTimer,
    setReservations,
    bookingSession,
    setConfirmationData,
    transitionTo,
  ]);

  // 취소: zone은 구역 선택으로, 그 외는 좌석 개별 선택으로
  const handleCancel = useCallback(() => {
    if (flowType === "zone") {
      transitionTo("seats-section");
    } else {
      transitionTo("seats-individual");
    }
  }, [flowType, transitionTo]);

  const handleRetry = useCallback(() => {
    setPhase("payment-form");
  }, []);

  const handleExitBooking = useCallback(async () => {
    if (reservationRefs.length > 0 && currentUser) {
      await Promise.allSettled(
        reservationRefs.flatMap((ref) =>
          ref.seatIds.map((seatId) =>
            cancelReservation(
              { eventId: ref.eventId, showId: ref.showId, seatId },
              currentUser.userId,
            ),
          ),
        ),
      );
    }
    transitionTo("seats-section");
  }, [reservationRefs, currentUser, transitionTo]);

  if (phase === "confirm-seats") {
    return (
      <PaymentConfirmPhase
        event={event}
        selectedDate={selectedDate}
        seatDisplayNames={seatDisplayNames}
        seatCount={seatCount}
        section={section}
        hasUserTierWindow={hasUserTierWindow}
        userTier={userTier}
        tierFee={tierFee}
        total={total}
        onCancel={handleCancel}
        onGoToPayment={handleGoToPayment}
      />
    );
  }

  if (phase === "payment-form") {
    return (
      <PaymentFormPhase
        event={event}
        selectedDate={selectedDate}
        seatDisplayNames={seatDisplayNames}
        hasUserTierWindow={hasUserTierWindow}
        subtotal={subtotal}
        feeTotal={feeTotal}
        total={total}
        buyerName={buyerName}
        buyerPhone={buyerPhone}
        selectedMethod={selectedMethod}
        termsAgreed={termsAgreed}
        isFormValid={isFormValid}
        showDeliveryMethod={flowType === "performance"}
        deliveryMethod={deliveryMethod}
        onBack={handleBackToConfirm}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        onMethodChange={setSelectedMethod}
        onToggleTerms={toggleTerms}
        onSubmit={handleSubmitPayment}
        onDeliveryMethodChange={setDeliveryMethod}
      />
    );
  }

  if (phase === "processing") {
    return <PaymentProcessingOverlay />;
  }

  if (phase === "seats-taken") {
    return (
      <div className="fixed inset-0 z-40">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] rounded-xl bg-white shadow-lg p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center gap-4 text-center">
              <CircleAlert size={48} className="text-destructive" />
              <h3 className="text-lg font-bold">이미 선점된 좌석입니다</h3>
              <p className="text-sm text-muted-foreground">
                선택하신 좌석을 다른 분이 먼저 선점했습니다.
                <br />
                다른 좌석을 선택해 주세요.
              </p>
              <Button className="w-full mt-2" onClick={handleExitBooking}>
                좌석 다시 선택하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "failed-expired") {
    return (
      <div className="fixed inset-0 z-40">
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] rounded-xl bg-white shadow-lg p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center gap-4 text-center">
              <CircleAlert size={48} className="text-destructive" />
              <h3 className="text-lg font-bold">좌석이 해제되었습니다</h3>
              <p className="text-sm text-muted-foreground">
                재시도 시간이 만료되어 선택하신 좌석이 해제되었습니다.
              </p>
              <Button className="w-full mt-2" onClick={handleExitBooking}>
                이벤트 페이지로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40">
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px] rounded-xl bg-white shadow-lg p-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center gap-4 text-center">
            <CircleAlert size={48} className="text-destructive" />
            <h3 className="text-lg font-bold">결제에 실패했습니다</h3>
            <p className="text-sm text-muted-foreground">카드 승인이 거절되었습니다.</p>
            <div className="px-4 py-3 rounded-lg bg-muted/50 border border-border w-full">
              <p className="text-xs text-muted-foreground mb-2">
                좌석이 60초간 유지됩니다. 다시 시도해주세요.
              </p>
              <TimerDisplay seconds={retryTimer.secondsLeft} size="lg" />
            </div>
            <div className="flex gap-3 w-full pt-2">
              <Button variant="ghost" className="flex-1" onClick={handleExitBooking}>
                예매 종료
              </Button>
              <Button className="flex-1" onClick={handleRetry}>
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
