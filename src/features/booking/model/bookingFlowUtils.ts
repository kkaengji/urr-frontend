import type { BookingFlowType } from "@/shared/types";

export function getBookingFlowType(category: string): BookingFlowType {
  if (category === "festival") return "zone";
  if (category === "musical" || category === "etc") return "performance";
  return "seat-map";
}
