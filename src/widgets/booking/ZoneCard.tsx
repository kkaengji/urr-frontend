"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/lib/format";
import type { Section } from "@/shared/types";

interface ZoneCardProps {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
}

function ZoneCardBase({ section, isSelected, onSelect }: ZoneCardProps) {
  const isSoldOut = section.remainingSeats === 0;

  return (
    <button
      onClick={!isSoldOut ? onSelect : undefined}
      disabled={isSoldOut}
      className={cn(
        "w-full p-4 rounded-xl border text-left transition-all",
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : isSoldOut
            ? "border-border bg-muted/50 opacity-60 cursor-not-allowed"
            : "border-border bg-white hover:border-primary/40 hover:bg-primary/3 cursor-pointer",
      )}
    >
      <div className="text-sm font-semibold">{section.name}</div>
      <div className="text-primary font-bold mt-1 tabular-nums">
        {formatPrice(section.price)}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {isSoldOut
          ? "매진"
          : `잔여 ${section.remainingSeats.toLocaleString()}매`}
      </div>
    </button>
  );
}

export const ZoneCard = memo(ZoneCardBase);
