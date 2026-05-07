"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  FilterChip,
  ScrollableRow,
  ViewToggle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";
import { EventTagBadge } from "@/entities/event";
import { getEvents } from "@/features/event";
import type { EventSummary } from "@/features/event";
import {
  eventCategoryFilters,
  type EventCategory,
  type EventCategoryFilter,
} from "@/features/event";

type SortKey = "popular" | "date" | "name" | "recent";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "인기순" },
  { value: "date",    label: "날짜순" },
  { value: "name",    label: "이름순" },
  { value: "recent",  label: "최신 등록순" },
];

interface EventListItem {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  venue: string;
  dateRange: string;
  openDate: string;
  status: string;
  category: EventCategory;
  tags: string[];
  poster: string;
  isPast: boolean;
}

function checkIsPast(endDate?: string): boolean {
  if (!endDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(endDate) < today;
}

/* ------------------------------------------------------------------ */
/*  PopularEventCard — carousel card with poster overlay              */
/* ------------------------------------------------------------------ */

function PopularEventCard({ event }: { event: EventListItem }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group shrink-0 w-[240px] rounded-xl overflow-hidden relative block"
    >
      {/* Poster image */}
      <div className="relative w-full aspect-[3/4] bg-muted overflow-hidden">
        {event.poster ? (
          <Image
            src={event.poster}
            alt={event.title}
            fill
            sizes="240px"
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${event.isPast ? "grayscale" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="text-muted-foreground text-xs font-medium text-center line-clamp-4">
              {event.title}
            </span>
          </div>
        )}
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top badges */}
      <div className="absolute top-3 left-3 flex gap-1.5">
        {event.isPast && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm border border-white/30">
            공연 종료
          </span>
        )}
        {!event.isPast && event.tags && event.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary text-primary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Text overlay (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
        <h3 className={`font-bold text-sm leading-tight line-clamp-2 ${event.isPast ? "text-white/50" : "text-white"}`}>
          {event.title}
        </h3>
        <p className={`text-xs truncate ${event.isPast ? "text-white/30" : "text-white/70"}`}>{event.venue}</p>
        <p className={`text-xs ${event.isPast ? "text-white/30" : "text-white/70"}`}>{event.dateRange}</p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  EventGridCard — grid view card                                    */
/* ------------------------------------------------------------------ */

function EventGridCard({ event }: { event: EventListItem }) {
  return (
    <Link href={`/events/${event.id}`} className="group min-w-0">
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-muted">
        {event.poster ? (
          <Image
            src={event.poster}
            alt={event.title}
            fill
            sizes="(max-width: 1200px) 20vw, 240px"
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${event.isPast ? "grayscale" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <span className="text-muted-foreground text-xs font-medium text-center line-clamp-4">{event.title}</span>
          </div>
        )}
        {event.isPast && (
          <div className="absolute inset-0 bg-black/20" />
        )}
        {event.isPast && (
          <span className="absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/50 text-white/80">
            공연 종료
          </span>
        )}
      </div>
      <div className="mt-2.5 space-y-1.5">
        <p className={`text-sm font-semibold line-clamp-2 leading-tight transition-colors ${event.isPast ? "text-muted-foreground" : "group-hover:text-primary"}`}>
          {event.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{event.venue}</p>
        <p className="text-xs text-muted-foreground">{event.dateRange}</p>
        {!event.isPast && event.tags && event.tags.length > 0 && (
          <div className="flex gap-1 pt-0.5">
            {event.tags.map((tag) => (
              <EventTagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  EventListRow — list view row                                      */
/* ------------------------------------------------------------------ */

function EventListRow({ event }: { event: EventListItem }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex items-center gap-4 py-3 px-2 -mx-2 rounded-lg hover:bg-[#F3F2F0] transition-colors"
    >
      <div className="relative w-[72px] aspect-[3/4] rounded-lg overflow-hidden bg-muted shrink-0">
        {event.poster && (
          <Image
            src={event.poster}
            alt={event.title}
            fill
            sizes="72px"
            className={`object-cover ${event.isPast ? "grayscale" : ""}`}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className={`text-base font-semibold truncate transition-colors ${event.isPast ? "text-muted-foreground" : "group-hover:text-primary"}`}>
            {event.title}
          </h3>
          {event.isPast && (
            <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-border text-muted-foreground">
              공연 종료
            </span>
          )}
        </div>
        <p className="text-[13px] text-muted-foreground truncate">
          {event.artistName} · {event.venue}
        </p>
        <p className="text-[13px] text-muted-foreground">{event.dateRange}</p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  main                                                              */
/* ------------------------------------------------------------------ */

function buildDateRange(openDate: string, endDate?: string): string {
  if (!endDate || endDate === openDate) return openDate;
  return `${openDate} - ${endDate}`;
}

function mapToEventListItem(e: EventSummary): EventListItem {
  return {
    id: String(e.eventId),
    artistId: String(e.artistId),
    artistName: e.artistName ?? "",
    title: e.title,
    venue: e.venueTemplateName,
    dateRange: buildDateRange(e.openDate, e.endDate),
    openDate: e.openDate,
    status: e.active ? "open" : "closed",
    category: (e.category as EventCategory) ?? "concert",
    tags: e.tags ?? [],
    poster: e.posterImageUrl ?? "",
    isPast: checkIsPast(e.endDate),
  };
}

export function EventsWidget() {
  const [category, setCategory] = useState<EventCategoryFilter>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("popular");

  const { data: eventsData = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const allEvents = useMemo(() => {
    const seen = new Set<string>();
    return eventsData
      .filter((e) => {
        const id = String(e.eventId);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map(mapToEventListItem);
  }, [eventsData]);

  const sortEvents = (items: EventListItem[], key: SortKey) => {
    const active = items.filter((e) => !e.isPast);
    const past   = items.filter((e) =>  e.isPast);
    if (key === "popular") return [...active, ...past];
    const cmp = (a: EventListItem, b: EventListItem) => {
      if (key === "name")   return a.title.localeCompare(b.title, "ko");
      if (key === "recent") return Number(b.id) - Number(a.id);
      return a.openDate.localeCompare(b.openDate); // date asc
    };
    return [...active.sort(cmp), ...past.sort(cmp)];
  };

  const filteredEvents = useMemo(() => {
    const base = category === "all" ? allEvents : allEvents.filter((e) => e.category === category);
    return sortEvents(base, sort);
  }, [allEvents, category, sort]);

  const popularEvents = useMemo(() => sortEvents(allEvents, "date"), [allEvents]);

  return (
    <div className="space-y-14">
      {/* ===== 1. 가장 인기있는 공연 ===== */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold">가장 인기있는 공연</h2>
        <ScrollableRow className="flex gap-4">
          {popularEvents.map((event) => (
            <PopularEventCard key={event.id} event={event} />
          ))}
        </ScrollableRow>
      </section>

      {/* ===== 2. 전체 공연 보기 ===== */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold">전체 공연 보기</h2>
        <div className="flex items-center justify-between">
          <FilterChip options={eventCategoryFilters} value={category} onChange={setCategory} />
          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredEvents.length}개</span>의 공연
        </p>

        {/* Grid or List */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 text-sm text-muted-foreground">
            해당 카테고리에 공연이 없습니다.
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-5 gap-x-4 gap-y-10">
            {filteredEvents.map((event) => (
              <EventGridCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredEvents.map((event) => (
              <EventListRow key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
