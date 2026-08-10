# Portfolio Home Proof Redesign Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 홈 화면을 검증 가능한 근거와 명확한 프로젝트 위계 중심으로 재구성한다.

**Architecture:** 기존 프로젝트 상세 데이터는 유지하고, 홈 전용 분류와 요약 근거를 `lib/projects.ts`에서 제공한다. 대표 프로젝트는 기존 `ProjectCard`를 확장하고 보조 프로젝트는 별도 경량 카드로 렌더링한다. 홈 레이아웃은 서버 컴포넌트인 `app/page.tsx`에서 섹션 순서를 고정한다.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest, Testing Library

---

### Task 1: 홈 프로젝트 위계 계약

**Files:**
- Modify: `tests/data/projects.test.ts`
- Modify: `lib/projects.ts`

1. 대표 프로젝트와 Other Work 순서를 검증하는 실패 테스트를 작성한다.
2. 해당 테스트가 실패하는지 확인한다.
3. `getFlagshipProjects`, `getOtherProjects`를 최소 구현한다.
4. 데이터 테스트를 다시 실행한다.

### Task 2: Hero와 섹션 구조 계약

**Files:**
- Modify: `tests/pages/home.test.tsx`
- Modify: `data/profile.ts`
- Modify: `app/page.tsx`

1. Hero 제목, 네 가지 근거, 이메일 링크, 대표/보조 프로젝트 개수를 검증하는 실패 테스트를 작성한다.
2. 테스트 실패를 확인한다.
3. 프로필 이메일과 홈 섹션 구조를 구현한다.
4. 페이지 테스트를 다시 실행한다.

### Task 3: 대표·보조 프로젝트 UI

**Files:**
- Modify: `components/project-card.tsx`
- Modify: `components/project-card.module.css`
- Create: `components/other-project-card.tsx`
- Create: `components/other-project-card.module.css`
- Modify: `app/home.module.css`

1. 대표 프로젝트 카드에 역할, 구현 흐름, 검증 근거를 노출한다.
2. 보조 프로젝트용 작은 카드를 추가한다.
3. 반응형 레이아웃과 링크 포커스를 구현한다.

### Task 4: 기술 근거와 경험·연락 구조

**Files:**
- Modify: `data/profile.ts`
- Modify: `app/page.tsx`
- Modify: `app/home.module.css`
- Modify: `components/site-footer.tsx`
- Modify: `components/site-shell.module.css`

1. 기술 항목을 실제 프로젝트 근거와 연결한다.
2. 경험·교육을 기술 다음으로 이동한다.
3. 이메일을 Hero와 Footer의 주 CTA로 연결한다.

### Task 5: 검증과 시각 QA

**Files:**
- Test: `tests/pages/home.test.tsx`
- Test: `tests/data/projects.test.ts`
- Test: `e2e/portfolio.spec.ts`

1. focused Vitest를 실행한다.
2. lint, typecheck, 전체 test, build를 실행한다.
3. 데스크톱과 모바일 폭에서 시각·가로 overflow·포커스 상태를 확인한다.
