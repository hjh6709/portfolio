# Reference-led Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 실제 화면과 검증 가능한 문제 해결 과정을 중심으로 홈과 프로젝트 상세 페이지를 백엔드·클라우드 포트폴리오에 맞게 개편한다.

**Architecture:** `data/projects.ts`를 프로젝트 사례의 단일 데이터 원천으로 유지하면서 대표 이미지, 기능 흐름, 결과 데이터를 확장한다. 홈은 실제 이미지 기반 프로젝트 목록을 렌더링하고, 상세 페이지는 대표 화면에서 시작해 문제·담당 범위·기능 흐름·아키텍처·트러블슈팅·결과 순으로 구성한다.

**Tech Stack:** Next.js 16, React 19, TypeScript 6, CSS Modules, Vitest, Testing Library, Playwright

## Global Constraints

- `min-hyuk.com`의 문구, 코드, 이미지 또는 고유한 시각 요소를 그대로 복제하지 않는다.
- 밝은 오프화이트 배경과 검정 계열 타이포그래피를 기본으로 하고 파란색은 의미 있는 강조에만 사용한다.
- 실제 서비스 화면을 아키텍처보다 먼저 보여준다.
- 근거 없는 성과 수치, 과장된 표현, 추상적인 AI 문체를 사용하지 않는다.
- 새 UI 라이브러리나 애니메이션 의존성을 추가하지 않는다.
- 기존 `/projects/[slug]`, `/resume` 경로를 유지한다.
- 모든 이미지에 목적을 설명하는 대체 텍스트를 제공한다.
- 768px 이하에서는 주요 2열 레이아웃을 단일 열로 전환한다.

---

### Task 1: 프로젝트 사례 데이터 계약 확장

**Files:**
- Modify: `data/projects.ts`
- Modify: `tests/data/projects.test.ts`
- Modify: `tests/data/project-assets.test.ts`

**Interfaces:**
- Consumes: 현재 `Project`, `gallery`, `troubleshooting`, `evidence` 데이터
- Produces: `Project.heroImage`, `Project.challenge`, `Project.responsibilities`, `Project.featureStories`, `Project.outcomes`

- [ ] **Step 1: 확장된 프로젝트 계약을 검증하는 실패 테스트 작성**

```tsx
it('featured projects expose evidence-led case study content', () => {
  for (const project of projects.filter((item) => item.featured)) {
    expect(project.heroImage.alt).not.toHaveLength(0);
    expect(project.challenge).not.toHaveLength(0);
    expect(project.responsibilities.length).toBeGreaterThan(0);
    expect(project.outcomes.length).toBeGreaterThan(0);
  }
});

it('uses an existing project image for every hero image', () => {
  for (const project of projects) {
    expect(existsSync(join(process.cwd(), 'public', project.heroImage.src))).toBe(true);
  }
});
```

- [ ] **Step 2: 테스트가 새 필드 부재로 실패하는지 확인**

Run: `pnpm test -- tests/data/projects.test.ts tests/data/project-assets.test.ts`

Expected: FAIL with TypeScript or assertion errors for `heroImage`, `challenge`, `responsibilities`, `outcomes`.

- [ ] **Step 3: 타입과 실제 프로젝트 데이터를 최소 구현**

```ts
export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type FeatureStory = ProjectImage & {
  title: string;
  description: string;
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
  troubleshooting: Array<{
    problem: string;
    cause: string;
    solution: string;
    result: string;
  }>;
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  gallery: ProjectImage[];
  evidence: Array<{ label: string; href: string }>;
  heroImage: ProjectImage;
  challenge: string;
  responsibilities: string[];
  featureStories: FeatureStory[];
  outcomes: string[];
};
```

Cledyu는 기존 `labs-catalog.png`, `lab-detail.png`, `provisioning.png`, `lab-session.png`, `my-learning.png`을 실제 사용자 흐름 순서대로 사용한다. 실제 이미지가 없는 프로젝트는 저장소에 있는 기존 근거 이미지를 확인해 추가하기 전까지 장식 이미지를 생성하지 않고, 아키텍처 다이어그램을 명시적인 대체 대표 시각으로 사용한다.

- [ ] **Step 4: 데이터 테스트 통과 확인**

Run: `pnpm test -- tests/data/projects.test.ts tests/data/project-assets.test.ts`

Expected: PASS.

- [ ] **Step 5: 커밋**

```bash
git add data/projects.ts tests/data/projects.test.ts tests/data/project-assets.test.ts public/projects
git commit -m "feat: expand portfolio case study data"
```

