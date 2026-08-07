# Project Case Study Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** 실제 서비스 화면과 검증된 아키텍처 자료를 중심으로 프로젝트 상세 페이지를 재구성해, 구현 범위와 기술 판단이 한눈에 드러나는 완성도 높은 포트폴리오를 만든다.

**Architecture:** 프로젝트 데이터에 상태, 실제 아키텍처 이미지, 기술별 역할 정보를 추가하고 `ProjectCaseStudy`가 이를 공통 레이아웃으로 렌더링한다. 실제 제품 스크린샷은 `public/projects/*`에 보관하고 Next.js `Image`로 제공하며, 데이터가 없는 기존 프로젝트는 현재 코드형 다이어그램으로 안전하게 폴백한다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Vitest, Testing Library, Playwright

## Global Constraints

- `AGENTS.md`에 따라 변경 전 Next.js 이미지·CSS·접근성·Vitest 문서를 확인한다.
- 이미지에는 고유한 대체 텍스트와 캡션을 제공하고 고정 비율 컨테이너로 CLS를 방지한다.
- 모션은 필수 정보 전달에 사용하지 않으며 `prefers-reduced-motion`을 존중한다.
- Cledyu 아키텍처는 기존에 실제 자료를 토대로 제작한 이미지를 사용한다.
- Kagoshima는 현재 개선 중인 프로젝트임을 숨기지 않고 `운영 중 · 화면 개선 진행 중`으로 표시한다.
- 단순 기술 로고 모음 대신 기술명과 프로젝트 내 실제 역할을 함께 설명한다.

---

### Task 1: 프로젝트 데이터 계약을 테스트로 고정

**Files:**
- Modify: `tests/data/projects.test.ts`
- Modify: `tests/data/project-assets.test.ts`
- Modify: `tests/pages/project-detail.test.tsx`

**Step 1: Write the failing tests**

- Kagoshima에 개선 상태와 실제 서비스 링크가 있어야 한다.
- Cledyu와 Kagoshima에 실제 아키텍처 이미지가 있어야 한다.
- 각 프로젝트에 기술별 실제 역할 데이터가 있어야 한다.
- 상세 화면에 상태, 서비스 아키텍처 이미지, 기술과 역할 섹션이 렌더링되어야 한다.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/data/projects.test.ts tests/data/project-assets.test.ts tests/pages/project-detail.test.tsx`

Expected: 새 필드와 화면 요소가 아직 없어 실패한다.

**Step 3: Commit the red test**

```bash
git add tests/data/projects.test.ts tests/data/project-assets.test.ts tests/pages/project-detail.test.tsx
git commit -m "test: define evidence-led project case studies"
```

### Task 2: 실제 프로젝트 자료와 데이터 모델 추가

**Files:**
- Modify: `data/projects.ts`
- Create: `public/projects/cledyu/architecture.png`
- Create: `public/projects/kagoshima-travel/manage.png`
- Create: `public/projects/kagoshima-travel/service-flow.svg`

**Step 1: Add the minimum data model**

- `status`, `architectureImage`, `technologyRoles`를 `Project`에 추가한다.
- Cledyu는 실제 아키텍처 이미지와 주요 기술 역할을 연결한다.
- Kagoshima는 운영 상태, 실제 서비스 URL, 모바일 운영 화면, 실제 배포 경계를 반영한 아키텍처를 연결한다.

**Step 2: Copy and prepare verified assets**

- 기존 Cledyu 아키텍처 PNG를 프로젝트 에셋으로 복사한다.
- 기존 Kagoshima 운영 화면 캡처를 복사한다.
- `Vercel React PWA → OCI Caddy/Go API → Supabase PostgreSQL`, Google Places/Maps 경계를 표현하는 SVG를 작성한다.

**Step 3: Run data tests**

Run: `npm test -- tests/data/projects.test.ts tests/data/project-assets.test.ts`

Expected: PASS.

**Step 4: Commit**

```bash
git add data/projects.ts public/projects
git commit -m "feat: add verified project evidence"
```

### Task 3: 상세 페이지를 증거 중심 레이아웃으로 재구성

**Files:**
- Modify: `components/project-case-study.tsx`
- Modify: `components/project-case-study.module.css`
- Modify: `components/technology-icon.tsx`

**Step 1: Implement status and hero evidence**

- 프로젝트 상태를 메타데이터 가까이에 표시한다.
- 실제 화면이 hero가 되도록 하고 이미지 캡션과 화면 성격을 명확히 한다.
- 외부 서비스 링크는 `라이브 서비스`처럼 구체적인 레이블을 사용한다.

**Step 2: Implement architecture evidence**

- `architectureImage`가 있으면 넓은 전용 뷰어와 설명을 렌더링한다.
- 이미지가 없을 때만 기존 `ArchitectureDiagram`을 유지한다.

**Step 3: Implement technology roles**

- 기술 아이콘, 기술명, 이 프로젝트에서 맡은 역할을 한 카드에 배치한다.
- 점선 로고 박스와 무의미한 로고 나열을 제거한다.

**Step 4: Improve editorial rhythm and responsive behavior**

- 큰 화면은 넓은 실제 화면과 짧은 설명의 교차 리듬을 사용한다.
- 작은 화면은 이미지, 제목, 설명 순서가 자연스럽게 이어지도록 단일 열로 전환한다.
- 포커스 표시와 충분한 대비를 유지한다.

**Step 5: Run component tests**

Run: `npm test -- tests/pages/project-detail.test.tsx tests/components/architecture-diagram.test.tsx`

Expected: PASS.

**Step 6: Commit**

```bash
git add components/project-case-study.tsx components/project-case-study.module.css components/technology-icon.tsx
git commit -m "feat: redesign project case studies"
```

### Task 4: 전체 품질 검증과 시각 검수

**Files:**
- Modify if needed: `components/project-case-study.module.css`
- Modify if needed: `data/projects.ts`

**Step 1: Run the repository checks**

Run: `npm test`

Expected: PASS.

Run: `npm run lint`

Expected: PASS.

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

**Step 2: Visual QA**

- `/projects/cledyu`와 `/projects/kagoshima-travel`을 데스크톱과 모바일 폭으로 확인한다.
- 실제 이미지가 잘리지 않고, 글자 크기와 여백이 균형 잡혔는지 확인한다.
- Kagoshima 개선 상태와 라이브 링크, Cledyu 아키텍처가 눈에 띄는지 확인한다.

**Step 3: Final commit**

```bash
git add .
git commit -m "fix: polish project case study presentation"
```

### Task 5: Push and open a pull request

**Files:**
- Read: `.github/PULL_REQUEST_TEMPLATE.md`

**Step 1: Verify git state**

Run: `git status --short && git log --oneline origin/main..HEAD`

Expected: 의도한 커밋만 있고 작업 트리가 깨끗하다.

**Step 2: Push**

Run: `git push -u origin feat/portfolio-case-study-redesign`

**Step 3: Create PR using the repository template**

PR title: `feat: redesign project case studies with verified evidence`

PR body는 실제 검증 결과와 변경 범위를 템플릿에 맞춰 작성한다.
