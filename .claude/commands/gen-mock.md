# Mock 데이터 자동 생성

`public/artists/` 폴더 구조와 각 아티스트의 `events/info.md`를 읽어
아래 6개 mock 파일을 최신 상태로 업데이트합니다.

---

## 1단계 — 폴더 스캔

`public/artists/` 하위 숫자 폴더(1, 2, 3 …)를 전부 나열합니다.
각 폴더에서 다음 파일의 **존재 여부와 정확한 파일명**을 확인합니다.

| 역할 | 경로 패턴 |
|------|-----------|
| 프로필 이미지 | `profile.{jpg,jpeg,png}` |
| 배너 이미지 | `banner.{jpg,jpeg,png}` |
| 공연 포스터 (목록/헤더) | `events/poster.{jpg,jpeg,png,gif}` |
| 공연 상세 설명 이미지 | `events/detail-info.{jpg,jpeg,png}` |
| 공연 정보 텍스트 | `events/info.md` |
| 커뮤니티 이미지 | `community/post-*.{jpg,jpeg,png}` |

---

## 2단계 — info.md 파싱

`events/info.md`가 존재하는 아티스트에 대해 다음 정보를 추출합니다.

### 추출 항목
- **공연 제목**: 첫 번째 비어있지 않은 줄
- **아티스트명**: 공연 제목에서 추론하거나 폴더 정보와 매핑
- **장소**: `장소` 키워드 다음 줄 (괄호 앞까지)
- **공연 기간**: `공연기간` 다음 줄에서 `YYYY.MM.DD` 형식 날짜 2개 추출
- **공연 시간**: `공연시간` 다음 줄 또는 `공연시간 정보` 섹션의 회차별 시간
- **관람 연령**: `관람연령` 다음 줄
- **티켓 가격/구역**: `가격` 섹션에서 구역명 + 금액 추출
- **공지사항**: `공지사항` 이후 `※` 로 시작하는 항목들

---

## 3단계 — 업데이트할 파일 목록

아래 파일들을 순서대로 업데이트합니다.
각 파일을 먼저 Read로 읽고, 기존 구조를 유지하면서 데이터만 교체합니다.

### `src/shared/lib/mocks/artists.ts`
- `mockArtists` 배열: info.md가 있는 아티스트 ID별로 엔트리 추가/수정
- 이미지 경로는 스캔한 실제 파일명 사용
- info.md가 없으면 profileImageUrl, bannerImageUrl만 반영

### `src/features/event/api/getEvents.ts`
- `mockEventSummaries` 배열: info.md 기반으로 각 이벤트 수정
  - `posterImageUrl`: `events/poster.*` 경로
  - `title`, `venueTemplateName`, `venueAddress`, `openDate`, `endDate`
  - artistId는 폴더 번호와 일치
- info.md 없는 아티스트는 `posterImageUrl` 제거 (null/undefined)

### `src/features/event/api/getEventDetail.ts`
- `mockEventDetails` 맵: info.md 기반으로 각 이벤트 상세 수정
  - `posterImageUrl`: `events/detail-info.*` 경로 (상세 설명 이미지)
  - `performanceDescription`: info.md의 공지사항을 `notices` 배열에 반영
  - `sections`: 가격 정보에서 구역명·금액 추출

### `src/features/show/api/getShows.ts`
- `showsByEvent` 맵: info.md에서 파싱한 회차별 날짜·시간으로 수정
  - 회차 수는 공연 기간에서 날짜 수로 결정
  - `startAt`, `endAt`: 날짜 + 파싱한 시작 시간으로 구성 (endAt = startAt + 2~3h)
  - `saleOpenAt`: 공지사항에서 선예매/일반예매 날짜 추출, 없으면 openDate 기준 2주 전

### `src/features/home/api/getHome.ts`
- `mockRanking`: info.md가 있는 이벤트 중 상위 5개 유지
- `mockTrending`: info.md가 있는 이벤트 4개
- `mockPresale`: info.md에서 선예매 일정이 파악된 이벤트로 구성

---

## 4단계 — 이미지 경로 규칙

```
/artists/{id}/profile.{ext}          → profileImageUrl
/artists/{id}/banner.{ext}           → bannerImageUrl
/artists/{id}/events/poster.{ext}    → posterImageUrl (목록·헤더)
/artists/{id}/events/detail-info.{ext} → 이벤트 상세 페이지의 performanceDescription 이미지
/artists/{id}/community/post-*.{ext} → 커뮤니티 포스트 이미지
```

파일이 존재하지 않으면 해당 필드를 `""` 또는 `undefined`로 설정합니다.
절대 존재하지 않는 경로를 string으로 하드코딩하지 않습니다.

---

## 5단계 — 완료 검증

모든 파일 수정 후 반드시 `npm run build`를 실행해 타입 오류가 없음을 확인합니다.
오류 발생 시 해당 파일만 수정하고 재빌드합니다.

---

## 주의사항

- 기존 `bookingWindows` 상수(LIGHTNING/THUNDER/CLOUD/MIST)는 그대로 유지
- `generateFallback`, `generateShows` 같은 폴백 함수는 삭제하지 않음
- artistId는 폴더 번호와 반드시 일치시킬 것
- G-Dragon 같이 현재 images/info.md가 없는 아티스트는 artistId를 99 이상으로 유지
- 빌드 검증은 항상 `npm run build` (npx tsc 사용 금지)
