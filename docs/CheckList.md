# 이벤트 유형별 예매 플로우 분기 — 구현 체크리스트

## 개요

공연 유형에 따라 예매 플로우를 3가지로 분기한다.

| 플로우 타입 | 대상 카테고리 | 흐름 |
|------------|-------------|------|
| 좌석 선택형 (`seat-map`) | concert, fanmeeting, domestic | 현행 유지 (구역 → 개별 좌석 선택) |
| 구역 선택형 (`zone`) | festival | 구역 카드 → 수량 선택 (배치도 없음) |
| 회차 선택형 (`performance`) | musical, etc | 회차 달력 → 등급 선택 → 결제 |

---

## Phase 1 — 공통 유틸

- [ ] `BookingFlowType` 타입 추가 (`src/shared/types/index.ts`)
- [ ] `getBookingFlowType(category)` 유틸 신규 작성 (`src/features/booking/model/bookingFlowUtils.ts`)
- [ ] `BookingContext`에 `flowType` 노출 (`src/features/booking/model/BookingContext.tsx`)

---

## Phase 2 — 페스티벌 구역 선택형

- [ ] `ZoneCard.tsx` 컴포넌트 작성 (`src/widgets/booking/`)
- [ ] `ZoneSelectView.tsx` 컴포넌트 작성 (`src/widgets/booking/`)
- [ ] `RightMain.tsx` — `zone` 분기 추가
- [ ] `useBookingStore` — zone 선택 후 `seats-individual` 스킵, `payment` 직행 전이
- [ ] PEAK FESTIVAL (event 8) mock 데이터에 zone 구조 추가 (`src/features/event/api/getEventDetail.ts`)

---

## Phase 3 — 뮤지컬/전시 회차 선택형

- [ ] `PerformanceScheduleView.tsx` 작성 (`src/widgets/booking/`)
- [ ] `GradePicker.tsx` 작성 (`src/widgets/booking/`)
- [ ] `RightMain.tsx` — `performance` 분기 추가
- [ ] `LeftPanel.tsx` — musical/etc일 때 날짜 선택기 조건부 숨김
- [ ] 킹키부츠(event 4), 김종욱찾기(event 6), 아라리오뮤지엄(event 7) mock에 회차·등급 구조 추가

---

## Phase 4 — 결제 플로우 변형

- [ ] `PaymentView.tsx` — `performance` 타입에 수령 방법 선택 추가 (모바일티켓 / 현장수령)
- [ ] `ConfirmationView.tsx` — 수령 방법 표시 분기

---

## Phase 5 — 검증

- [ ] concert 플로우: event 1 (Weverse Con) 예매 전체 흐름 확인
- [ ] festival 플로우: event 8 (PEAK FESTIVAL) 예매 전체 흐름 확인
- [ ] musical 플로우: event 4 (킹키부츠) 예매 전체 흐름 확인
- [ ] etc 플로우: event 7 (아라리오뮤지엄) 예매 전체 흐름 확인
- [ ] `npm run build` 오류 없음 확인
