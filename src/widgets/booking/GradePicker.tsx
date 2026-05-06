"use client";

import { ArrowLeft, Minus, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { useBooking } from "@/features/booking/model/BookingContext";
import { formatPrice, formatEventDateTime } from "@/shared/lib/format";

export function GradePicker() {
  const {
    selectedDate,
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
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => transitionTo("seats-section")}
            className="p-1 rounded-md hover:bg-accent transition-colors"
          >
            <ArrowLeft size={16} className="text-muted-foreground" />
          </button>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              등급 선택
            </h3>
            {selectedDate && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatEventDateTime(selectedDate.date)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {mockSections.map((section) => {
            const isSoldOut = section.remainingSeats === 0;
            const isSelected = selectedSectionId === section.id;
            return (
              <button
                key={section.id}
                disabled={isSoldOut}
                onClick={() => {
                  if (!isSoldOut) {
                    selectSection(section.id);
                    setZoneQuantity(1);
                  }
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : isSoldOut
                    ? "border-border bg-muted/50 opacity-60 cursor-not-allowed"
                    : "border-border bg-white hover:border-primary/40 hover:bg-primary/3 cursor-pointer",
                )}
              >
                <div>
                  <p className="text-sm font-semibold">{section.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isSoldOut ? "매진" : `잔여 ${section.remainingSeats.toLocaleString()}석`}
                  </p>
                </div>
                <p className="text-sm font-bold text-primary tabular-nums">
                  {formatPrice(section.price)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedSection && (
        <div className="shrink-0 border-t border-border bg-white px-6 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground flex-1">
              매수 선택 (최대 {maxQty}매)
            </span>
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
                onClick={() => setZoneQuantity(Math.min(maxQty, zoneQuantity + 1))}
                disabled={zoneQuantity >= maxQty}
                className="size-8 rounded-md border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold">
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
