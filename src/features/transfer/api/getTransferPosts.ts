import { delay } from "@/shared/lib/mockDelay";
import type {
  TransferListing,
  TransferStatus,
  TierLevel,
  Event,
} from "@/shared/types";
import { findMockEvent } from "@/shared/lib/mocks/events";

export type EnrichedTransfer = TransferListing & { event: Event };

// ── Internal mock data ───────────────────────────────────

interface MockTransferPost {
  id: number;
  artistId: number;
  showId: number;
  showName: string;
  showDate: string;
  showVenue: string;
  section: string;
  zone: string;
  rowInfo: string;
  seatNumber: string;
  faceValue: number;
  sellingPrice: number;
  sellerTier: string;
  sellerTradeCount: number;
  feeAmount: number;
  sellerExpectedAmount: number;
  status: string;
  sellerUserId: number;
  createdAt: string;
}

const mockPosts: MockTransferPost[] = [
  {
    id: 1,
    artistId: 1,
    showId: 1,
    showName: "2026 IU CONCERT 〈The Winning〉",
    showDate: "2026-10-11T18:00:00+09:00",
    showVenue: "KSPO DOME (올림픽체조경기장)",
    section: "R",
    zone: "R3",
    rowInfo: "5",
    seatNumber: "12",
    faceValue: 110000,
    sellingPrice: 140000,
    sellerTier: "LIGHTNING",
    sellerTradeCount: 8,
    feeAmount: 7000,
    sellerExpectedAmount: 133000,
    status: "listed",
    sellerUserId: 101,
    createdAt: "2026-04-15T10:00:00+09:00",
  },
  {
    id: 2,
    artistId: 1,
    showId: 1,
    showName: "2026 IU CONCERT 〈The Winning〉〉",
    showDate: "2026-10-11T18:00:00+09:00",
    showVenue: "KSPO DOME (올림픽체조경기장)",
    section: "S",
    zone: "S2",
    rowInfo: "11",
    seatNumber: "7",
    faceValue: 132000,
    sellingPrice: 160000,
    sellerTier: "THUNDER",
    sellerTradeCount: 3,
    feeAmount: 8000,
    sellerExpectedAmount: 152000,
    status: "listed",
    sellerUserId: 102,
    createdAt: "2026-04-16T14:30:00+09:00",
  },
  {
    id: 3,
    artistId: 1,
    showId: 1,
    showName: "2026 IU CONCERT 〈The Winning〉",
    showDate: "2026-10-11T18:00:00+09:00",
    showVenue: "KSPO DOME (올림픽체조경기장)",
    section: "A",
    zone: "A5",
    rowInfo: "3",
    seatNumber: "20",
    faceValue: 99000,
    sellingPrice: 110000,
    sellerTier: "CLOUD",
    sellerTradeCount: 1,
    feeAmount: 11000,
    sellerExpectedAmount: 99000,
    status: "listed",
    sellerUserId: 103,
    createdAt: "2026-04-17T09:00:00+09:00",
  },
  {
    id: 4,
    artistId: 2,
    showId: 2,
    showName: "BTS WORLD TOUR 'ARIRANG' IN BUSAN",
    showDate: "2026-06-12T19:00:00+09:00",
    showVenue: "부산아시아드 주경기장",
    section: "VIP",
    zone: "VIP1",
    rowInfo: "2",
    seatNumber: "8",
    faceValue: 220000,
    sellingPrice: 280000,
    sellerTier: "LIGHTNING",
    sellerTradeCount: 12,
    feeAmount: 14000,
    sellerExpectedAmount: 266000,
    status: "listed",
    sellerUserId: 104,
    createdAt: "2026-04-18T11:00:00+09:00",
  },
  {
    id: 5,
    artistId: 2,
    showId: 2,
    showName: "BTS WORLD TOUR 'ARIRANG' IN BUSAN",
    showDate: "2026-06-12T19:00:00+09:00",
    showVenue: "부산아시아드 주경기장",
    section: "R",
    zone: "R5",
    rowInfo: "18",
    seatNumber: "33",
    faceValue: 143000,
    sellingPrice: 165000,
    sellerTier: "THUNDER",
    sellerTradeCount: 5,
    feeAmount: 8250,
    sellerExpectedAmount: 156750,
    status: "listed",
    sellerUserId: 105,
    createdAt: "2026-04-19T08:30:00+09:00",
  },
];

