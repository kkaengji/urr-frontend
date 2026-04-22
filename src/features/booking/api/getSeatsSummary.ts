import { delay } from "@/shared/lib/mockDelay";

export interface SeatsSummaryZone {
  sectionCode: string;
  zoneNo: number;
  totalSeats: number;
  sellableSeats: number;
  bookableSeats: number;
}

export interface SeatsSummaryTier {
  tier: string;
  totalSeats: number;
  sellableSeats: number;
  bookableSeats: number;
  zones: SeatsSummaryZone[];
}

export interface SeatsSummaryData {
  eventId: number;
  showId: number;
  tiers: SeatsSummaryTier[];
}

const TIER_DEF = [
  { tier: "VIP", zones: 3,  total: 667,   sold: 120  },
  { tier: "S",   zones: 8,  total: 550,   sold: 310  },
  { tier: "R",   zones: 7,  total: 756,   sold: 490  },
  { tier: "A",   zones: 20, total: 150,   sold: 85   },
];

function buildTiers(): SeatsSummaryTier[] {
  return TIER_DEF.map(({ tier, zones, total, sold }) => {
    const zoneList: SeatsSummaryZone[] = Array.from({ length: zones }, (_, i) => ({
      sectionCode: `${tier}${i + 1}`,
      zoneNo: i + 1,
      totalSeats: total,
      sellableSeats: total - sold,
      bookableSeats: total - sold,
    }));
    return {
      tier,
      totalSeats: total * zones,
      sellableSeats: (total - sold) * zones,
      bookableSeats: (total - sold) * zones,
      zones: zoneList,
    };
  });
}

const mockTiers = buildTiers();

export async function getSeatsSummary(
  eventId: string | number,
  showId: string | number,
): Promise<SeatsSummaryData> {
  await delay(300);
  return { eventId: Number(eventId), showId: Number(showId), tiers: mockTiers };
}
