"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { useBooking } from "@/features/booking/model/BookingContext";
import { formatPrice } from "@/shared/lib/format";
import { ZoneCard } from "./ZoneCard";

export function ZoneSelectView() {
  const {
    mockSections,
    selectedSectionId,
    zoneQuantity,
    selectSection,
    setZoneQuantity,
    transitionTo,
  } = useBooking();

  const maxQty = 4;
  const selectedSection = mockSections.find((s) => s.id === selectedSectionId) ?? null;

  const handleConfirm = () => {
    if (!selectedSection) return;
    transitionTo("payment");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          구역 선택
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {mockSections.map((section) => (
            <ZoneCard
              key={section.id}
              section={section}
              isSelected={selectedSectionId === section.id}
              onSelect={() => {
                selectSection(section.id);
                setZoneQuantity(1);
              }}
            />
          ))}
        </div>
      </div>

      {selectedSection && (
        <div className="shrink-0 border-t border-border bg-white px-6 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground flex-1">매수 선택 (최대 {maxQty}매)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoneQuantity(Math.max(1, zoneQuantity - 1))}
                disabled={zoneQuantity <= 1}
                className="size-8 rounded-md border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-bold tabular-nums">
                {zoneQuantity}
              </span>
              <button
                onClick={() =>
                  setZoneQuantity(
                    Math.min(maxQty, Math.min(selectedSection.remainingSeats, zoneQuantity + 1)),
                  )
                }
                disabled={
                  zoneQuantity >= maxQty || zoneQuantity >= selectedSection.remainingSeats
                }
                className="size-8 rounded-md border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {selectedSection.name} × {zoneQuantity}매
              </p>
              <p className="text-xs text-muted-foreground">
                {formatPrice(selectedSection.price)} × {zoneQuantity}매 ={" "}
                <span className="font-semibold text-primary tabular-nums">
                  {formatPrice(selectedSection.price * zoneQuantity)}
                </span>
              </p>
            </div>
            <Button onClick={handleConfirm} className="shrink-0">
              결제 진행하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