// ── Type helpers ─────────────────────────────────────────

const VALID_TIERS: TierLevel[] = ["LIGHTNING", "THUNDER", "CLOUD", "MIST"];
function toTierLevel(raw: string): TierLevel {
  const upper = raw.toUpperCase() as TierLevel;
  return VALID_TIERS.includes(upper) ? upper : "MIST";
}
function toTransferStatus(raw: string): TransferStatus {
  return raw.toLowerCase() as TransferStatus;
}

function mapPost(item: MockTransferPost): EnrichedTransfer {
  const seatParts = [
    item.rowInfo && `${item.rowInfo}열`,
    item.seatNumber && `${item.seatNumber}번`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    id: String(item.id),
    ticketId: "",
    eventId: String(item.showId),
    sellerId: String(item.sellerUserId),
    sellerTier: toTierLevel(item.sellerTier),
    sellerTransactionCount: item.sellerTradeCount,
    price: item.sellingPrice,
    faceValue: item.faceValue,
    feeAmount: item.feeAmount,
    sellerExpectedAmount: item.sellerExpectedAmount,
    section: item.section,
    zone: item.zone,
    seatInfo: seatParts,
    status: toTransferStatus(item.status),
    createdAt: item.createdAt,
    event: (() => {
      const e = findMockEvent(item.showId);
      return {
        id: String(item.showId),
        artistId: String(item.artistId),
        title: e?.title ?? item.showName,
        venue: e?.venueName ?? item.showVenue,
        dates: [
          {
            id: String(item.showId),
            date: item.showDate,
            bookingWindows: [],
            totalSeats: 0,
            remainingSeats: 0,
          },
        ],
        poster: e?.posterImageUrl ?? "",
        status: "open" as const,
      };
    })(),
  };
}

// ── Exported functions ───────────────────────────────────

export async function getTransferPosts(
  artistId: string | number,
  _userId?: number | string,
): Promise<EnrichedTransfer[]> {
  await delay(400);
  return mockPosts
    .filter((p) => String(p.artistId) === String(artistId))
    .map(mapPost);
}

export async function getTransferPostById(
  id: number | string,
  _userId?: number | string,
): Promise<EnrichedTransfer> {
  await delay(300);
  const item =
    mockPosts.find((p) => String(p.id) === String(id)) ?? mockPosts[0];
  return mapPost(item);
}

export interface ReserveResult {
  postId: number;
  orderId: string;
  paymentId: number;
  sellingPrice: number;
}

export async function reserveTransferPost(
  postId: number | string,
  _artistId: number | string,
  _userId: number | string,
): Promise<ReserveResult> {
  await delay(500);
  const item =
    mockPosts.find((p) => String(p.id) === String(postId)) ?? mockPosts[0];
  return {
    postId: Number(postId),
    orderId: `mock-tf-order-${Date.now()}`,
    paymentId: 2001,
    sellingPrice: item.sellingPrice,
  };
}

export async function confirmTransferPost(
  _orderId: string,
  _paymentKey: string,
  _userId: number | string,
): Promise<void> {
  await delay(400);
}

export interface CreateTransferPostResult {
  id: number;
  sellingPrice: number;
  sellerExpectedAmount: number;
  feeRate: number;
  feeAmount: number;
}

export async function createTransferPost(
  _userId: number | string,
  _artistId: number | string,
  _eventId: number | string,
  _showId: number | string,
  _reservationId: string,
): Promise<CreateTransferPostResult> {
  await delay(500);
  return {
    id: Date.now(),
    sellingPrice: 132000,
    sellerExpectedAmount: 119500,
    feeRate: 0.05,
    feeAmount: 6600,
  };
}

export async function updateTransferPost(
  _id: number | string,
  _userId: number | string,
  _sellingPrice: number,
): Promise<void> {
  await delay(300);
}

export async function deleteTransferPost(
  _id: number | string,
  _userId: number | string,
): Promise<void> {
  await delay(300);
}
