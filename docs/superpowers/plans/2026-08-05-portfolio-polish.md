# Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 대표 프로젝트의 이미지 근거를 잘리지 않게 보여 주고, 모바일에서도 아키텍처와 이력서 확인 동선을 자연스럽게 사용할 수 있도록 다듬는다.

**Architecture:** 기존 `Project` 데이터 계약과 홈·상세 페이지 구조는 유지한다. 프로젝트 카드는 이미지 종류에 따라 스크린샷은 `cover`, SVG 아키텍처는 `contain`을 적용하고, 상세 페이지에서는 대표 이미지와 같은 기능 이미지를 다시 그리지 않는다. 모바일 아키텍처는 동일한 의미 구조를 한 열 카드와 읽기 쉬운 연결 목록으로 재배치하며, 이력서 페이지는 검증할 수 없는 임시 안내 대신 실제 GitHub와 프로젝트 링크를 제공한다.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Vitest, Testing Library

## Global Constraints

- 기존 에디토리얼 레이아웃과 Cledyu 중심의 프로젝트 서사는 유지한다.
- Cledyu 실제 서비스 스크린샷은 프레임을 채우고, 아키텍처 SVG는 여백을 둔 `contain` 방식으로 전부 보여 준다.
- 새 의존성, 가짜 지표, 가짜 화면, 확인되지 않은 이메일 주소를 추가하지 않는다.
- `Project` 데이터 계약을 크게 변경하지 않는다.
- 홈 전체 구조를 다시 설계하지 않는다.
- 1440px 데스크톱과 390px 모바일에서 시각 검증한다.
- `pnpm test`, `pnpm lint`, `pnpm typecheck`로 회귀를 확인한다.

---

### Task 1: 프로젝트 카드 이미지와 진입 동선

**Files:**
- Modify: `tests/pages/home.test.tsx`
- Modify: `components/project-card.tsx`
- Modify: `components/project-card.module.css`

**Interfaces:**
- Consumes: 기존 `Project.heroImage.src`, `Project.heroImage.alt`, `Project.slug`
- Produces: 이미지와 제목에서 `/projects/[slug]`로 이동하는 카드, SVG 전용 `diagramVisual` 스타일

- [ ] **Step 1: 이미지 링크 동작을 검증하는 실패 테스트 작성**

```tsx
it('links project images to their case studies', () => {
  render(<HomePage />);

  const cledyuImage = screen.getByAltText(/Cledyu.*Lab/);
  expect(cledyuImage.closest('a')).toHaveAttribute('href', '/projects/cledyu');
});
```

- [ ] **Step 2: 테스트가 현재 구현에서 실패하는지 확인**

Run: `pnpm test -- tests/pages/home.test.tsx`

Expected: FAIL because the project image has no ancestor link.

- [ ] **Step 3: 이미지 종류별 표시 방식과 링크 구현**

```tsx
const isDiagram = project.heroImage.src.endsWith('.svg');

<Link
  className={`${styles.visual} ${isDiagram ? styles.diagramVisual : ''}`}
  href={`/projects/${project.slug}`}
  aria-label={`${project.title} 사례 이미지로 자세히 보기`}
>
  <Image ... />
</Link>
```

제목도 동일한 상세 링크로 감싸고, CSS에서는 기본 스크린샷만 `cover`를 유지한다.

```css
.diagramVisual img {
  object-fit: contain;
  padding: clamp(1.25rem, 3vw, 2.5rem);
}

@media (max-width: 58rem) {
  .content {
    min-height: auto;
  }
}
```

- [ ] **Step 4: 홈 테스트 통과 확인**

Run: `pnpm test -- tests/pages/home.test.tsx`

Expected: PASS.

- [ ] **Step 5: 카드 변경 커밋**

```bash
git add tests/pages/home.test.tsx components/project-card.tsx components/project-card.module.css
git commit -m "fix: improve project card evidence links"
```

### Task 2: 상세 근거 중복 제거와 모바일 아키텍처

**Files:**
- Modify: `tests/pages/project-detail.test.tsx`
- Modify: `components/project-case-study.tsx`
- Modify: `components/project-case-study.module.css`
- Modify: `components/architecture-diagram.module.css`

**Interfaces:**
- Consumes: `Project.heroImage.src`, `Project.featureStories`, `ArchitectureNode[]`, `ArchitectureEdge[]`
- Produces: 대표 이미지와 같은 기능 스토리의 설명만 유지하는 상세 페이지, 720px 이하 한 열 아키텍처

- [ ] **Step 1: 중복 이미지 제거를 검증하는 실패 테스트 작성**

```tsx
it('does not repeat a hero image inside feature stories', () => {
  const project = getProject('codebuddy')!;
  const { container } = render(<ProjectCaseStudy project={project} />);
  const repeatedSource = `/${project.heroImage.src}`;

  expect(
    Array.from(container.querySelectorAll('img')).filter((image) =>
      image.getAttribute('src')?.includes(repeatedSource),
    ),
  ).toHaveLength(1);
});
```

- [ ] **Step 2: 중복 이미지 테스트가 실패하는지 확인**

Run: `pnpm test -- tests/pages/project-detail.test.tsx`

Expected: FAIL because the same source is rendered in the hero and feature section.

- [ ] **Step 3: 기능 설명은 유지하고 중복 그림만 생략**

