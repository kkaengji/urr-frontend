'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ArtistSelectStep,
  MembershipIntroStep,
  MembershipPaymentStep,
  MembershipProfileStep,
  MembershipCompleteStep,
  useMemberships,
} from '@/features/membership'
import { useArtists } from '@/features/artist'
import type { Artist, TierLevel } from '@/shared/types'

type Step = 'select' | 'intro' | 'payment' | 'profile' | 'complete'

export function MembershipWidget() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('select')
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [membershipId] = useState<string | null>(null)
  const [profileData, setProfileData] = useState<{ nickname: string; tier: TierLevel } | null>(null)
  const { data: memberships = [] } = useMemberships()
  const { data: artists = [] } = useArtists()

  // reset=1 파라미터가 있으면 select 단계로 초기화 (사이드바에서 재진입 시)
  useEffect(() => {
    if (!searchParams.get('reset')) return
    queueMicrotask(() => {
      setStep('select')
      setSelectedArtist(null)
      window.history.replaceState({}, '', '/membership')
    })
  }, [searchParams])

  // If artistId is provided via query param, skip to intro step
  useEffect(() => {
    const artistId = searchParams.get('artistId')
    if (artistId) {
      const artist = artists.find((a) => a.id === artistId)
      if (artist) {
        const t = setTimeout(() => {
          setSelectedArtist(artist)
          setStep('intro')
        }, 0)
        return () => clearTimeout(t)
      }
    }
  }, [searchParams, artists])

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist)
    setStep('intro')
  }

  const handleBack = () => {
    if (step === 'intro') {
      setStep('select')
      setSelectedArtist(null)
    } else if (step === 'payment') {
      setStep('intro')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {step === 'select' && (
        <ArtistSelectStep
          artists={artists}
          memberships={memberships}
          onSelect={handleSelectArtist}
        />
      )}

      {step === 'intro' && selectedArtist && (
        <MembershipIntroStep
          artist={selectedArtist}
          onBack={handleBack}
          onSubscribe={() => setStep('payment')}
        />
      )}

      {step === 'payment' && selectedArtist && (
        <MembershipPaymentStep
          artist={selectedArtist}
          onBack={handleBack}
          onComplete={() => setStep('profile')}
        />
      )}

      {step === 'profile' && selectedArtist && (
        <MembershipProfileStep
          artist={selectedArtist}
          membershipId={membershipId}
          onComplete={(data) => {
            setProfileData({ nickname: data.nickname, tier: data.tier })
            setStep('complete')
          }}
        />
      )}

      {step === 'complete' && selectedArtist && (
        <MembershipCompleteStep
          artist={selectedArtist}
          nickname={profileData?.nickname ?? ''}
          tier={profileData?.tier ?? 'CLOUD'}
        />
      )}
    </div>
  )
}
