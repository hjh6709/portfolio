# Portfolio Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 한정현의 백엔드·풀스택·클라우드 경험을 실제 프로젝트 화면과 아키텍처로 증명하는 공개 배포형 포트폴리오를 구축한다.

**Architecture:** Next.js App Router의 정적 페이지로 메인, 이력서, 프로젝트 상세 경로를 생성한다. 콘텐츠는 타입이 있는 로컬 TypeScript 데이터로 관리하고, 아키텍처는 접근 가능한 React/CSS 다이어그램으로 렌더링하며 실제 화면 자료는 `next/image`로 최적화한다.

**Tech Stack:** Next.js 16.3.0, React 19.2.8, TypeScript 6.0.3, CSS Modules, React Icons 5.7.0, Vitest 4.1.10, Testing Library 16.3.2, Playwright 1.62.1, pnpm

## Global Constraints

- 초기 버전은 한국어 단일 사이트다.
- 백엔드 경험을 중심에 두고 풀스택과 클라우드는 서비스 전체 흐름을 이해한 근거로 사용한다.
- 각 대표 프로젝트 상세 페이지에 검증된 아키텍처 또는 시스템 흐름도를 제공한다.
- 팀 전체 구성과 개인 담당 영역을 명확히 분리한다.
- 저장소 코드, 배포 설정, 문서에 확인되는 사실만 표시한다.
- 밝은 에디토리얼 레이아웃, 큰 제목, 넓은 여백, 얇은 구분선을 사용한다.
- 무의미한 그라데이션, 유리 효과, 과도한 pill, AI 생성 장식을 사용하지 않는다.
- 360px 모바일부터 데스크톱까지 가로 스크롤 없이 제공한다.
- 키보드 탐색, 명확한 포커스, 대체 텍스트, `prefers-reduced-motion`을 지원한다.
- 비공개 주소, 계정 정보, 토큰, 내부 IP와 확인되지 않은 성과 수치를 노출하지 않는다.

---

## File Structure

```text
app/
  layout.tsx                 공통 메타데이터와 페이지 프레임
  page.tsx                   메인 포트폴리오
  globals.css                디자인 토큰과 전역 리셋
  resume/page.tsx            경력·교육·기술 요약
  projects/[slug]/page.tsx   프로젝트 정적 상세 페이지
components/
  site-header.tsx            공통 내비게이션
  site-footer.tsx            연락처와 외부 링크
  project-card.tsx           메인 대표 프로젝트 카드
  architecture-diagram.tsx   프로젝트 아키텍처 렌더러
  project-case-study.tsx     상세 페이지 섹션 조립
  reveal.tsx                 reduced-motion 대응 reveal
data/
  profile.ts                 소개·경험·기술 데이터
  projects.ts                프로젝트와 아키텍처 데이터
lib/
  projects.ts                조회·정렬·정적 경로 유틸리티
public/
  projects/...               공개 검토한 실제 화면 이미지
tests/
  data/projects.test.ts      콘텐츠 계약
  components/...             컴포넌트 접근성·렌더링 계약
  pages/...                  주요 페이지 정보 구조
e2e/portfolio.spec.ts        데스크톱·모바일 핵심 사용자 흐름
```

### Task 1: Next.js와 테스트 기반 구성

**Files:**
- Create: `package.json`
- Create: `pnpm-lock.yaml`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/setup.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: `pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`

- [ ] **Step 1: Create the pinned package manifest**

```json
{
  "name": "han-jeonghyun-portfolio",
  "private": true,
  "packageManager": "pnpm@10.33.2",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "16.3.0",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-icons": "5.7.0"
  },
  "devDependencies": {
    "@playwright/test": "1.62.1",
    "@testing-library/jest-dom": "7.0.0",
    "@testing-library/react": "16.3.2",
    "@types/node": "26.1.2",
    "@types/react": "19.2.18",
    "@types/react-dom": "19.2.4",
    "eslint": "9.39.5",
    "eslint-config-next": "16.3.0",
    "jsdom": "30.0.1",
    "typescript": "6.0.3",
    "vitest": "4.1.10"
  }
}
```

- [ ] **Step 2: Add TypeScript, ESLint, Vitest, Playwright and Next configuration**

Use strict TypeScript, `@/*` path aliases, `jsdom` tests, Next core web vitals rules, and Playwright projects for desktop Chromium and mobile Safari-sized WebKit.

- [ ] **Step 3: Install dependencies**

Run: `pnpm install`

Expected: lockfile created with no install failure.

- [ ] **Step 4: Verify the empty toolchain**

Run: `pnpm typecheck && pnpm lint && pnpm test --passWithNoTests`

