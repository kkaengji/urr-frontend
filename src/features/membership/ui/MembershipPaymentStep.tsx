'use client'

import { PaymentDialog } from '@/shared/ui/PaymentDialog'
import type { Artist } from '@/shared/types'

const MEMBERSHIP_FEE = 30000

interface MembershipPaymentStepProps {
  artist: Artist
  onBack: () => void
  onComplete: () => void
}

export function MembershipPaymentStep({ artist, onBack, onComplete }: MembershipPaymentStepProps) {
  return (
    <PaymentDialog
      open
      title={`${artist.name} 멤버십 결제`}
      orderDescription={`${artist.name} 멤버십 (1년)`}
      orderItems={[
        { label: '멤버십 연회비', amount: MEMBERSHIP_FEE },
      ]}
      totalAmount={MEMBERSHIP_FEE}
      onComplete={onComplete}
      onCancel={onBack}
    />
  )
}
