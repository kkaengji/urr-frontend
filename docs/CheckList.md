# URR 포트폴리오 — 완성 체크리스트

## 개요

포트폴리오 전환 목표: 백엔드 없이 mock 데이터로 모든 플로우가 완성된 상태로 Vercel 배포.

---

## 1. Mock 전환

### Auth API
- [x] `login.ts` — mock 토큰 반환
- [x] `logout.ts` — mock delay
- [x] `register.ts` — mock 토큰·유저 반환
- [x] `me.ts` — mockUser 반환
- [x] `updateConsents.ts` — mock delay
- [x] `updateName.ts` — mock delay
- [x] `useLogout.ts` — tokenStore 클리어 + `/landing` 리다이렉트

### Mock 데이터
- [x] `src/shared/lib/mocks/events.ts` — 18개 이벤트
- [x] `src/shared/lib/mocks/artists.ts` — 5개 아티스트
- [x] `src/shared/lib/mocks/user.ts` — mockUser (라이트닝 등급)
- [x] `src/features/show/api/getShows.ts` — show/session mock

---

## 2. 페이지 완성도

- [x] 랜딩 (`/landing`)
- [x] 홈 (`/`)
- [x] 이벤트 목록 (`/events`)
- [x] 이벤트 상세 (`/events/:id`)
- [x] 아티스트 목록 (`/artists`)
- [x] 아티스트 상세 (`/artists/:id`) — 멤버십 게이트 포함
- [x] 예매 (`/events/:id/booking`) — concert/fanmeeting 기본 플로우
- [x] 예매 완료 (`/booking/complete`)
- [x] 멤버십 가입 (`/membership`)
- [x] 마이페이지 (`/my-page`) — 멤버십·티켓월렛·양도내역·설정 탭
- [x] 온보딩 (`/onboarding`)
- [x] 검색 (`/search`)
- [x] 알림 (`/notifications`)
- [ ] 양도 상세 (`/transfer/:artistId/:listingId`) — 플로우 완성도 확인 필요

---

## 3. 예매 플로우 분기 — 신규 구현

| 플로우 타입 | 대상 카테고리 | 흐름 |
|---|---|---|
| `seat-map` | concert, fanmeeting, domestic | 현행 유지 |
| `zone` | festival | 구역 카드 → 수량 선택 |
| `performance` | musical, etc | 회차 달력 → 등급 선택 → 결제 |

### Phase 1 — 공통 유틸
- [x] `BookingFlowType` 타입 추가 (`src/shared/types/index.ts`)
- [x] `getBookingFlowType(category)` 유틸 작성 (`src/features/booking/model/bookingFlowUtils.ts`)
- [x] `BookingContext`에 `flowType` 노출 (`src/features/booking/model/BookingContext.tsx`)

### Phase 2 — 페스티벌 구역 선택형 (`zone`)
- [x] `ZoneCard.tsx` 작성 (`src/widgets/booking/`)
- [x] `ZoneSelectView.tsx` 작성 (`src/widgets/booking/`)
- [x] `RightMain.tsx` — `zone` 분기 추가
- [x] `useBookingStore` — zone 선택 후 `payment` 직행 전이
- [x] PEAK FESTIVAL (eventId 18) / Weverse Con (10) / 서울파크뮤직 (11) mock에 shows 추가

### Phase 3 — 뮤지컬/전시 회차 선택형 (`performance`)
- [x] `PerformanceScheduleView.tsx` 작성 (`src/widgets/booking/`)
- [x] `GradePicker.tsx` 작성 (`src/widgets/booking/`)
- [x] `RightMain.tsx` — `performance` 분기 추가
- [x] `LeftPanel.tsx` — musical/etc 날짜 선택기 조건부 숨김
- [x] 킹키부츠(14), 김종욱찾기(16), 아라리오뮤지엄(17) mock에 회차·등급 구조 추가

### Phase 4 — 결제 플로우 변형
- [x] `PaymentView.tsx` — `performance` 타입 수령 방법 선택 추가 (모바일티켓 / 현장수령)
- [x] `ConfirmationView.tsx` — 수령 방법 표시 분기
- [x] 데모 모드: Toss 키 없을 시 결제 없이 confirmation으로 바로 전이

### Phase 5 — 검증
- [ ] concert 플로우: event 1 (IU Golden Hour) 전체 흐름 확인
- [ ] festival 플로우: event 18 (PEAK FESTIVAL) 전체 흐름 확인
- [ ] musical 플로우: event 14 (킹키부츠) 전체 흐름 확인
- [ ] etc 플로우: event 17 (아라리오뮤지엄) 전체 흐름 확인

---

## 4. 배포 준비

- [x] `npm run build` 오류 없음 확인
- [ ] Vercel 배포 및 도메인 설정
- [ ] README `docs/screenshots/` 스크린샷 추가
- [ ] README 데모 URL 업데이트
