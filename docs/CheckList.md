# Portfolio Mode 전환 — 작업 체크리스트

> API 연동 제거 → mock 데이터 기반 포폴 데모 전환
> TanStack Query 구조 유지, 게스트 로그인 버튼 추가

---

## Step 1. Mock 유틸 생성
- [x] `src/shared/lib/mockDelay.ts` — `delay()` 함수 생성

---

## Step 2. Auth 레이어 단순화
- [x] `src/features/auth/api/me.ts` — token 없으면 throw, 있으면 mockAuthUser 반환
- [x] `src/features/auth/api/login.ts` — mock AuthResponseData 반환
- [x] `src/features/auth/api/reissue.ts` — null 반환
- [x] `src/features/auth/ui/AuthInitializer.tsx` — reissueToken 제거, 즉시 ready
- [x] `src/features/auth/onboarding/ui/AuthStep.tsx` — onGuestLogin prop + 버튼 추가
- [x] `src/widgets/auth/OnboardingWidget.tsx` — guest handler 추가, reissueToken 제거
- [x] `src/widgets/layout/LayoutShell.tsx` — isError redirect /landing → /onboarding

---

## Step 3. Home API Mock
- [x] `src/features/home/api/getHome.ts`

---

## Step 4. Artist API Mock
- [x] `src/features/artist/api/getArtists.ts`
- [x] `src/features/artist/api/getArtist.ts`
- [x] `src/features/artist/api/followArtist.ts`
- [x] `src/features/artist/api/unfollowArtist.ts`

---

## Step 5. Event API Mock
- [x] `src/features/event/api/getEvents.ts`
- [x] `src/features/event/api/getEventDetail.ts`
- [x] `src/features/event/api/getArtistEvents.ts`

---

## Step 6. Show API Mock
- [x] `src/features/show/api/getShows.ts`
- [x] `src/features/show/api/getShowDetail.ts`
- [x] `src/features/show/api/getSections.ts`
- [x] `src/features/show/api/getShowSeats.ts`

---

## Step 7. Booking API Mock
- [x] `src/features/booking/api/queue.ts` — 카운트다운 시뮬레이션
- [x] `src/features/booking/api/getBookingWindows.ts`
- [x] `src/features/booking/api/getSeatsSummary.ts`
- [x] `src/features/booking/api/getSeatsAvailability.ts`
- [x] `src/features/booking/api/bookTicket.ts`
- [x] `src/features/booking/api/confirmReservation.ts`
- [x] `src/features/booking/api/cancelReservation.ts`
- [x] `src/features/booking/api/releaseReservation.ts`

---

## Step 8. Membership API Mock
- [x] `src/features/membership/api/getMemberships.ts`
- [x] `src/features/membership/api/getMembershipPolicies.ts`
- [x] `src/features/membership/api/getPresalePolicy.ts`
- [x] `src/features/membership/api/subscribeMembership.ts`
- [x] `src/features/membership/api/cancelMembership.ts`
- [x] `src/features/membership/api/updateNickname.ts`

---

## Step 9. Payment API Mock
- [x] `src/features/payment/api/confirmPayment.ts`
- [x] `src/features/payment/api/createPaymentRecord.ts`

---

## Step 10. Transfer API Mock
- [x] `src/features/transfer/api/getTransferPosts.ts`
- [x] `src/features/transfer/api/getMyTransfers.ts`

---

## Step 11. Reservation API Mock
- [x] `src/features/reservation/api/getMyReservations.ts`

---

## Step 12. 빌드 검증
- [x] `npm run build` — 타입 오류 0개, 63페이지 빌드 성공

---

## Step 13. 동작 확인
- [ ] `/onboarding` → 게스트 버튼 → 홈 이동
- [ ] 홈 페이지 데이터 로딩
- [ ] 아티스트 상세 → 공연 탭
- [ ] 예매 플로우: 대기열(~10s) → 좌석 선택 → 결제 → 완료
- [ ] 멤버십 페이지 구독/해지
- [ ] 마이페이지 티켓 월렛, 양도 내역
- [ ] 새로고침 후 로그인 상태 유지