### Task 2: 홈을 실제 화면 중심 대표 프로젝트 구조로 개편

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/home.module.css`
- Modify: `components/project-card.tsx`
- Modify: `components/project-card.module.css`
- Modify: `tests/pages/home.test.tsx`

**Interfaces:**
- Consumes: `Project.heroImage`, `Project.challenge`, `Project.technologies`, `profile`, `experience`, `education`
- Produces: 실제 이미지가 먼저 보이는 `ProjectCard`, 홈의 `hero`, `selected work`, `experience`, `capabilities`, `contact` 흐름

- [ ] **Step 1: 홈 정보 순서와 대표 이미지 검증 실패 테스트 작성**

```tsx
it('presents selected work before capabilities and uses real project imagery', () => {
  render(<HomePage />);

  const selectedWork = screen.getByRole('heading', { name: '대표 프로젝트' });
  const capabilities = screen.getByRole('heading', { name: '사용한 기술' });
  expect(selectedWork.compareDocumentPosition(capabilities) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByAltText(/Cledyu.*Lab/)).toBeInTheDocument();
});

it('does not render unverified archive entries', () => {
  render(<HomePage />);
  expect(screen.queryByText('Wait:ON')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: 기존 홈이 섹션 순서와 이미지 조건으로 실패하는지 확인**

Run: `pnpm test -- tests/pages/home.test.tsx`

Expected: FAIL because capabilities precede projects, cards have no image, and Archive is present.

- [ ] **Step 3: `ProjectCard`를 `next/image` 기반 실제 화면 카드로 변경**

```tsx
<article className={styles.card}>
  <Link href={`/projects/${project.slug}`} className={styles.visualLink}>
    <Image
      src={`/${project.heroImage.src}`}
      alt={project.heroImage.alt}
      width={2048}
      height={1280}
      sizes="(max-width: 768px) 100vw, 72vw"
    />
  </Link>
  <div className={styles.content}>
    <p className={styles.meta}>{project.period} · {project.team}</p>
    <h3>{project.title}</h3>
    <p>{project.challenge}</p>
    <ul>{project.technologies.slice(0, 6).map((technology) => <li key={technology}>{technology}</li>)}</ul>
    <Link href={`/projects/${project.slug}`}>사례 자세히 보기 <span aria-hidden="true">↗</span></Link>
  </div>
</article>
```

- [ ] **Step 4: 홈 섹션을 인트로 → 대표 프로젝트 → 경험 → 사용한 기술 → 연락처 순으로 재배치**

`archiveProjects`와 Archive 섹션을 제거한다. Hero 설명은 API·세션·배포 환경을 연결한 경험을 두 문장 이내로 유지하고, 대표 프로젝트가 첫 번째 긴 콘텐츠가 되도록 한다.

- [ ] **Step 5: 편집형 반응형 CSS 구현**

프로젝트 이미지는 전체 폭 또는 7:5 비율의 큰 영역으로 배치한다. 카드 배경과 시스템 맵 장식을 제거하고 이미지, 제목, 여백으로 계층을 만든다. 768px 이하에서는 이미지와 설명을 단일 열로 전환한다.

- [ ] **Step 6: 홈 테스트 통과 확인**

Run: `pnpm test -- tests/pages/home.test.tsx`

Expected: PASS.

- [ ] **Step 7: 커밋**

```bash
git add app/page.tsx app/home.module.css components/project-card.tsx components/project-card.module.css tests/pages/home.test.tsx
git commit -m "feat: lead portfolio with project evidence"
```

### Task 3: 프로젝트 상세 페이지를 사례 서사 중심으로 개편

**Files:**
- Modify: `components/project-case-study.tsx`
- Modify: `components/project-case-study.module.css`
- Modify: `tests/pages/project-detail.test.tsx`

**Interfaces:**
- Consumes: Task 1의 `heroImage`, `challenge`, `responsibilities`, `featureStories`, `outcomes`
- Produces: 대표 화면 → 문제 → 책임 → 기능 흐름 → 아키텍처 → 판단 → 트러블슈팅 → 결과 → 근거 순서의 `ProjectCaseStudy`

- [ ] **Step 1: 상세 사례 순서와 결과 섹션 검증 실패 테스트 작성**

```tsx
it('renders an evidence-led case study in narrative order', () => {
  render(<ProjectCaseStudy project={projects[0]} />);

  const heroImage = screen.getByAltText(projects[0].heroImage.alt);
  const challenge = screen.getByRole('heading', { name: '해결하려던 문제' });
  const architecture = screen.getByRole('heading', { name: '서비스 아키텍처' });
  const outcomes = screen.getByRole('heading', { name: '결과와 배운 점' });

  expect(heroImage.compareDocumentPosition(challenge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(challenge.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(architecture.compareDocumentPosition(outcomes) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
```

- [ ] **Step 2: 기존 상세 페이지가 대표 이미지와 결과 섹션 부재로 실패하는지 확인**

Run: `pnpm test -- tests/pages/project-detail.test.tsx`

Expected: FAIL because no hero image or `결과와 배운 점` heading exists.

- [ ] **Step 3: 상세 Hero 아래 대표 실제 화면 추가**

```tsx
<figure className={styles.heroVisual}>
  <Image src={`/${project.heroImage.src}`} alt={project.heroImage.alt} width={2048} height={1280} priority />
  <figcaption>{project.heroImage.caption}</figcaption>
</figure>
```

- [ ] **Step 4: 문제와 책임 영역을 실제 역할 중심으로 구현**

`project.challenge`을 문제 섹션의 핵심 문장으로 사용하고 `project.responsibilities`를 번호가 있는 목록으로 보여준다. 기존 `problem`, `contribution`은 중복되지 않도록 새 데이터로 통합한다.

- [ ] **Step 5: 기능 흐름을 큰 이미지와 설명이 번갈아 나오는 섹션으로 구현**

```tsx
{project.featureStories.map((story, index) => (
  <article key={story.src} className={styles.featureStory}>
    <Image src={`/${story.src}`} alt={story.alt} width={2048} height={1280} />
    <div>
      <span>{String(index + 1).padStart(2, '0')}</span>
      <h3>{story.title}</h3>
      <p>{story.description}</p>
    </div>
  </article>
))}
```

- [ ] **Step 6: 아키텍처, 판단, 트러블슈팅, 결과와 근거를 마무리**

아키텍처는 기능 흐름 뒤에 배치한다. 결과 섹션은 `project.outcomes`만 사용하고 검증할 수 없는 수치는 넣지 않는다. 트러블슈팅의 문제·원인·해결·결과 구조는 유지하되 카드 배경 대신 읽기 쉬운 행 구조로 만든다.

- [ ] **Step 7: 상세 페이지 테스트 통과 확인**

Run: `pnpm test -- tests/pages/project-detail.test.tsx`

Expected: PASS.

- [ ] **Step 8: 커밋**

```bash
git add components/project-case-study.tsx components/project-case-study.module.css tests/pages/project-detail.test.tsx
git commit -m "feat: rebuild project evidence narratives"
```

### Task 4: 접근성·반응형 회귀 검증 보강

**Files:**
- Modify: `app/globals.css`
- Modify: `components/reveal.tsx`
- Modify: `e2e/portfolio.spec.ts`
- Modify: `tests/components/site-shell.test.tsx`

**Interfaces:**
- Consumes: Task 2와 Task 3에서 완성한 홈과 상세 UI
- Produces: 키보드 포커스, reduced motion, 모바일 단일 열과 가로 overflow 검증

- [ ] **Step 1: 모바일 overflow와 핵심 링크 검증 E2E 테스트 작성**

```ts
test('mobile pages keep project evidence readable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('link', { name: /Cledyu.*사례/ }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByRole('heading', { name: '결과와 배운 점' })).toBeVisible();
});
```

- [ ] **Step 2: E2E 테스트를 실행해 현재 반응형 문제 여부 확인**

Run: `pnpm test:e2e -- --grep "mobile pages"`

Expected: FAIL until new labels and layout are complete.

- [ ] **Step 3: 전역 포커스와 reduced motion 스타일 정리**

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

- [ ] **Step 4: 모바일 E2E 테스트 통과 확인**

Run: `pnpm test:e2e -- --grep "mobile pages"`

Expected: PASS.

- [ ] **Step 5: 커밋**

```bash
git add app/globals.css components/reveal.tsx e2e/portfolio.spec.ts tests/components/site-shell.test.tsx
git commit -m "test: cover responsive portfolio evidence"
```

### Task 5: 전체 검증과 실제 브라우저 시각 점검

**Files:**
- Modify if needed: files touched in Tasks 1–4
- Verify: `README.md`

**Interfaces:**
- Consumes: 완성된 홈, 프로젝트 상세, 이력서
- Produces: 배포 가능한 검증 결과와 시각 점검 근거

- [ ] **Step 1: 정적 검사와 단위 테스트 실행**

Run: `pnpm lint && pnpm typecheck && pnpm test`

Expected: all commands exit 0.

- [ ] **Step 2: 프로덕션 빌드 실행**

Run: `pnpm build`

Expected: Next.js build exits 0 and existing routes are generated.

- [ ] **Step 3: 전체 E2E 실행**

Run: `pnpm test:e2e`

Expected: all Playwright tests pass.

- [ ] **Step 4: 실제 브라우저 시각 점검**

홈, `/projects/cledyu`, 이미지가 없는 다른 프로젝트 상세, `/resume`을 1440×1000과 390×844에서 확인한다. 이미지 잘림, 지나치게 긴 본문, 빈 영역, 가로 스크롤, 포커스 누락이 발견되면 해당 CSS만 최소 수정한다.

- [ ] **Step 5: 최종 변경 상태 확인**

Run: `git status --short && git diff --check`

Expected: 의도한 파일 외 변경이 없고 whitespace 오류가 없다.

- [ ] **Step 6: 최종 보정 커밋**

```bash
git add app components data tests e2e public README.md
git commit -m "fix: polish portfolio evidence layouts"
```
