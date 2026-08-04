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
  gallery: Array<{ src: string; alt: string; caption: string }>;
  evidence: Array<{ label: string; href: string }>;
};

export const projects: Project[] = [
  {
    slug: 'cledyu',
    title: 'Cledyu',
    summary:
      '브라우저에서 전용 VM을 열고 직접 명령을 실행하며 배우는 클라우드 엔지니어링 실습 플랫폼입니다.',
    role: 'Full-stack · 인증과 Lab 사용자 흐름 · 세션 연동',
    team: '6인 팀 프로젝트',
    period: '2026',
    featured: true,
    technologies: [
      'Go',
      'Next.js',
      'PostgreSQL',
      'WebSocket',
      'Keycloak',
      'Kubernetes',
      'KubeVirt',
      'Kafka',
      'AWS',
    ],
    problem:
      '영상이나 설명만 보는 교육을 넘어, 학습자가 실제 서버 환경에서 명령을 실행하고 단계별 결과를 바로 확인할 수 있어야 했습니다.',
    contribution: [
      '랜딩, 로그인, Lab 탐색, 프로비저닝, 실습 세션, 내 학습으로 이어지는 사용자 흐름을 구현하고 다듬었습니다.',
      'Next.js 화면과 Go Session API, WebSocket 터미널이 전달하는 상태를 연결했습니다.',
      '세션 복귀, 중복 생성, 만료와 실패 상태를 사용자 화면에서 구분해 다음 행동을 안내했습니다.',
      'KubeVirt 콘솔 접근에 필요한 최소 RBAC 범위를 점검하고 Lab Namespace별 RoleBinding 흐름을 개선했습니다.',
    ],
    decisions: [
      {
        title: '사용자 흐름과 인프라 상태를 같은 계약으로 다루기',
        body: 'VM 생성 여부만 보지 않고 프로비저닝, 콘솔 연결, 단계 검증, 세션 종료까지 사용자 관점의 상태로 연결했습니다.',
      },
      {
        title: '실습 상태에 맞는 복귀 경로 유지',
        body: '진행 중인 세션은 이어가고 완료·실패·만료 세션은 잘못된 링크를 만들지 않도록 lifecycle별 동선을 분리했습니다.',
      },
      {
        title: '운영 제어면과 서비스 요청 흐름 분리',
        body: 'Vault, GitOps, 관측성 구성은 사용자 요청 경로와 구분해 운영 구조와 서비스 구조가 각각 읽히도록 정리했습니다.',
      },
    ],
    troubleshooting: [
      {
        problem: 'VM은 생성됐지만 브라우저 터미널 연결이 실패해 Lab을 시작할 수 없었습니다.',
        cause: 'API ServiceAccount에 KubeVirt VM console 서브리소스를 조회하는 권한이 없었습니다.',
        solution:
          'KubeVirt VM console 조회에 필요한 get 권한만 ClusterRole에 추가하고 각 Lab Namespace에 RoleBinding이 생성되도록 구성했습니다.',
        result: 'VM 생성부터 WebSocket 콘솔 연결까지 실제 사용자 흐름으로 다시 검증했습니다.',
      },
      {
        problem: '여러 창을 열거나 다시 접속하면 기존 세션 안내가 반복되고 상태가 서로 어긋났습니다.',
        cause: '화면 캐시와 실제 세션 lifecycle이 같은 시점에 갱신되지 않았습니다.',
        solution:
          '세션 생성·종료 이후 관련 쿼리를 무효화하고 활성·완료·실패·만료 상태별 링크를 분리했습니다.',
        result: '중복 세션 생성과 만료된 이어가기 경로를 줄이고 현재 세션 상태를 일관되게 안내했습니다.',
      },
    ],
    architecture: {
      nodes: [
        { id: 'learner', label: 'Learner', caption: 'Browser', icon: 'browser', ownership: 'external' },
        { id: 'web', label: 'Web', caption: 'Next.js · xterm.js', icon: 'nextjs', ownership: 'mine' },
        { id: 'keycloak', label: 'Keycloak', caption: 'OIDC authentication', icon: 'keycloak', ownership: 'mine' },
        { id: 'api', label: 'Session API', caption: 'Go · WebSocket', icon: 'go', ownership: 'mine' },
        { id: 'db', label: 'PostgreSQL', caption: 'Learning state', icon: 'postgresql', ownership: 'team' },
        { id: 'dispatcher', label: 'Session Dispatcher', caption: 'Placement', icon: 'kubernetes', ownership: 'team' },
        { id: 'vm', label: 'KubeVirt Lab VM', caption: 'Isolated session', icon: 'kubevirt', ownership: 'team' },
        { id: 'kafka', label: 'Apache Kafka', caption: 'Validation events', icon: 'kafka', ownership: 'team' },
        { id: 'validation', label: 'Validation Engine', caption: 'State-based grading', icon: 'validation', ownership: 'team' },
        { id: 'overflow', label: 'EC2 Overflow', caption: 'Capacity fallback', icon: 'aws', ownership: 'team' },
      ],
      edges: [
        { from: 'learner', to: 'web', label: 'HTTPS', kind: 'request' },
        { from: 'web', to: 'keycloak', label: 'OIDC login', kind: 'request' },
        { from: 'web', to: 'api', label: 'API · console', kind: 'request' },
        { from: 'api', to: 'db', label: 'progress', kind: 'data' },
        { from: 'api', to: 'dispatcher', label: 'create session', kind: 'request' },
        { from: 'dispatcher', to: 'vm', label: 'on-prem first', kind: 'request' },
        { from: 'dispatcher', to: 'overflow', label: 'capacity overflow', kind: 'recovery' },
        { from: 'api', to: 'kafka', label: 'validate', kind: 'data' },
        { from: 'kafka', to: 'validation', label: 'consume event', kind: 'data' },
        { from: 'vm', to: 'validation', label: 'inspect state', kind: 'data' },
      ],
    },
    gallery: [
      {
        src: 'projects/cledyu/labs-catalog.png',
        alt: '난이도별 실습 목록과 필터가 보이는 Cledyu Labs 카탈로그 화면',
        caption: '난이도별 Lab을 탐색하고 실습을 시작하는 카탈로그',
      },
      {
        src: 'projects/cledyu/lab-detail.png',
        alt: 'Linux 기초 Lab의 실습 환경과 진행 순서를 안내하는 상세 화면',
        caption: '세션을 만들기 전에 실습 범위와 순서를 확인하는 상세 페이지',
      },
      {
        src: 'projects/cledyu/provisioning.png',
        alt: '전용 VM 세션 생성과 디스크 복제 진행 상태를 보여주는 프로비저닝 화면',
        caption: '세션 생성부터 자동 로그인까지 실제 인프라 상태를 사용자에게 전달',
      },
      {
        src: 'projects/cledyu/lab-session.png',
        alt: '단계 안내와 브라우저 터미널이 나란히 배치된 Cledyu 실습 세션 화면',
        caption: '명령 실행, 단계 검증, AI 힌트를 한 화면에서 연결한 실습 환경',
      },
      {
        src: 'projects/cledyu/my-learning.png',
        alt: '점수와 완료율, 진행 중 Lab을 보여주는 Cledyu 내 학습 화면',
        caption: '진행 중인 세션과 완료 이력을 다시 찾는 학습 현황',
      },
    ],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/requset700k/Cledyu' },
    ],
  },
  {
    slug: 'codebuddy',
    title: 'CodeBuddy',
    summary:
      'Pull Request 변경사항을 Bedrock Agent가 분석하고 GitHub 리뷰와 Slack 알림으로 전달하는 서버리스 코드 리뷰 시스템입니다.',
    role: 'Backend · Serverless · AI agent integration',
    team: '개인 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['Python', 'AWS Lambda', 'API Gateway', 'Amazon Bedrock', 'CloudFormation', 'GitHub API'],
    problem:
      'PR 리뷰 자동화는 단순 요약을 넘어 Webhook 검증, 긴 patch 보존, 결과 전달, 실패 처리를 함께 만족해야 했습니다.',
    contribution: [
      'GitHub Webhook에서 비동기 Review Worker와 Bedrock Agent로 이어지는 서버리스 흐름을 설계했습니다.',
      'HMAC-SHA256 Webhook 검증과 최소 권한 IAM, Secrets Manager 기반 비밀 관리를 적용했습니다.',
      'GitHub 댓글과 Slack 알림을 하나의 분석 결과에서 생성하고 102개 구조·계약 테스트로 검증했습니다.',
    ],
    decisions: [
      {
        title: 'Webhook 응답과 AI 분석 분리',
        body: '긴 모델 호출 때문에 GitHub Webhook이 시간 초과되지 않도록 Orchestrator와 Worker Lambda를 비동기로 분리했습니다.',
      },
      {
        title: '파일별 제한 대신 전체 patch 예산 사용',
        body: '큰 단일 파일의 중요한 후반부가 잘리지 않도록 전체 변경량이 예산 안이면 원문을 유지하고, 초과할 때만 제한합니다.',
      },
    ],
    troubleshooting: [
      {
        problem: '약 10,000자의 OpenAPI patch 후반부가 분석 입력에서 누락됐습니다.',
        cause: '모든 파일에 동일한 4,000자 제한을 먼저 적용했습니다.',
        solution: 'PR 전체에 30,000자 예산을 두고 예산을 넘을 때만 파일별 제한을 적용했습니다.',
        result: '실제 9,996자 patch가 끝까지 보존되는 회귀 테스트를 추가했습니다.',
      },
    ],
    architecture: {
      nodes: [
        { id: 'github', label: 'GitHub PR', caption: 'Webhook event', icon: 'github', ownership: 'external' },
        { id: 'gateway', label: 'API Gateway', caption: 'HMAC verification', icon: 'aws-api-gateway', ownership: 'mine' },
        { id: 'orchestrator', label: 'Orchestrator Lambda', caption: 'Async dispatch', icon: 'aws-lambda', ownership: 'mine' },
        { id: 'worker', label: 'Review Worker', caption: 'Agent invocation', icon: 'aws-lambda', ownership: 'mine' },
        { id: 'bedrock', label: 'Bedrock Agent', caption: 'Review reasoning', icon: 'amazon-bedrock', ownership: 'mine' },
        { id: 'delivery', label: 'GitHub · Slack', caption: 'Review delivery', icon: 'slack', ownership: 'external' },
      ],
      edges: [
        { from: 'github', to: 'gateway', label: 'signed webhook', kind: 'request' },
        { from: 'gateway', to: 'orchestrator', label: 'validated event', kind: 'request' },
        { from: 'orchestrator', to: 'worker', label: 'async invoke', kind: 'request' },
        { from: 'worker', to: 'bedrock', label: 'PR context', kind: 'data' },
        { from: 'bedrock', to: 'delivery', label: 'review result', kind: 'data' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/hjh6709/codebuddy-project' },
    ],
  },
  {
    slug: 'kagoshima-travel',
    title: 'Kagoshima Travel',
    summary:
      '여행 전 계획과 여행 중 다음 이동을 한 화면에서 관리하는 모바일 우선 여행 플래너입니다.',
    role: 'Full-stack · Product design · Deployment',
    team: '개인 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'PWA', 'Oracle Cloud', 'Caddy'],
    problem:
      '장소, 일정, 항공편, 준비물과 지도 정보가 흩어져 있어 여행 중 다음 행동을 빠르게 확인하기 어려웠습니다.',
    contribution: [
      'React PWA와 Go API, PostgreSQL 데이터 모델을 직접 설계하고 구현했습니다.',
      '여행·일정·장소·체크리스트와 로그인 없는 읽기 전용 공유 링크를 연결했습니다.',
      'Vercel 정적 웹과 Oracle Cloud VM의 Go API·Caddy 배포 및 복구 절차를 구성했습니다.',
    ],
    decisions: [
      {
        title: '모바일에서 오늘의 행동을 우선',
        body: '여행 전체 편집 기능과 현장에서 필요한 오늘 일정·지도 동선을 분리해 작은 화면에서도 다음 행동을 빠르게 찾도록 했습니다.',
      },
      {
        title: '브라우저와 데이터베이스 경계 분리',
        body: '웹은 PostgreSQL에 직접 연결하지 않고 모든 읽기와 변경을 Go API 계약을 통해 수행합니다.',
      },
    ],
    troubleshooting: [
      {
        problem: '공유 링크와 로그인 사용자 화면에서 같은 여행 데이터의 접근 조건이 달랐습니다.',
        cause: '편집 권한과 공개 조회 권한을 한 경로에서 처리하려 했습니다.',
        solution: '인증된 편집 API와 토큰 기반 읽기 전용 공유 경로를 분리했습니다.',
        result: '로그인 없이 일정을 확인하면서도 원본 여행 데이터의 변경 권한은 보호했습니다.',
      },
    ],
    architecture: {
      nodes: [
        { id: 'traveler', label: 'Traveler', caption: 'Mobile browser · PWA', icon: 'mobile', ownership: 'external' },
        { id: 'web', label: 'React Web', caption: 'Vite PWA · Vercel', icon: 'react', ownership: 'mine' },
        { id: 'api', label: 'Go API', caption: 'Oracle Cloud VM', icon: 'go', ownership: 'mine' },
        { id: 'db', label: 'PostgreSQL', caption: 'Trips · schedules', icon: 'postgresql', ownership: 'mine' },
        { id: 'places', label: 'Places · Maps', caption: 'Search · directions', icon: 'google-maps', ownership: 'external' },
        { id: 'share', label: 'Share Link', caption: 'Read-only access', icon: 'link', ownership: 'mine' },
      ],
      edges: [
        { from: 'traveler', to: 'web', label: 'plan · navigate', kind: 'request' },
        { from: 'web', to: 'api', label: 'REST API', kind: 'request' },
        { from: 'api', to: 'db', label: 'trip data', kind: 'data' },
        { from: 'web', to: 'places', label: 'place search', kind: 'request' },
        { from: 'api', to: 'share', label: 'share token', kind: 'data' },
        { from: 'share', to: 'web', label: 'read-only trip', kind: 'request' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/hjh6709/for_Kagoshima_travel' },
    ],
  },
  {
    slug: 'chilseongpa',
    title: 'Chilseongpa',
    summary:
      'GCP 주 환경과 AWS 대기 환경을 연결하고 장애 시 트래픽을 전환하는 하이브리드 멀티클라우드 운영 프로젝트입니다.',
    role: 'AWS infrastructure · Cross-cloud connectivity',
    team: '6인 팀 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Cloudflare', 'Prometheus', 'Grafana'],
    problem:
      '주 클라우드 장애에도 서비스를 이어가면서 두 환경의 애플리케이션 버전과 네트워크, 데이터 접근을 일관되게 유지해야 했습니다.',
    contribution: [
      'AWS Standby 환경의 VPC, Compute, Kubernetes 인프라와 접근 경로를 구성했습니다.',
      'GCP Cloud SQL을 AWS 환경에서도 사용할 수 있도록 교차 클라우드 연결과 접근 조건을 점검했습니다.',
      '모니터링 구성을 이전하고 Alert Rule을 검증하며 장애 전환 시 관측 공백을 줄였습니다.',
    ],
    decisions: [
      {
        title: '애플리케이션 Active–Standby로 범위 제한',
        body: '프로젝트 시간과 데이터 정합성 위험을 고려해 애플리케이션 계층 장애 전환에 집중하고 데이터베이스는 GCP에 유지했습니다.',
      },
      {
        title: '동일 버전의 두 환경 유지',
        body: 'GitHub Actions 배포가 GCP Primary와 AWS Standby에 같은 애플리케이션 버전을 전달하도록 구성했습니다.',
      },
    ],
    troubleshooting: [
      {
        problem: 'Failover 과정에서 새 Load Balancer 생성이 충돌하고 DNS 전환이 중단됐습니다.',
        cause: '이전 Failback에서 AWS 리소스만 삭제돼 Kubernetes 객체가 남아 있었습니다.',
        solution: 'Failover 초기에 잔여 Kubernetes 리소스를 정리한 뒤 Load Balancer와 라우팅을 순서대로 구성했습니다.',
        result: '재실행 시 리소스 충돌 없이 Standby 환경으로 전환되는 흐름을 확인했습니다.',
      },
    ],
    architecture: {
      nodes: [
        { id: 'user', label: 'User', caption: 'Service request', icon: 'browser', ownership: 'external' },
        { id: 'edge', label: 'Cloudflare Edge', caption: 'Health check · routing', icon: 'cloudflare', ownership: 'team' },
        { id: 'gcp', label: 'GCP Primary', caption: 'Kubernetes', icon: 'gcp', ownership: 'team' },
        { id: 'aws', label: 'AWS Standby', caption: 'Kubernetes', icon: 'aws', ownership: 'mine' },
        { id: 'db', label: 'Cloud SQL', caption: 'Shared application data', icon: 'google-cloud-sql', ownership: 'team' },
        { id: 'monitoring', label: 'Prometheus · Grafana', caption: 'Metrics · alerts', icon: 'prometheus', ownership: 'team' },
      ],
      edges: [
        { from: 'user', to: 'edge', label: 'HTTPS', kind: 'request' },
        { from: 'edge', to: 'gcp', label: 'primary route', kind: 'request' },
        { from: 'edge', to: 'aws', label: 'failover route', kind: 'recovery' },
        { from: 'gcp', to: 'db', label: 'application data', kind: 'data' },
        { from: 'aws', to: 'db', label: 'cross-cloud access', kind: 'data' },
        { from: 'gcp', to: 'monitoring', label: 'metrics', kind: 'data' },
        { from: 'aws', to: 'monitoring', label: 'standby metrics', kind: 'data' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/Seungmin-Jeong2001/Chilseongpa' },
    ],
  },
  {
    slug: 'pr-check-doctor',
    title: 'PR Check Doctor',
    summary:
      '실패한 GitHub PR 체크와 로그를 읽어 다음 행동을 하나의 안정적인 PR 코멘트로 정리하는 GitHub Action입니다.',
    role: 'Product design · GitHub API · Security',
    team: '개인 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['TypeScript', 'GitHub Actions', 'GitHub API', 'CI/CD', 'Security'],
    problem:
      '여러 CI Job이 동시에 실패하면 개발자가 각각의 로그를 열어 원인과 재현 명령을 다시 정리해야 했습니다.',
    contribution: [
      'Check Run과 Workflow Job을 페이지네이션하며 수집하고 실패 로그의 유효 구간을 추출했습니다.',
      '토큰, 비밀번호, API Key와 Private Key 형태를 코멘트 생성 전에 마스킹했습니다.',
      'PASS, WARN, BLOCK 판정과 단일 PR 코멘트 갱신 방식으로 반복 실행 시 알림 노이즈를 줄였습니다.',
    ],
    decisions: [
      {
        title: '새 댓글 대신 하나의 댓글 갱신',
        body: 'Workflow 재실행마다 코멘트가 쌓이지 않도록 식별 가능한 기존 코멘트를 찾아 최신 결과로 업데이트합니다.',
      },
      {
        title: 'fork PR에서 코드 실행과 코멘트 권한 분리',
        body: '외부 코드가 쓰기 권한 토큰과 함께 실행되지 않도록 CI와 workflow_run 기반 진단 작업을 분리할 수 있게 했습니다.',
      },
    ],
    troubleshooting: [
      {
        problem: '체크 수가 많은 PR에서 일부 실패가 진단 결과에 나타나지 않았습니다.',
        cause: 'GitHub API 첫 페이지 응답만 처리했습니다.',
        solution: 'Check Run과 Workflow Job 수집에 페이지네이션을 적용했습니다.',
        result: '큰 PR에서도 실패 체크가 조용히 누락되지 않도록 테스트로 고정했습니다.',
      },
    ],
    architecture: {
      nodes: [
        { id: 'ci', label: 'GitHub CI', caption: 'Failed checks', icon: 'github-actions', ownership: 'external' },
        { id: 'collector', label: 'Check Collector', caption: 'Runs · jobs · logs', icon: 'github', ownership: 'mine' },
        { id: 'redactor', label: 'Secret Redactor', caption: 'Sensitive value masking', icon: 'shield', ownership: 'mine' },
        { id: 'classifier', label: 'Failure Classifier', caption: 'PASS · WARN · BLOCK', icon: 'filter', ownership: 'mine' },
        { id: 'renderer', label: 'Comment Renderer', caption: 'Actionable summary', icon: 'comment', ownership: 'mine' },
        { id: 'pr', label: 'Pull Request', caption: 'Stable updated comment', icon: 'pull-request', ownership: 'external' },
      ],
      edges: [
        { from: 'ci', to: 'collector', label: 'checks · logs', kind: 'request' },
        { from: 'collector', to: 'redactor', label: 'raw excerpts', kind: 'data' },
        { from: 'redactor', to: 'classifier', label: 'safe evidence', kind: 'data' },
        { from: 'classifier', to: 'renderer', label: 'verdict', kind: 'data' },
        { from: 'renderer', to: 'pr', label: 'create or update', kind: 'request' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/hjh6709/pr-check-doctor' },
      { label: 'GitHub Marketplace', href: 'https://github.com/marketplace/actions/pr-check-doctor' },
    ],
  },
];
