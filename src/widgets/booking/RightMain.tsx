"use client";

import { useBooking } from "@/features/booking/model/BookingContext";
import { Skeleton } from "@/shared/ui/skeleton";
import { IdleView } from "./IdleView";
import { UnifiedSeatView } from "./UnifiedSeatView";
import { ZoneSelectView } from "./ZoneSelectView";
import { PerformanceScheduleView } from "./PerformanceScheduleView";
import { GradePicker } from "./GradePicker";
import { PaymentView } from "./PaymentView";
import { ConfirmationView } from "./ConfirmationView";

function RightMainSkeleton() {
  return (
    <div className="h-full p-6 flex flex-col gap-4">
      <Skeleton className="flex-3 w-full rounded-xl" />
      <div className="flex-2 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-8" />
        ))}
      </div>
    </div>
  );
}

export function RightMain() {
  const { bookingState, isLoading, flowType } = useBooking();

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-background">
      {isLoading ? (
        <RightMainSkeleton />
      ) : bookingState === "idle" ? (
        <div key="idle" className="h-full animate-in fade-in duration-200">
          <IdleView />
        </div>
      ) : bookingState === "seats-section" ? (
        <div
          key="seats-section"
          className="h-full animate-in fade-in duration-200"
        >
          {flowType === "zone" ? (
            <ZoneSelectView />
          ) : flowType === "performance" ? (
            <PerformanceScheduleView />
          ) : (
            <UnifiedSeatView />
          )}
        </div>
      ) : bookingState === "seats-individual" ? (
        <div
          key="seats-individual"
          className="h-full animate-in fade-in duration-200"
        >
          {flowType === "performance" ? <GradePicker /> : <UnifiedSeatView />}
        </div>
      ) : bookingState === "payment" ? (
        <div key="payment" className="h-full animate-in fade-in duration-200">
          {flowType === "seat-map" && <UnifiedSeatView />}
        </div>
      ) : bookingState === "confirmation" ? (
        <div
          key="confirmation"
          className="h-full animate-in fade-in duration-200"
        >
          <ConfirmationView />
        </div>
      ) : null}

      {bookingState === "payment" && <PaymentView />}
    </div>
  );
}
