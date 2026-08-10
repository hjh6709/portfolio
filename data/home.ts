export type HomeProjectProfile = {
  eyebrow: string;
  headline: string;
  flow: string;
  proofs: Array<{ value: string; label: string }>;
  visuals?: Array<{ src: string; alt: string; label: string }>;
};

export const homeProjectProfiles: Record<string, HomeProjectProfile> = {
  cledyu: {
    eyebrow: 'TEAM PROJECT · DEPLOYED',
    headline: '브라우저에서 실제 VM을 열고 끝까지 실습하는 플랫폼',
    flow: '로그인 → Lab 선택 → VM 프로비저닝 → WebSocket 터미널 → 단계 검증',
    proofs: [
      { value: 'VM', label: '학습자별 격리 환경' },
      { value: 'WS', label: '브라우저 콘솔 연결' },
      { value: 'E2E', label: '세션 복귀·만료·검증' },
    ],
  },
  codebuddy: {
    eyebrow: 'PERSONAL PROJECT · AWS SERVERLESS',
    headline: 'GitHub Webhook을 안전하게 수신하고 AI 분석을 비동기로 처리하는 서버리스 파이프라인',
    flow: 'GitHub Webhook → HMAC 검증 → Async Lambda → 변경 분석 → GitHub Review · Slack',
    proofs: [
      { value: '102', label: '자동화 테스트' },
      { value: '30K', label: '입력 문자 예산' },
      { value: '9,996', label: '보존한 patch 문자' },
    ],
  },
  'kagoshima-travel': {
    eyebrow: 'PERSONAL PROJECT · LIVE SERVICE',
    headline: '여행 전 계획과 현장 이동을 연결한 모바일 여행 서비스',
    flow: 'React PWA → Go API → PostgreSQL → Google Places · Maps',
    proofs: [
      { value: 'LIVE', label: '실제 운영 서비스' },
      { value: 'PWA', label: '모바일 설치·현장 접근' },
      { value: 'HTTPS', label: 'Vercel · OCI · Caddy' },
    ],
    visuals: [
      {
        src: 'projects/kagoshima-travel/live/map-current.png',
        alt: '여행 도우미 앱에서 저장 장소와 현재 위치를 확인하는 실제 지도 화면',
        label: '실제 앱 지도 화면',
      },
    ],
  },
};

export const heroProofs = [
  { value: '05', label: '전체 프로젝트' },
  { value: '02 / 03', label: '팀 / 개인 프로젝트' },
  { value: '102', label: '자동화 테스트' },
  { value: 'MARKETPLACE', label: 'GitHub Action 배포' },
] as const;

export const provenCapabilities = [
  {
    title: 'Go',
    project: 'Cledyu · Kagoshima Travel',
    description: '세션 lifecycle API와 여행 도메인 API를 설계하고 화면·데이터베이스와 연결했습니다.',
  },
  {
    title: 'Kubernetes · KubeVirt',
    project: 'Cledyu',
    description: '사용자별 격리 VM을 만들고 WebSocket console, RBAC, 만료·복귀 흐름까지 검증했습니다.',
  },
  {
    title: 'AWS Lambda',
    project: 'CodeBuddy',
    description: 'Webhook 응답과 AI 분석을 분리한 비동기 서버리스 파이프라인을 구현했습니다.',
  },
  {
    title: 'GitHub Actions',
    project: 'PR Check Doctor',
    description: '실패 로그를 수집·마스킹·분류해 안정적인 PR 코멘트로 갱신하는 Action을 배포했습니다.',
  },
] as const;
