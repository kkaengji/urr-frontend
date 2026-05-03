"use client";

import { ArrowLeft, Crown, Zap, CloudLightning, Cloud } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { TierBadge } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import type { Artist, TierLevel } from "@/shared/types";
import { getMembershipPolicies } from "../api/getMembershipPolicies";

interface MembershipIntroStepProps {
  artist: Artist;
  onBack: () => void;
  onSubscribe: () => void;
}

const TIER_ORDER: TierLevel[] = ["LIGHTNING", "THUNDER", "CLOUD", "MIST"];

const TIER_OPEN_LABEL: Record<TierLevel, string> = {
  LIGHTNING: "일반 오픈 2일 전 +1시간",
  THUNDER: "일반 오픈 2일 전",
  CLOUD: "일반 오픈 1시간 전",
  MIST: "일반 오픈 시점",
};

const TIER_TRANSFER_FEE_LABEL: Record<TierLevel, string> = {
  LIGHTNING: "5%",
  THUNDER: "5%",
  CLOUD: "10%",
  MIST: "불가",
};

export function MembershipIntroStep({
  artist,
  onBack,
  onSubscribe,
}: MembershipIntroStepProps) {
  const { data: policies } = useQuery({
    queryKey: ["membershipPolicies", artist.id],
    queryFn: () => getMembershipPolicies(artist.id),
  });

  const policyMap = Object.fromEntries(
    (policies ?? []).map((p) => [p.tier, p]),
  ) as Partial<
    Record<
      TierLevel,
      import("../api/getMembershipPolicies").MembershipTierPolicy
    >
  >;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          돌아가기
        </button>
        <div className="flex items-center gap-4">
          <Avatar className="size-14 shrink-0">
            <AvatarImage src={artist.avatar} alt={artist.name} />
            <AvatarFallback className="text-lg font-bold bg-muted">
              {artist.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{artist.name} 멤버십</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              멤버십 혜택을 확인하고 가입하세요
            </p>
          </div>
        </div>
      </div>

      {/* Benefits intro */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-primary" />
          <h2 className="text-lg font-bold">멤버십 혜택</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {artist.name} 멤버십에 가입하면 선예매 우선권, 양도 마켓 이용, 전용
          굿즈 구매 등 다양한 혜택을 누릴 수 있습니다. 가입 시 클라우드 등급으로
          시작하며, 멜론 연동을 통해 더 높은 등급을 받을 수 있습니다.
        </p>
      </div>

      {/* Tier comparison table */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold">티어별 혜택 비교</h2>
          <p className="text-xs text-muted-foreground">
            티어가 높을수록 더 빠르게 예매가 시작됩니다
          </p>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">티어</th>
                <th className="text-left px-4 py-3 font-semibold">예매 오픈</th>
                <th className="text-left px-4 py-3 font-semibold">
                  예매 수수료
                </th>
                <th className="text-left px-4 py-3 font-semibold">
                  양도 수수료
                </th>
              </tr>
            </thead>
            <tbody>
              {TIER_ORDER.map((tier, idx) => {
                const policy = policyMap[tier];
                return (
                  <tr
                    key={tier}
                    className={cn(idx > 0 && "border-t border-border")}
                  >
                    <td className="px-4 py-3">
                      <TierBadge tier={tier} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {TIER_OPEN_LABEL[tier]}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {policy
                        ? policy.bookingFeeWon === 0
                          ? "없음"
                          : `+${policy.bookingFeeWon.toLocaleString()}원`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {policy
                        ? policy.transferFeeRate != null
                          ? `${Math.round(policy.transferFeeRate * 100)}%`
                          : TIER_TRANSFER_FEE_LABEL[tier]
                        : TIER_TRANSFER_FEE_LABEL[tier]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground px-1">
          ※ 모든 티어는 동일한 티켓을 구매할 수 있으며, 예매 시작 시점만 차등 적용됩니다.
        </p>
      </div>

      {/* Expected tier preview */}
      <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
        <p className="text-sm font-semibold">가입 후 예상 등급</p>
        <div className="flex items-center gap-3">
          {/* 기본: 클라우드 */}
          <div className="flex-1 rounded-lg border border-border bg-background p-3 text-center space-y-1.5">
            <Cloud size={20} className="mx-auto text-tier-cloud" />
            <p className="text-xs font-medium">클라우드</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">가입 즉시<br />기본 부여</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-xs">멜론</span>
            <span className="text-lg leading-none">→</span>
            <span className="text-xs">연동 시</span>
          </div>
          {/* 연동 후: 썬더 or 라이트닝 */}
          <div className="flex-1 rounded-lg border border-border bg-background p-3 text-center space-y-1.5">
            <div className="flex justify-center gap-1">
              <CloudLightning size={20} className="text-tier-thunder" />
              <Zap size={20} className="text-tier-lightning" />
            </div>
            <p className="text-xs font-medium">썬더 / 라이트닝</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">팬 신뢰 점수에<br />따라 자동 승급</p>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          * 팬 신뢰 점수 66점 이상 → 썬더, 85점 이상 → 라이트닝. 연동은 가입 후 프로필 설정에서도 가능합니다.
        </p>
      </div>

      {/* Price + CTA */}
      <div className="rounded-xl border border-primary/20 bg-primary/3 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">멤버십 가격</p>
            <p className="text-2xl font-bold mt-0.5">
              30,000원
              <span className="text-sm font-normal text-muted-foreground">
                /년
              </span>
            </p>
          </div>
          <Button size="lg" className="gap-2" onClick={onSubscribe}>
            <Crown size={16} />
            가입하기
          </Button>
        </div>
      </div>
    </div>
  );
}
