# URR (우르르) — AI 작업 가이드

## 프로젝트 컨텍스트

K-POP 찐팬을 위한 공정 티켓팅 플랫폼. 티켓팅 → 양도 → 커뮤니티를 하나의 생태계로 연결.
매크로·봇 차단, 멤버십 등급으로 팬 활동을 정량화해 티켓 우선권 부여.

### 프로젝트 이력

원래 팀 협업 프로젝트로, 프론트엔드(Next.js) + 백엔드(Spring Boot) + 인프라(AWS EKS/S3/CloudFront)를 함께 운영했다.
포트폴리오 전환 이후 인프라 비용 문제로 백엔드 서버를 종료하고, **프론트엔드만 Vercel에 배포**하는 구조로 변경했다.
협업 당시 일정·합의 제약으로 미뤄뒀던 디자인·UX 개선도 이 단계에서 함께 진행한다.

> 원본 협업 레포지토리는 별도로 존재하며, 이 레포는 **프론트엔드 단독 포트폴리오 버전**이다.

### 데모 모드 원칙

- **모든 데이터는 mock** — 실제 API 호출 없음. `src/shared/lib/mocks/`가 단일 데이터 소스.
- **플로우는 항상 성공 케이스** — 에러 처리보다 정상 시나리오 완성도 우선.
- **인증은 mock** — 로그인 시 mock 유저로 바로 진입, JWT/토큰 없음.
- **이미 API 연동된 코드가 있다면** — mock 데이터를 반환하도록 교체하고, TanStack Query는 유지 (캐싱 구조 보여주기 위함).
- **디자인·UX 개선 허용** — 협업 시 변경 못했던 부분은 판단해서 개선 가능. 단, 변경 시 이유를 명확히 한다.

---

## 기술 스택

| 분야         | 기술                      | 비고                    |
| ------------ | ------------------------- | ----------------------- |
| Framework    | Next.js 16 (App Router)   | 서버/클라이언트 통합    |
| Language     | TypeScript (strict)       |                         |
| Styling      | Tailwind CSS v4           | utility-first           |
| UI           | shadcn/ui (Radix UI 기반) | `src/shared/ui/`에 보관 |
| Server State | TanStack Query v5         | mock 데이터 캐싱/조회   |
| Client State | Zustand                   | 최소한만 사용           |

```bash
npm run dev    # 개발 서버
npm run build  # 빌드 검증
```

### 상태 관리 기준

| 상황                             | 사용                 |
| -------------------------------- | -------------------- |
| 목록/상세 데이터 조회            | `useQuery` + mock    |
| 예매·양도 등 액션                | `useMutation` + mock |
| 모달/탭 등 UI 상태               | `useState`           |
| 예매 상태머신 등 멀티스텝 플로우 | `Zustand`            |

- API 함수(`features/<domain>/api/`)는 유지하되, 내부에서 실제 fetch 대신 mock 데이터를 반환하도록 구현
- `useState + useEffect` 직접 fetch 패턴 금지 — TanStack Query 구조 유지

### 인증 (Mock)

- 실제 JWT 없음. `src/shared/lib/mocks/user.ts`의 `mockUser`가 항상 로그인된 유저.
- 로그인 플로우: 폼 제출 → mock 딜레이 → mockUser로 세션 설정 → 리다이렉트
- `is_authenticated` 쿠키 불필요. 인증 상태는 Zustand 또는 Context로 관리.
- `src/shared/api/` (client.ts, interceptor.ts, tokenStore.ts)는 건드리지 않아도 됨 — 연동 해제된 상태로 유지.

---

## 파일 구조 — FSD (Feature-Sliced Design)

```
src/
├── app/       # Next.js App Router (라우팅 진입점만, 로직 없음)
├── widgets/   # 페이지를 구성하는 큰 UI 블록 (여러 feature 조합)
├── features/  # 단일 사용자 행동 단위 (독립적, 타 feature 의존 금지)
├── entities/  # 도메인 타입 + 관련 UI 카드/배지 (비즈니스 로직 없음)
└── shared/    # 전역 공용 코드 (api/, lib/, ui/)
```

**레이어 규칙**: `app → widgets → features → entities → shared` (상위→하위만 import)

**feature 내부**: `ui/` (PascalCase.tsx) / `model/` (useXxx.ts) / `api/` (camelCase.ts) / `index.ts`

**파일 네이밍**: 컴포넌트 `PascalCase.tsx` / 훅·유틸·api `camelCase.ts` / shadcn `lowercase.tsx` / barrel `index.ts`

---

## 주요 라우트 & 페이지

| URL                              | 페이지             | 비고                                 |
| -------------------------------- | ------------------ | ------------------------------------ |
| `/`                              | HomePage           | 배너·인기아티스트·공연랭킹·선예매    |
| `/artists` / `/artists/:id`      | ArtistPage         | 홈/소통/공연/양도 탭 (멤버십 게이트) |
| `/events` / `/events/:id`        | EventDetailPage    | 공연 목록 / 상세                     |
| `/events/:id/booking`            | BookingPage        | 예매 2-Panel, 풀스크린 레이아웃      |
| `/membership`                    | MembershipPage     | 4단계 가입 플로우                    |
| `/my-page`                       | MyPage             | 멤버십/티켓 월렛/양도 내역           |
| `/onboarding`                    | OnboardingPage     | 회원가입·로그인 (사이드바 없음)      |
| `/search`                        | SearchPage         | 아티스트+공연 통합 검색              |
| `/transfer/:artistId/:listingId` | TransferDetailPage | 양도 상세                            |