Expected: all commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json next.config.ts eslint.config.mjs vitest.config.ts playwright.config.ts tests/setup.ts .gitignore
git commit -m "chore: scaffold portfolio toolchain"
```

### Task 2: 타입이 있는 프로필과 프로젝트 콘텐츠

**Files:**
- Create: `data/profile.ts`
- Create: `data/projects.ts`
- Create: `lib/projects.ts`
- Test: `tests/data/projects.test.ts`

**Interfaces:**
- Produces: `Project`, `ArchitectureNode`, `ArchitectureEdge`, `projects`, `getProject(slug)`, `getFeaturedProjects()`, `getProjectSlugs()`

- [ ] **Step 1: Write failing content contract tests**

```ts
import { describe, expect, it } from 'vitest';
import { getFeaturedProjects, getProject, getProjectSlugs } from '@/lib/projects';

describe('project content', () => {
  it('publishes the five verified case studies in the intended order', () => {
    expect(getFeaturedProjects().map((project) => project.slug)).toEqual([
      'cledyu',
      'codebuddy',
      'kagoshima-travel',
      'chilseongpa',
      'pr-check-doctor',
    ]);
  });

  it('gives every published project an architecture and evidence', () => {
    for (const slug of getProjectSlugs()) {
      const project = getProject(slug);
      expect(project.architecture.nodes.length).toBeGreaterThan(2);
      expect(project.architecture.edges.length).toBeGreaterThan(1);
      expect(project.evidence.length).toBeGreaterThan(0);
    }
  });

  it('returns undefined for an unknown project', () => {
    expect(getProject('unknown')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/data/projects.test.ts`

Expected: FAIL because `@/lib/projects` does not exist.

- [ ] **Step 3: Implement the content model and verified project records**

```ts
export type ArchitectureNode = {
  id: string;
  label: string;
  caption: string;
  icon: string;
  ownership: 'team' | 'mine' | 'external';
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label: string;
  kind: 'request' | 'data' | 'recovery';
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  team: string;
  period: string;
  featured: boolean;
  technologies: string[];
  problem: string;
  contribution: string[];
  decisions: Array<{ title: string; body: string }>;
  troubleshooting: Array<{ problem: string; cause: string; solution: string; result: string }>;
  architecture: { nodes: ArchitectureNode[]; edges: ArchitectureEdge[] };
  gallery: Array<{ src: string; alt: string; caption: string }>;
  evidence: Array<{ label: string; href: string }>;
};
```

Populate records using the verified repository and supplied-asset facts in the design spec. `profile.ts` exposes `profile`, `capabilities`, `experience`, and `education` constants.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test tests/data/projects.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add data/profile.ts data/projects.ts lib/projects.ts tests/data/projects.test.ts
git commit -m "feat: add verified portfolio content model"
```

### Task 3: 전역 디자인 시스템과 공통 프레임

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/reveal.tsx`
- Create: `components/site-shell.module.css`
- Test: `tests/components/site-shell.test.tsx`

**Interfaces:**
- Produces: `<SiteHeader />`, `<SiteFooter />`, `<Reveal />`

- [ ] **Step 1: Write the failing navigation accessibility test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from '@/components/site-header';

describe('SiteHeader', () => {
  it('offers named navigation links without requiring hover', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('navigation', { name: '주요 메뉴' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '프로젝트' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('link', { name: '이력서' })).toHaveAttribute('href', '/resume');
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/components/site-shell.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement the editorial design tokens and accessible shell**

Define `--paper`, `--ink`, `--muted`, `--line`, `--accent`, content widths, responsive type scales, visible focus rings and reduced-motion rules. Use semantic `header`, `nav`, `main`, and `footer` landmarks.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test tests/components/site-shell.test.tsx`

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx components/site-header.tsx components/site-footer.tsx components/reveal.tsx components/site-shell.module.css tests/components/site-shell.test.tsx
git commit -m "feat: add editorial portfolio shell"
```

### Task 4: 메인 포트폴리오 페이지

**Files:**
- Create: `app/page.tsx`
- Create: `app/home.module.css`
- Create: `components/project-card.tsx`
- Create: `components/project-card.module.css`
- Test: `tests/pages/home.test.tsx`

**Interfaces:**
- Consumes: `profile`, `capabilities`, `experience`, `getFeaturedProjects()`
- Produces: `<ProjectCard project={project} index={index} />`

- [ ] **Step 1: Write the failing home-page information hierarchy test**

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

it('introduces backend positioning and links every featured project', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('서비스를 끝까지 연결하는 백엔드 개발자');
  expect(screen.getByRole('heading', { name: '대표 프로젝트' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /프로젝트 자세히 보기/ })).toHaveLength(5);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/pages/home.test.tsx`

Expected: FAIL because `app/page.tsx` does not exist.

- [ ] **Step 3: Implement hero, capabilities, experience, featured projects and contact**

Use large editorial typography, alternating image/text project rows, numbered metadata, visible links, and optional email rendering only when a confirmed email exists.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test tests/pages/home.test.tsx`

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/home.module.css components/project-card.tsx components/project-card.module.css tests/pages/home.test.tsx
git commit -m "feat: build portfolio home page"
```

### Task 5: 아키텍처 다이어그램

**Files:**
- Create: `components/architecture-diagram.tsx`
- Create: `components/architecture-diagram.module.css`
- Create: `components/technology-icon.tsx`
- Test: `tests/components/architecture-diagram.test.tsx`

**Interfaces:**
- Consumes: `{ title: string; nodes: ArchitectureNode[]; edges: ArchitectureEdge[] }`
- Produces: `<ArchitectureDiagram title nodes edges />`

- [ ] **Step 1: Write the failing accessible-flow test**

```tsx
import { render, screen } from '@testing-library/react';
import { ArchitectureDiagram } from '@/components/architecture-diagram';

it('exposes architecture nodes and labeled connections as text', () => {
  render(
    <ArchitectureDiagram
      title="테스트 아키텍처"
      nodes={[
        { id: 'web', label: 'Web', caption: 'Next.js', icon: 'nextjs', ownership: 'mine' },
        { id: 'api', label: 'API', caption: 'Go', icon: 'go', ownership: 'mine' },
      ]}
      edges={[{ from: 'web', to: 'api', label: 'API 요청', kind: 'request' }]}
    />,
  );
  expect(screen.getByRole('figure', { name: '테스트 아키텍처' })).toBeInTheDocument();
  expect(screen.getByText('API 요청')).toBeInTheDocument();
  expect(screen.getAllByText('직접 담당')).toHaveLength(2);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/components/architecture-diagram.test.tsx`

Expected: FAIL because the diagram component does not exist.

- [ ] **Step 3: Implement responsive architecture nodes and orthogonal flow rows**

Render official-looking technology icons from `react-icons/si` where available, text-based marks for KubeVirt-specific nodes, a visible ownership legend, edge labels, and a mobile horizontal exploration region with keyboard focus.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test tests/components/architecture-diagram.test.tsx`

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add components/architecture-diagram.tsx components/architecture-diagram.module.css components/technology-icon.tsx tests/components/architecture-diagram.test.tsx
git commit -m "feat: add project architecture diagrams"
```

### Task 6: 프로젝트 상세 사례 페이지

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `app/projects/[slug]/project.module.css`
- Create: `components/project-case-study.tsx`
- Create: `components/project-case-study.module.css`
- Test: `tests/pages/project-detail.test.tsx`

**Interfaces:**
- Consumes: `getProject(slug)`, `getProjectSlugs()`, `<ArchitectureDiagram />`
- Produces: `generateStaticParams()`, `generateMetadata()`, `<ProjectCaseStudy project />`

- [ ] **Step 1: Write the failing case-study structure test**

```tsx
import { render, screen } from '@testing-library/react';
import { ProjectCaseStudy } from '@/components/project-case-study';
import { getProject } from '@/lib/projects';

it('separates project scope, personal contribution and troubleshooting', () => {
  render(<ProjectCaseStudy project={getProject('cledyu')!} />);
  expect(screen.getByRole('heading', { name: 'Cledyu' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '내가 담당한 영역' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '서비스 아키텍처' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '트러블슈팅' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/pages/project-detail.test.tsx`

Expected: FAIL because `ProjectCaseStudy` does not exist.

- [ ] **Step 3: Implement static detail routes and case-study sections**

Render summary metadata, problem, personal contribution, gallery, architecture, decisions, troubleshooting, result/retrospective and evidence links. Unknown slugs call `notFound()`.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test tests/pages/project-detail.test.tsx`

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add app/projects/[slug]/page.tsx app/projects/[slug]/project.module.css components/project-case-study.tsx components/project-case-study.module.css tests/pages/project-detail.test.tsx
git commit -m "feat: add project case study pages"
```

### Task 7: 실제 프로젝트 자료 큐레이션

**Files:**
- Create: `public/projects/cledyu/*`
- Create: `public/projects/codebuddy/*`
- Create: `public/projects/kagoshima-travel/*`
- Create: `public/projects/chilseongpa/*`
- Create: `public/projects/pr-check-doctor/*`
- Modify: `data/projects.ts`
- Test: `tests/data/project-assets.test.ts`

**Interfaces:**
- Consumes: `Project.gallery`
- Produces: local, deployable image paths with descriptive alt text and captions

- [ ] **Step 1: Write the failing asset-existence test**

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { projects } from '@/data/projects';

it('ships every referenced gallery image with the site', () => {
  for (const project of projects) {
    for (const image of project.gallery) {
      expect(existsSync(join(process.cwd(), 'public', image.src))).toBe(true);
      expect(image.alt.length).toBeGreaterThan(8);
    }
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/data/project-assets.test.ts`

Expected: FAIL because curated assets have not been copied.

- [ ] **Step 3: Copy and normalize only public-safe source images**

Copy the supplied Cledyu service screenshots and architecture image, then inspect the other local project repositories and reports for representative screenshots. Use lowercase ASCII filenames, preserve aspect ratio, remove EXIF metadata, and omit any image containing secrets or private infrastructure addresses.

- [ ] **Step 4: Update gallery records and verify GREEN**

Run: `pnpm test tests/data/project-assets.test.ts`

Expected: every referenced image exists and has descriptive alt text.

- [ ] **Step 5: Commit**

```bash
git add public/projects data/projects.ts tests/data/project-assets.test.ts
git commit -m "feat: add verified project visuals"
```

### Task 8: 이력서 페이지와 SEO

**Files:**
- Create: `app/resume/page.tsx`
- Create: `app/resume/resume.module.css`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/opengraph-image.tsx`
- Test: `tests/pages/resume.test.tsx`

**Interfaces:**
- Consumes: `profile`, `capabilities`, `experience`, `education`
- Produces: `/resume`, sitemap, robots, Open Graph image

- [ ] **Step 1: Write the failing resume content test**

```tsx
import { render, screen } from '@testing-library/react';
import ResumePage from '@/app/resume/page';

it('summarizes backend direction, training and internship without inflated claims', () => {
  render(<ResumePage />);
  expect(screen.getByRole('heading', { level: 1, name: '이력서' })).toBeInTheDocument();
  expect(screen.getByText(/KT Cloud 인프라 부트캠프/)).toBeInTheDocument();
  expect(screen.getByText(/평택도시공사 안전감사실/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test tests/pages/resume.test.tsx`

Expected: FAIL because the resume page does not exist.

- [ ] **Step 3: Implement the resume and route metadata**

Use compact timeline sections and link back to projects as evidence. Do not expose an unconfirmed email or generate a downloadable resume file until a reviewed file is supplied.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test tests/pages/resume.test.tsx`

Expected: test passes.

- [ ] **Step 5: Commit**

```bash
git add app/resume app/sitemap.ts app/robots.ts app/opengraph-image.tsx tests/pages/resume.test.tsx
git commit -m "feat: add resume and portfolio metadata"
```

### Task 9: 반응형·접근성·배포 검증

**Files:**
- Create: `e2e/portfolio.spec.ts`
- Create: `.github/workflows/ci.yml`
- Modify: `README.md`
- Modify: `app/globals.css`
- Modify: `app/home.module.css`
- Modify: `components/project-card.module.css`
- Modify: `components/architecture-diagram.module.css`
- Modify: `components/project-case-study.module.css`

**Interfaces:**
- Consumes: all public routes
- Produces: repeatable CI and Vercel deployment instructions

- [ ] **Step 1: Write the failing end-to-end navigation and overflow test**

```ts
import { expect, test } from '@playwright/test';

test('a recruiter can open Cledyu and inspect its architecture', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Cledyu 프로젝트 자세히 보기/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Cledyu' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '서비스 아키텍처' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
```

- [ ] **Step 2: Run Playwright and verify RED**

Run: `pnpm exec playwright install chromium && pnpm test:e2e`

Expected: FAIL if navigation, server configuration or responsive layout is incomplete.

- [ ] **Step 3: Fix only the failures demonstrated by the end-to-end test**

Add CI jobs for install, lint, typecheck, unit tests and production build. Document local commands, content update rules, architecture evidence rules, Vercel import steps and the fact that confirmed contact details are intentionally omitted.

- [ ] **Step 4: Run the complete verification suite**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e`

Expected: all commands pass with no warnings caused by project code.

- [ ] **Step 5: Commit**

```bash
git add e2e .github/workflows/ci.yml README.md app components
git commit -m "test: verify portfolio release flow"
```

## Final Visual Review

- [ ] Start `pnpm dev` and inspect `/`, `/resume`, and every `/projects/*` route at 1440×1000, 1024×768, 768×1024 and 390×844.
- [ ] Confirm all architecture labels are readable and connection directions remain understandable.
- [ ] Confirm screenshots are not stretched, cropped misleadingly or leaking private data.
- [ ] Confirm content describes personal ownership separately from team results.
- [ ] Confirm keyboard focus, reduced motion and contrast behavior.
- [ ] Push `feat/portfolio-foundation`, create a draft PR, inspect Vercel Preview, then replace the temporary Vercel URL with a final public URL after user approval.
