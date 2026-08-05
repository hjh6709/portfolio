# 한정현 포트폴리오

백엔드 개발을 중심으로 서비스 화면과 클라우드 인프라까지 직접 연결해 본 경험을 정리한 개인 포트폴리오입니다. 기술 이름을 나열하기보다 어떤 문제를 발견했고, 어떤 판단으로 구현했으며, 실제 동작을 무엇으로 확인했는지 보여주는 데 초점을 맞췄습니다.

## 구성

- 대표 프로젝트와 역할 요약
- 프로젝트별 문제, 기여, 기술적 판단, 아키텍처, 트러블슈팅
- Cledyu 실제 서비스 화면과 실습 흐름
- 경력과 교육 과정, 기술 역량을 정리한 이력서
- 데스크톱·모바일 반응형 화면과 접근성 기반 내비게이션

## 기술 스택

- Next.js 16 App Router
- React 19, TypeScript
- CSS Modules
- Vitest, Testing Library
- Playwright
- GitHub Actions

## 로컬 실행

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

E2E 테스트는 데스크톱과 모바일 화면에서 프로젝트 상세 흐름, 이력서 접근, 가로 오버플로 여부를 확인합니다.

## 콘텐츠 수정 원칙

- 프로젝트 설명은 실제 저장소, 커밋, 배포 화면으로 확인할 수 있는 범위만 작성합니다.
- 아키텍처는 사용한 제품 이름만 배치하지 않고 요청, 인증, 데이터, 세션, 검증 흐름을 연결합니다.
- 개인 기여와 팀 전체 성과를 구분합니다.
- 실제 서비스 화면은 민감 정보가 없는 이미지만 `public/projects/<slug>/`에 보관합니다.
- 연락처와 외부 프로필은 공개 범위를 확정한 뒤 `data/profile.ts`에서 추가합니다.

## 배포

Vercel에서 저장소를 가져온 뒤 다음 환경변수를 설정하면 됩니다.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

배포 주소는 Open Graph 이미지, sitemap, robots 메타데이터에 사용됩니다. 기본 빌드 명령은 `pnpm build`이며 별도의 서버 설정은 필요하지 않습니다.
