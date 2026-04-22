import { delay } from "@/shared/lib/mockDelay";

// --- VWR (Tier 1) ---

export interface VwrAssignData {
  requestId: string;
  position: number;
  estimatedWait: number;
}

export interface VwrCheckData {
  admitted: boolean;
  token?: string;
  position: number;
  servingCounter: number;
  totalInQueue: number;
  currentlyWaiting?: number;
  ahead: number;
  estimatedWait?: number;
  nextPoll?: number;
}

export async function vwrAssign(_eventId: string | number): Promise<VwrAssignData> {
  await delay(400);
  return { requestId: "mock-vwr-req", position: 1, estimatedWait: 0 };
}

export async function vwrCheck(_eventId: string | number, _requestId: string): Promise<VwrCheckData> {
  await delay(300);
  return {
    admitted: true,
    token: "mock-vwr-token",
    position: 0,
    servingCounter: 1,
    totalInQueue: 8,
    currentlyWaiting: 0,
    ahead: 0,
    estimatedWait: 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setEntryTokenCookie(_token: string): void {
  // no-op for demo
}

// --- Queue (Tier 2) ---

export interface QueueEntryData {
  userId: number | null;
  showId: number | null;
  status: "ACTIVE" | "WAIT";
  rank: number | null;
  total: number | null;
  waitTime: number | null;
}

export interface QueuePollData {
  userId: number | null;
  showId: number | null;
  status: "ACTIVE" | "WAIT" | "NOT_WAIT";
  rank: number | null;
  total: number | null;
  waitTime: number | null;
  token: string | null;
  remainMs: number | null;
}

let _rank = 8;

export async function checkQueue(showId: string | number): Promise<QueueEntryData> {
  await delay(400);
  _rank = 8;
  return { userId: 1, showId: Number(showId), status: "WAIT", rank: _rank, total: 1200, waitTime: 80 };
}

export async function pollQueue(showId: string | number): Promise<QueuePollData> {
  await delay(2000);
  _rank = Math.max(0, _rank - (Math.floor(Math.random() * 3) + 2));
  if (_rank <= 0) {
    return {
      userId: 1, showId: Number(showId),
      status: "ACTIVE", rank: 0, total: 1200,
      waitTime: 0, token: "mock-queue-token", remainMs: 180000,
    };
  }
  return {
    userId: 1, showId: Number(showId),
    status: "WAIT", rank: _rank, total: Math.max(_rank, 1000),
    waitTime: _rank * 10, token: null, remainMs: null,
  };
}