```tsx
const duplicatesHero = story.src === project.heroImage.src;

<article className={`${styles.feature} ${duplicatesHero ? styles.featureCopyOnly : ''}`}>
  {!duplicatesHero && <figure>...</figure>}
  <div className={styles.featureCopy}>...</div>
</article>
```

`featureCopyOnly`은 텍스트가 과도하게 늘어나지 않는 단일 열 최대 폭을 사용한다.

- [ ] **Step 4: 모바일 아키텍처를 한 열 카드와 세로 흐름으로 전환**

```css
@media (max-width: 720px) {
  .viewport {
    overflow-x: visible;
    padding-bottom: 0;
  }

  .nodeGrid {
    grid-template-columns: 1fr;
    min-width: 0;
  }

  .routes li {
    grid-template-columns: 2rem minmax(0, 1fr) 1.25rem minmax(0, 1fr);
  }
}
```

모노 폰트 변수 오타 `--font-mono`도 실제 전역 변수 `--mono-font`로 맞춘다.

- [ ] **Step 5: 상세 페이지와 아키텍처 테스트 통과 확인**

Run: `pnpm test -- tests/pages/project-detail.test.tsx tests/components/architecture-diagram.test.tsx`

Expected: PASS.

- [ ] **Step 6: 상세·모바일 변경 커밋**

```bash
git add tests/pages/project-detail.test.tsx components/project-case-study.tsx components/project-case-study.module.css components/architecture-diagram.module.css
git commit -m "fix: refine project evidence and mobile architecture"
```

### Task 3: 이력서 확인 동선

**Files:**
- Modify: `tests/pages/resume.test.tsx`
- Modify: `app/resume/page.tsx`
- Modify: `app/resume/resume.module.css`

**Interfaces:**
- Consumes: `profile.github`, 홈 프로젝트 앵커 `/#projects`
- Produces: 임시 다운로드 문구 없이 실제 확인 가능한 링크를 제공하는 `직접 확인하기` 영역

- [ ] **Step 1: 검증 가능한 이력서 동선의 실패 테스트 작성**

```tsx
it('offers verifiable work instead of an unfinished download notice', () => {
  render(<ResumePage />);

  expect(screen.queryByText(/준비되면.*다운로드 링크/)).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '직접 확인하기' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /GitHub에서 코드 보기/ })).toHaveAttribute(
    'href',
    expect.stringContaining('github.com'),
  );
  expect(screen.getByRole('link', { name: /프로젝트 사례 보기/ })).toHaveAttribute(
    'href',
    '/#projects',
  );
});
```

- [ ] **Step 2: 테스트가 현재 임시 문구에서 실패하는지 확인**

Run: `pnpm test -- tests/pages/resume.test.tsx`

Expected: FAIL because the verification section and links do not exist.

- [ ] **Step 3: 실제 확인 링크 영역 구현**

```tsx
<aside className={styles.verification} aria-labelledby="verification-title">
  <div>
    <p className={styles.eyebrow}>VERIFIABLE WORK</p>
    <h2 id="verification-title">직접 확인하기</h2>
  </div>
  <div className={styles.verificationLinks}>
    <a href={profile.github} target="_blank" rel="noreferrer">GitHub에서 코드 보기 ↗</a>
    <Link href="/#projects">프로젝트 사례 보기 →</Link>
  </div>
</aside>
```

기존 `.note` 스타일은 제거하고 모바일에서 링크가 세로로 쌓이도록 구성한다.

- [ ] **Step 4: 이력서 테스트 통과 확인**

Run: `pnpm test -- tests/pages/resume.test.tsx`

Expected: PASS.

- [ ] **Step 5: 이력서 변경 커밋**

```bash
git add tests/pages/resume.test.tsx app/resume/page.tsx app/resume/resume.module.css
git commit -m "fix: replace resume placeholder with evidence links"
```

### Task 4: 회귀와 시각 검증

**Files:**
- Verify only: all changed files

**Interfaces:**
- Consumes: Tasks 1–3의 최종 코드
- Produces: CI에 올릴 수 있는 검증된 브랜치와 PR

- [ ] **Step 1: 전체 자동 검증 실행**

Run:

```bash
pnpm test
pnpm lint
pnpm typecheck
```

Expected: all commands exit 0.

- [ ] **Step 2: 1440px 데스크톱 시각 검증**

홈에서 Cledyu 스크린샷은 프레임을 채우고, 나머지 SVG는 잘리지 않으며 이미지·제목 링크가 상세 페이지로 이동하는지 확인한다. Cledyu와 CodeBuddy 상세에서 중복 이미지와 레이아웃 회귀가 없는지 확인한다.

- [ ] **Step 3: 390px 모바일 시각 검증**

홈 카드에 불필요한 빈 공간이 없고, Cledyu 아키텍처 노드가 가로로 잘리지 않으며 연결 흐름과 이력서 확인 링크가 화면 안에서 읽히는지 확인한다.

- [ ] **Step 4: 최종 diff 검토**

Run: `git diff main...HEAD --check && git status --short`

Expected: whitespace errors 없음, 의도하지 않은 파일 없음.

- [ ] **Step 5: 브랜치 푸시와 PR 생성**

```bash
git push -u origin feat/portfolio-polish
gh pr create --base main --head feat/portfolio-polish
```

PR 제목: `fix: polish portfolio project evidence and mobile layout`
