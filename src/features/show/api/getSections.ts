import { delay } from "@/shared/lib/mockDelay";

export interface ShowSection {
  code: string;
  grade: string;
  zoneNo: number;
  price: number;
  color: string;
}

export interface ShowSectionsData {
  showId: number;
  sections: ShowSection[];
}

const TIER_CONFIG = [
  { grade: "VIP", zones: 3, price: 198000, color: "#FFB300" },
  { grade: "S",   zones: 8, price: 132000, color: "#FF5E32" },
  { grade: "R",   zones: 7, price: 110000, color: "#1F2792" },
  { grade: "A",   zones: 20, price: 99000, color: "#4CAF50" },
];

const mockSections: ShowSection[] = TIER_CONFIG.flatMap(({ grade, zones, price, color }) =>
  Array.from({ length: zones }, (_, i) => ({
    code: `${grade}${i + 1}`,
    grade,
    zoneNo: i + 1,
    price,
    color,
  })),
);

export async function getSections(showId: string | number): Promise<ShowSectionsData> {
  await delay(300);
  return { showId: Number(showId), sections: mockSections };
}
