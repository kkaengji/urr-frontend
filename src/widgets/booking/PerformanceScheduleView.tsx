"use client";

import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { useBooking } from "@/features/booking/model/BookingContext";
import type { EventDate } from "@/shared/types";

function groupByDate(dates: EventDate[]): Map<string, EventDate[]> {
  const map = new Map<string, EventDate[]>();
  for (const d of dates) {
    const key = d.date.slice(0, 10);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(d);
  }
  return map;
}

function formatDateLabel(isoDate: string): string {
  const d = new Date(isoDate);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const w = weekdays[d.getDay()];
  return `${m}월 ${day}일 (${w})`;
}

function formatTime(isoDate: string): string {
  const d = new Date(isoDate);
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${min}`;
}

export function PerformanceScheduleView() {
  const { eventDates, selectedDateId, selectDate, transitionTo } = useBooking();

  const grouped = useMemo(() => groupByDate(eventDates), [eventDates]);
  const entries = useMemo(() => Array.from(grouped.entries()), [grouped]);

  const handleSelectSession = (dateId: string) => {
    selectDate(dateId);
    transitionTo("seats-individual");
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        회차 선택
      </h3>
      <div className="space-y-6">
        {entries.map(([, sessions]) => (
          <div key={sessions[0].date.slice(0, 10)}>
            <p className="text-sm font-semibold mb-2">{formatDateLabel(sessions[0].date)}</p>
            <div className="flex flex-wrap gap-2">
              {sessions.map((session) => {
                const isSoldOut = session.remainingSeats === 0;
                const isSelected = selectedDateId === session.id;
                return (
                  <button
                    key={session.id}
                    disabled={isSoldOut}
                    onClick={() => !isSoldOut && handleSelectSession(session.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : isSoldOut
                        ? "border-border bg-muted/50 text-muted-foreground cursor-not-allowed"
                        : "border-border bg-white hover:border-primary/40 hover:bg-primary/3 cursor-pointer",
                    )}
                  >
                    <span className="tabular-nums">{formatTime(session.date)}</span>
                    <span className="ml-1.5 text-xs text-muted-foreground">
                      {isSoldOut ? "매진" : `잔여 ${session.remainingSeats}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
