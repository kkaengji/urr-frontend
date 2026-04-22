import { delay } from "@/shared/lib/mockDelay";
import type { Membership } from "@/shared/types";

export async function getMemberships(_userId: number): Promise<Membership[]> {
  await delay(350);
  return [
    {
      id: "1", artistId: "1", artistName: "G-Dragon",
      tier: "LIGHTNING", nickname: "김우르",
      membershipNumber: "URR-0001", joinedAt: "2026-01-01", expiresAt: "2026-12-31",
      isActive: true, tierProgress: { current: 92, required: 100 },
    },
    {
      id: "2", artistId: "2", artistName: "BTS",
      tier: "THUNDER", nickname: "김우르",
      membershipNumber: "URR-0002", joinedAt: "2026-02-01", expiresAt: "2026-06-30",
      isActive: true, tierProgress: { current: 74, required: 100 },
    },
    {
      id: "3", artistId: "3", artistName: "aespa",
      tier: "CLOUD", nickname: "김우르",
      membershipNumber: "URR-0003", joinedAt: "2026-03-15", expiresAt: "2026-09-15",
      isActive: true, tierProgress: { current: 45, required: 100 },
    },
    {
      id: "4", artistId: "4", artistName: "IVE",
      tier: "MIST", nickname: "김우르",
      membershipNumber: "URR-0004", joinedAt: "2026-04-01", expiresAt: "2026-08-10",
      isActive: true, tierProgress: { current: 10, required: 100 },
    },
  ];
}
