"use client";

import { VenueMap } from "@/features/booking/ui/VenueMap";
import { SectionListTable } from "@/features/booking/ui/SectionListTable";
import { Separator } from "@/shared/ui/separator";
import { useBooking } from "@/features/booking/model/BookingContext";
import { formatPrice } from "@/shared/lib/format";

export function IdleView() {
  const { flowType, mockSections } = useBooking();

  if (flowType === "zone" || flowType === "performance") {
    const label = flowType === "zone" ? "구역 안내" : "좌석 등급 안내";
    return (
      <div className="flex flex-col h-full p-6 gap-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {mockSections.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl border border-border bg-white"
            >
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="text-primary font-bold mt-1 tabular-nums text-sm">
                {formatPrice(s.price)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                총 {s.totalSeats.toLocaleString()}석
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 gap-2">
      <div className="flex-3 min-h-0 flex flex-col">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          좌석 배치도
        </h3>
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <VenueMap className="w-full h-full" />
        </div>
      </div>

      <Separator />

      <div className="flex-2 min-h-0 flex flex-col">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-2">
          구역별 현황
        </h3>
        <SectionListTable className="flex-1 min-h-0" />
      </div>
    </div>
  );
}
