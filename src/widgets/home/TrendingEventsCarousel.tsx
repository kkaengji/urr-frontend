"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, parseApiDate } from "@/shared/lib/utils";
import { getArtistGradient } from "@/shared/lib/artistGradients";
import type { HomeTrendingEvent } from "@/features/home/api/getHome";

function formatDateRange(openDate: unknown, endDate: unknown): string {
  const open = parseApiDate(openDate);
  if (isNaN(open.getTime())) return "";
  const openStr = `${open.getMonth() + 1}.${open.getDate()}`;
  if (!endDate) return openStr;
  const end = parseApiDate(endDate);
  if (isNaN(end.getTime())) return openStr;
  return `${openStr} ~ ${end.getMonth() + 1}.${end.getDate()}`;
}

const PAGE_SIZE = 6;

interface TrendingEventsCarouselProps {
  events: HomeTrendingEvent[];
}

export function TrendingEventsCarousel({ events }: TrendingEventsCarouselProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(events.length / PAGE_SIZE);
  const pageEvents = events.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">지금 뜨는 공연</h2>
      <div className="relative">
        {totalPages > 1 && page > 0 && (
          <button
            onClick={() => setPage((p) => p - 1)}
            className="absolute -left-5 top-[45%] -translate-y-1/2 z-10 size-9 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
            aria-label="이전"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {totalPages > 1 && page < totalPages - 1 && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="absolute -right-5 top-[45%] -translate-y-1/2 z-10 size-9 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
            aria-label="다음"
          >
            <ChevronRight size={18} />
          </button>
        )}
        <div className="grid grid-cols-6 gap-3">
          {pageEvents.map((event, idx) => {
          const globalIndex = page * PAGE_SIZE + idx;
          return (
            <Link
              key={event.eventId}
              href={`/events/${event.eventId}`}
              className="group min-w-0"
            >
              <div className="relative w-full aspect-4/5 rounded-lg overflow-hidden">
                {event.posterImageUrl ? (
                  <Image
                    src={event.posterImageUrl}
                    alt={event.eventTitle}
                    fill
                    sizes="(max-width: 1200px) 16vw, 200px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ background: getArtistGradient(String(event.artistId)) }}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <span
                  className="absolute bottom-2 left-3 text-4xl font-black text-white/90"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  {globalIndex + 1}
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5">
                <p className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {event.eventTitle}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {event.venueAddress ?? ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateRange(event.openDate, event.endDate)}
                </p>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
}