**LayoutShell 예외**: `/onboarding`, `/auth/callback` → 사이드바/TopBar 없음 / `/events/:id/booking` → 풀스크린 (Footer/스크롤 없음)

---

## 핵심 비즈니스 로직

### 멤버십 등급

| 등급        | Lv. | 조건              | 예매 창       | 예매 수수료 | 양도 수수료 |
| ----------- | --- | ----------------- | ------------- | ----------- | ----------- |
| 🌩️ 라이트닝 | 4   | 팬 신뢰 점수 ≥ 85 | 선예매 1순위  | 없음        | 5%          |
| ⚡ 썬더     | 3   | 66–84점           | 2순위 (+1h)   | +₩3,000     | 5%          |
| ☁️ 클라우드 | 2   | 멤버십 가입 즉시  | 3순위 (+1day) | +₩5,000     | 10%         |
| 🌫️ 미스트   | 1   | 회원가입 즉시     | 일반예매만    | +₩8,000     | 양도불가    |

- 양도 게시판: 클라우드 이상만 접근 / 구매: 해당 아티스트 멤버십 보유자만
- 멤버십 게이트: 아티스트 홈 탭은 누구나, 공연/양도 탭은 멤버십 전용
- **데모**: mockUser는 기본적으로 라이트닝 등급 + 전 아티스트 멤버십 보유 → 모든 플로우 접근 가능

### 예매 상태머신

```
idle → queue → seats-section → seats-individual → payment → confirmation
                                     ↓ (3분 타임아웃)    ↘ payment-failed (60s 재시도)
                               seats-expired → seats-section 복귀
```

- **데모**: 타임아웃은 UI 표시용으로만 동작. 실제 만료 처리는 선택적으로 구현.

### 양도 마켓

- 가격 범위: 정가의 0.5x ~ 1.5x / 에스크로 방식 / 클라우드 이상만 접근
- **데모**: 양도 거래는 mock mutation으로 성공 처리

---

## 디자인 시스템

> 상세 스펙 → `docs/designsystem.md`

**원칙**: Border over Shadow / Selective Color / Light only / Desktop only  
**주요 색상**: `bg-primary` #FF5E32 / `bg-secondary` #1F2792 / `bg-accent` #F2F0E6  
**티어 클래스**: `text-tier-{lightning|thunder|cloud|mist}` / `bg-tier-{...}-bg`  
**폰트**: Pretendard Variable (`font-sans`) / JetBrains Mono (`font-mono`, 타이머 전용)  
**로고**: `public/logos/logo5.svg`

---

## ⚠️ 디자인 변경 금지 원칙

> 신규 페이지 추가 시 `URR-v2` 디자인 참조할 때만 해당.

- 원본(`URR-v2`) 참조 시 디자인 1:1 유지
- Tailwind 클래스 임의 교체 금지 (예: `hover:bg-[#F3F2F0]` → `hover:bg-accent` 변환 금지)
- 섹션 제목, 폰트 크기, 간격, 색상, 레이아웃 Claude 판단으로 변경 금지
- **예외 허용**: React Router → Next.js Link/useRouter, `import 이미지` → `/파일명` 문자열

---

## 작업 완료 체크리스트

1. pre-commit 훅 통과 (ESLint + `tsc --noEmit` 자동 실행)
2. `npm run build` 빌드 오류 없음 확인

---

## 참고 문서

- `docs/designsystem.md` — 색상 토큰, 컴포넌트 스펙, 애니메이션
- `docs/user_flow.md` — 유저 플로우, 비즈니스 로직, 엣지 케이스
- `docs/PRD.md` — 비즈니스 규칙 원본
- `docs/ARCHITECTURE.md` — FSD 레이어 규칙, 엔드포인트, 인프라
- `docs/TROUBLESHOOTING.md` — 실제 발생한 이슈 기록 (문제 → 원인 → 해결 순)

---

## 트러블슈팅 기록 원칙

버그를 수정하거나 삽질 끝에 해결한 이슈가 생기면 **반드시 `docs/TROUBLESHOOTING.md`에 추가**한다.

### 기록 대상

- mock 데이터 구조 불일치, 타입 오류
- 빌드 오류 (Next.js 등)
- 플로우 동작 버그 (상태머신, 라우팅 등)
- 원인 파악에 시간이 걸린 모든 버그

### 작성 형식

```markdown
## N. 제목 — 핵심 증상 한 줄

### 현상

재현 조건과 에러 메시지

### 원인

왜 발생했는지 (코드/구조 레벨)

### 해결

수정한 내용 (코드 스니펫 포함)
```
