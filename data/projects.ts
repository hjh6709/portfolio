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
  kind: 'request' | 'data' | 'security' | 'operations' | 'recovery';
};

export type ArchitectureZone = {
  id: string;
  label: string;
  caption: string;
  kind: 'client' | 'edge' | 'application' | 'data' | 'runtime' | 'external' | 'operations' | 'recovery';
  nodeIds: string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type FeatureStory = ProjectImage & {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: string;
  role: string;
  team: string;
  period: string;
  featured: boolean;
  technologies: string[];
  technologyRoles: Array<{
    name: string;
    icon: string;
    role: string;
  }>;
  heroImage: ProjectImage;
  architectureImage?: ProjectImage;
  challenge: string;
  responsibilities: string[];
  journey?: Array<{
    label: string;
    title: string;
    description: string;
    href?: string;
  }>;
  featureStories: FeatureStory[];
  outcomes: string[];
  learnings?: string[];
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
    zones: ArchitectureZone[];
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  gallery: ProjectImage[];
  evidence: Array<{ label: string; href: string }>;
};

export const projects: Project[] = [
  {
    slug: 'cledyu',
    title: 'Cledyu',
    summary:
      '브라우저에서 전용 VM을 열고 직접 명령을 실행하며 배우는 클라우드 엔지니어링 실습 플랫폼입니다.',
    status: '팀 프로젝트 · 서비스 배포',
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
    technologyRoles: [
      {
        name: 'Next.js',
        icon: 'nextjs',
        role: '랜딩, 인증 이후 Lab 탐색, 프로비저닝, 세션, 학습 현황까지 사용자 흐름을 구현했습니다.',
      },
      {
        name: 'Go',
        icon: 'go',
        role: '세션 생성과 복귀, 만료, 종료 상태를 다루는 API 계약과 프론트엔드 연동을 담당했습니다.',
      },
      {
        name: 'WebSocket',
        icon: 'link',
        role: '브라우저 xterm.js와 KubeVirt console을 연결해 실제 VM 명령 입출력을 전달했습니다.',
      },
      {
        name: 'Keycloak',
        icon: 'keycloak',
        role: 'OIDC 로그인과 소셜 인증 진입점을 서비스 화면에 연결하고 역할별 인증 경계를 점검했습니다.',
      },
      {
        name: 'Kubernetes · KubeVirt',
        icon: 'kubevirt',
        role: '학습자별 격리 VM 세션과 console 접근에 필요한 최소 RBAC 및 Namespace 바인딩을 검증했습니다.',
      },
      {
        name: 'Kafka · Validation',
        icon: 'kafka',
        role: '실습 단계 검증 요청과 결과가 이벤트 파이프라인을 거쳐 화면에 반영되는 흐름을 연결했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/cledyu/lab-session.png',
      alt: 'Cledyu Lab 단계 안내와 브라우저 터미널을 함께 보여주는 실습 화면',
      caption: '설명, 명령 실행, 검증, 힌트를 한 화면에 연결한 실제 Lab 세션',
      width: 2916,
      height: 1690,
    },
    architectureImage: {
      src: 'projects/cledyu/architecture.png',
      alt: 'Cledyu 학습자 요청부터 인증, 세션 배치, KubeVirt VM, 검증, 재해 복구까지의 실제 서비스 아키텍처',
      caption: '실제 구현 자료를 기준으로 정리한 사용자 요청, 인증, 세션, 검증, 오버플로와 DR 흐름',
      width: 3840,
      height: 2160,
    },
    challenge:
      '가상머신을 만드는 것만으로는 실습 서비스가 완성되지 않습니다. 로그인부터 Lab 선택, 세션 생성, 터미널 연결, 단계 검증과 재접속까지 끊기지 않는 경험으로 연결해야 했습니다.',
    responsibilities: [
      'API 서버가 재시작되면 메모리에 있던 세션 진행 상태가 사라져 재접속한 사용자의 요청이 전부 실패하는 문제가 있었습니다. 진행 상태 저장소에서 세션을 찾지 못하면 VM 프로바이더 쪽 실제 상태를 다시 조회해 최소한의 진행 상태를 복구하는 API를 설계했고, 그 결과 서버가 재시작돼도 사용자가 이어서 실습할 수 있게 됐습니다.',
      'API가 쿠버네티스 위 VM 콘솔에 접근할 권한이 빠져 403 오류가 발생하는 문제가 있었습니다. 로그와 요청 흐름을 추적해 원인을 좁히고, 필요한 조회 권한만 담은 ClusterRole을 만든 뒤 실습 Namespace가 새로 생길 때마다 그 권한이 자동으로 연결되도록 구성했습니다. 그 결과 권한을 수동으로 매번 부여할 필요가 없어졌고 재발하지 않았습니다.',
      'Next.js 화면과 Go Session API, WebSocket 터미널 사이의 상태 계약을 연결해 랜딩부터 로그인, Lab 탐색, 프로비저닝, 실습, 내 학습까지 웹 사용자 흐름을 구현했습니다.',
    ],
    featureStories: [
      {
        src: 'projects/cledyu/labs-catalog.png',
        alt: '난이도와 진행 상태를 함께 보여주는 Cledyu Labs 카탈로그 화면',
        caption: '진행 상태를 확인하고 바로 시작하거나 이어갈 수 있는 Lab 탐색 화면',
        width: 2922,
        height: 1682,
        title: '실습을 고르는 순간부터 현재 상태가 보이도록',
        description: '난이도와 예상 시간뿐 아니라 진행 중인 세션과 완료 이력을 함께 표시했습니다.',
      },
      {
        src: 'projects/cledyu/provisioning.png',
        alt: 'Cledyu 전용 VM 생성 단계를 표시하는 프로비저닝 진행 화면',
        caption: '세션 생성, 디스크 복제, VM 시작, 자동 로그인 상태를 단계별로 전달',
        width: 1914,
        height: 1724,
        title: '기다림을 막연한 로딩으로 남기지 않기',
        description: '백엔드가 전달하는 실제 준비 상태를 단계와 진행률로 바꿔 사용자가 현재 상황을 알 수 있게 했습니다.',
      },
      {
        src: 'projects/cledyu/lab-session.png',
        alt: '단계 설명과 Ubuntu 터미널이 나란히 배치된 Cledyu 실습 화면',
        caption: '실습 설명을 놓치지 않고 바로 옆 터미널에서 명령을 실행하는 구성',
        width: 2916,
        height: 1690,
        title: '읽고 실행하고 검증하는 흐름을 한 화면에',
        description: '현재 작업과 완료 조건을 터미널 가까이에 두고 단계 검증과 AI 힌트를 다음 행동으로 연결했습니다.',
      },
      {
        src: 'projects/cledyu/my-learning.png',
        alt: '진행 중인 Lab과 완료 현황을 보여주는 Cledyu 내 학습 화면',
        caption: '중단한 실습을 다시 찾고 전체 학습 진행을 확인하는 개인 현황',
        width: 1884,
        height: 1852,
        title: '세션이 끝나도 학습 기록은 이어지도록',
        description: '진행 중인 Lab과 완료 이력을 모아 재접속 이후에도 학습 맥락을 잃지 않게 했습니다.',
      },
    ],
    outcomes: [
      '사용자별 KubeVirt VM과 브라우저 WebSocket 터미널을 연결해 실제 명령을 실행하는 실습 환경을 구현했습니다.',
      '세션을 활성·완료·실패·만료 상태로 구분하고 각 상태에 맞는 생성·복귀·종료 동선을 구현했습니다.',
      'KubeVirt console 조회 권한과 Lab Namespace별 RoleBinding을 최소 범위로 구성해 터미널 연결을 복구했습니다.',
      '로그인부터 Lab 선택, VM 프로비저닝, 터미널 접속, 단계 검증까지 실제 Kubernetes 환경에서 확인했습니다.',
    ],
    learnings: [
      '인프라 리소스가 Ready여도 사용자가 실제로 터미널에 접속할 수 있는지는 별도로 검증해야 했습니다.',
      'API 상태, RBAC, 화면 안내를 하나의 세션 lifecycle로 설계해야 복귀와 실패 동선이 일관됩니다.',
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
      zones: [
        {
          id: 'access',
          label: '접속 경계',
          caption: 'Browser · AWS Edge · Private tunnel',
          kind: 'edge',
          nodeIds: ['learner', 'edge', 'tunnel', 'traefik'],
        },
        {
          id: 'application',
          label: '서비스 계층',
          caption: 'Web · API/placement · Authentication · AI',
          kind: 'application',
          nodeIds: ['web', 'api', 'keycloak', 'ai'],
        },
        {
          id: 'state',
          label: '상태·이벤트 계층',
          caption: 'Persistent state · Event pipeline · Grading',
          kind: 'data',
          nodeIds: ['db', 'kafka', 'validation'],
        },
        {
          id: 'runtime',
          label: '실습 실행 계층',
          caption: 'Placement · Per-user VM · Storage',
          kind: 'runtime',
          nodeIds: ['vm'],
        },
        {
          id: 'recovery',
          label: '확장·재해 복구',
          caption: 'Capacity overflow · DR · Backup',
          kind: 'recovery',
          nodeIds: ['overflow', 'dr', 's3'],
        },
      ],
      nodes: [
        { id: 'learner', label: 'Learner', caption: 'Browser', icon: 'browser', ownership: 'external' },
        { id: 'edge', label: 'AWS Edge', caption: 'Route 53 · ACM · ALB', icon: 'aws', ownership: 'team' },
        { id: 'tunnel', label: 'Caddy · Tailscale', caption: 'Public proxy · Tailnet', icon: 'caddy-tailscale', ownership: 'team' },
        { id: 'traefik', label: 'Traefik Ingress', caption: 'Ingress · 내부 TLS', icon: 'traefik', ownership: 'team' },
        { id: 'web', label: 'Web', caption: 'Next.js · xterm.js', icon: 'nextjs', ownership: 'mine' },
        { id: 'keycloak', label: 'Keycloak', caption: 'OIDC 인증', icon: 'keycloak', ownership: 'team' },
        { id: 'ai', label: 'AI Tutor', caption: 'Gemini · ChromaDB', icon: 'gemini', ownership: 'team' },
        { id: 'api', label: 'Session API', caption: 'Go · WebSocket · Dispatcher', icon: 'go', ownership: 'mine' },
        { id: 'db', label: 'PostgreSQL', caption: '학습 · 세션 상태', icon: 'postgresql', ownership: 'team' },
        { id: 'vm', label: 'KubeVirt VM Pool', caption: 'Longhorn · 격리 세션', icon: 'kubevirt-longhorn', ownership: 'team' },
        { id: 'kafka', label: 'Apache Kafka', caption: '검증 이벤트', icon: 'kafka', ownership: 'team' },
        { id: 'validation', label: 'Validation Engine', caption: '상태 기반 채점', icon: 'validation', ownership: 'team' },
        { id: 'overflow', label: 'EC2 Overflow', caption: '용량 초과 대체', icon: 'amazon-ec2', ownership: 'team' },
        { id: 'dr', label: 'Amazon EKS DR', caption: '재해 복구 클러스터', icon: 'amazon-eks', ownership: 'team' },
        { id: 's3', label: 'Amazon S3', caption: '백업 · 복구 소스', icon: 'amazon-s3', ownership: 'external' },
      ],
      edges: [
        { from: 'learner', to: 'edge', label: 'HTTPS', kind: 'request' },
        { from: 'edge', to: 'tunnel', label: '443 전달', kind: 'request' },
        { from: 'tunnel', to: 'traefik', label: 'Tailscale 터널', kind: 'request' },
        { from: 'traefik', to: 'web', label: 'Ingress 라우팅', kind: 'request' },
        { from: 'web', to: 'keycloak', label: 'OIDC login', kind: 'security' },
        { from: 'web', to: 'api', label: 'API 요청', kind: 'request' },
        { from: 'api', to: 'ai', label: '단계별 AI 힌트', kind: 'request' },
        { from: 'api', to: 'db', label: '학습·세션 상태 저장', kind: 'data' },
        { from: 'api', to: 'vm', label: '세션 생성 · 온프렘 우선', kind: 'request' },
        { from: 'api', to: 'overflow', label: '용량 초과', kind: 'recovery' },
        { from: 'overflow', to: 'dr', label: '장애 시 DR 전환', kind: 'recovery' },
        { from: 's3', to: 'dr', label: '백업 복구', kind: 'recovery' },
        { from: 'api', to: 'kafka', label: '검증 요청', kind: 'data' },
        { from: 'kafka', to: 'validation', label: '이벤트 소비', kind: 'data' },
        { from: 'vm', to: 'validation', label: 'VM 상태 확인', kind: 'data' },
        { from: 'validation', to: 'api', label: '채점 결과 반환', kind: 'data' },
      ],
    },
    gallery: [
      {
        src: 'projects/cledyu/labs-catalog.png',
        alt: '난이도별 실습 목록과 필터가 보이는 Cledyu Labs 카탈로그 화면',
        caption: '난이도별 Lab을 탐색하고 실습을 시작하는 카탈로그',
        width: 2922,
        height: 1682,
      },
      {
        src: 'projects/cledyu/lab-detail.png',
        alt: 'Linux 기초 Lab의 실습 환경과 진행 순서를 안내하는 상세 화면',
        caption: '세션을 만들기 전에 실습 범위와 순서를 확인하는 상세 페이지',
        width: 2944,
        height: 1550,
      },
      {
        src: 'projects/cledyu/provisioning.png',
        alt: '전용 VM 세션 생성과 디스크 복제 진행 상태를 보여주는 프로비저닝 화면',
        caption: '세션 생성부터 자동 로그인까지 실제 인프라 상태를 사용자에게 전달',
        width: 1914,
        height: 1724,
      },
      {
        src: 'projects/cledyu/lab-session.png',
        alt: '단계 안내와 브라우저 터미널이 나란히 배치된 Cledyu 실습 세션 화면',
        caption: '명령 실행, 단계 검증, AI 힌트를 한 화면에서 연결한 실습 환경',
        width: 2916,
        height: 1690,
      },
      {
        src: 'projects/cledyu/my-learning.png',
        alt: '점수와 완료율, 진행 중 Lab을 보여주는 Cledyu 내 학습 화면',
        caption: '진행 중인 세션과 완료 이력을 다시 찾는 학습 현황',
        width: 1884,
        height: 1852,
      },
    ],
    evidence: [
      {
        label: '내가 올린 PR 62건',
        href: 'https://github.com/requset700k/Cledyu/pulls?q=is%3Apr+author%3Ahjh6709',
      },
      { label: '팀 저장소 (6인)', href: 'https://github.com/requset700k/Cledyu' },
    ],
  },
  {
    slug: 'codebuddy',
    title: 'CodeBuddy',
    summary:
      'GitHub Webhook을 안전하게 검증하고 PR 변경 분석을 비동기로 처리해 GitHub 리뷰와 Slack으로 전달하는 서버리스 파이프라인입니다.',
    status: '교육과정 통합 프로젝트 · 구현 완료',
    role: 'Backend · Cloud · Serverless',
    team: 'KT 클라우드 부트캠프 · 개인 수행',
    period: '2026',
    featured: true,
    technologies: ['Python', 'AWS Lambda', 'API Gateway', 'Amazon Bedrock', 'CloudFormation', 'GitHub API'],
    technologyRoles: [
      {
        name: 'Python',
        icon: 'python',
        role: 'Webhook 검증, 변경 수집, 프롬프트 구성, 결과 전달을 담당하는 Lambda 로직을 구현했습니다.',
      },
      {
        name: 'AWS Lambda',
        icon: 'aws-lambda',
        role: '빠른 Webhook 응답과 긴 AI 분석을 Orchestrator와 Worker로 분리해 비동기로 실행했습니다.',
      },
      {
        name: 'Amazon Bedrock',
        icon: 'amazon-bedrock',
        role: 'PR 전체 변경 맥락과 입력 예산을 관리하며 실행 가능한 코드 리뷰 결과를 생성했습니다.',
      },
      {
        name: 'GitHub API',
        icon: 'github',
        role: '서명된 이벤트 수신부터 diff 수집과 PR 코멘트 갱신까지 자동화했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/codebuddy/architecture.svg',
      alt: 'CodeBuddy GitHub Webhook부터 Bedrock Agent 리뷰 전달까지의 서버리스 아키텍처',
      caption: 'Webhook 응답과 AI 분석을 분리한 비동기 코드 리뷰 파이프라인',
      width: 1600,
      height: 650,
    },
    challenge:
      '부트캠프 통합 프로젝트로 시작했지만, 과제 요건을 채우는 것과 실제로 믿을 수 있는 리뷰를 내보내는 것은 다른 문제였습니다. AI가 리뷰를 생성하는 것보다 GitHub Webhook을 안전하게 받고, 긴 변경 내용을 보존하며, 지연과 실패가 있어도 결과를 전달하는 전체 파이프라인이 중요했습니다.',
    responsibilities: [
      'Webhook 응답을 지연 없이 처리해야 하는 문제와 리뷰 생성 자체는 시간이 걸리는 문제가 함께 있었습니다. 요청을 받는 Lambda와 실제 분석을 처리하는 Lambda를 분리해, 앞단이 즉시 응답하고 뒷단이 비동기로 Bedrock Agent를 호출하도록 구성했고, 그 결과 Webhook 타임아웃 없이 안정적으로 처리할 수 있었습니다.',
      'PR 내용을 AI에 전달할 때 파일별 글자 수 제한 때문에 전체 예산이 남았는데도 내용이 잘려 AI가 잘못된 리뷰를 내는 문제를 발견했습니다. 전체 파일 크기를 먼저 합산해 예산 안에 들어오면 파일별 제한 없이 온전히 전달하도록 로직을 바꾸고, 이 동작을 103건의 자동화 테스트로 검증했습니다.',
      'HMAC 검증, Secrets Manager, 최소 권한 IAM으로 외부 요청과 비밀값 경계를 구성하고, GitHub 댓글과 Slack 알림 계약을 테스트로 고정했습니다.',
    ],
    featureStories: [
      {
        src: 'projects/codebuddy/architecture.svg',
        alt: 'CodeBuddy의 비동기 Lambda와 Bedrock Agent 코드 리뷰 처리 구조',
        caption: '즉시 응답이 필요한 Webhook과 시간이 걸리는 AI 분석을 서로 분리',
        width: 1600,
        height: 900,
        title: 'Webhook은 빠르게, 분석은 안정적으로',
        description: 'Orchestrator가 요청을 검증해 즉시 응답하고 Review Worker가 긴 분석과 전달을 맡도록 나눴습니다.',
      },
    ],
    outcomes: [
      '긴 모델 호출이 Webhook 응답 시간을 막지 않는 비동기 처리 구조를 완성했습니다.',
      '전체 변경량 기준 입력 예산으로 중요한 patch 후반부가 잘리는 문제를 수정했습니다.',
      '보안과 전달 계약을 포함한 102개 테스트로 서버리스 흐름을 검증했습니다.',
    ],
    learnings: [
      'AI 모델 자체보다 Webhook 검증, 입력 예산, 비동기 전달과 실패 경로가 서비스 신뢰성을 좌우했습니다.',
    ],
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
        problem: '약 10,000자의 OpenAPI patch 후반부가 분석 입력에서 누락돼, 존재하지 않는 코드를 지적하는 리뷰가 나갔습니다. 겉보기에는 정상적인 보고라 과제 요건상으로는 문제가 드러나지 않았습니다.',
        cause: '모든 파일에 동일한 4,000자 제한을 먼저 적용했습니다.',
        solution: 'PR 전체에 30,000자 예산을 두고 예산을 넘을 때만 파일별 제한을 적용했습니다.',
        result: '실제 9,996자 patch가 끝까지 보존되는 회귀 테스트를 추가했습니다.',
      },
    ],
    architecture: {
      zones: [
        {
          id: 'source',
          label: '이벤트 원천',
          caption: 'Signed GitHub event',
          kind: 'client',
          nodeIds: ['github'],
        },
        {
          id: 'ingress',
          label: 'AWS 수신 경계',
          caption: 'Public endpoint · Signature verification',
          kind: 'edge',
          nodeIds: ['gateway'],
        },
        {
          id: 'compute',
          label: '비동기 실행 계층',
          caption: 'Fast response · Deferred analysis',
          kind: 'application',
          nodeIds: ['orchestrator', 'worker'],
        },
        {
          id: 'inference',
          label: 'AI 추론 계층',
          caption: 'Managed agent runtime',
          kind: 'external',
          nodeIds: ['bedrock'],
        },
        {
          id: 'delivery',
          label: '결과 전달',
          caption: 'Pull Request · Team notification',
          kind: 'external',
          nodeIds: ['delivery'],
        },
      ],
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
    title: 'Map Planner',
    summary:
      '여행 전 계획과 여행 중 다음 이동을 한 화면에서 관리하는 모바일 우선 여행 플래너입니다. 부모님의 가고시마 여행을 위해 만들기 시작했고, 지금은 상하이 여행에 실제로 쓰이며 도시에 종속되지 않는 구조로 넓혔습니다.',
    status: '운영 중 · 화면 개선 진행 중',
    role: 'Full-stack · Product design · Deployment',
    team: '개인 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'PWA', 'Oracle Cloud', 'Caddy'],
    technologyRoles: [
      {
        name: 'React · PWA',
        icon: 'react',
        role: '여행 전 편집과 현장 확인을 모바일 화면에 맞추고 Mac과 모바일에서 설치형 앱 흐름을 검증했습니다.',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        role: '여행, 일정, 장소, 체크리스트와 API 응답 계약을 타입으로 고정했습니다.',
      },
      {
        name: 'Go',
        icon: 'go',
        role: '인증된 편집 API, 읽기 전용 공유 경로, Google Places 프록시를 구현했습니다.',
      },
      {
        name: 'PostgreSQL · Supabase',
        icon: 'supabase',
        role: '여행과 일정, 장소 사이의 관계를 모델링하고 브라우저가 DB에 직접 접근하지 않도록 분리했습니다.',
      },
      {
        name: 'Vercel',
        icon: 'vercel',
        role: '정적 PWA를 배포하고 실제 모바일 사용 환경에서 화면과 설치 동작을 검증했습니다.',
      },
      {
        name: 'Oracle Cloud · Caddy',
        icon: 'caddy',
        role: 'Go API를 VM에 배포하고 HTTPS 종료와 reverse proxy, 재시작 절차를 구성했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/kagoshima-travel/live/map-current.png',
      alt: '여행 도우미 앱에서 저장 장소와 현재 위치를 확인하는 실제 지도 화면',
      caption: '상하이 여행에서 실제로 사용한 화면. 설치형 앱에서 Google 지도와 저장 장소, 현재 위치를 확인합니다.',
      width: 908,
      height: 1716,
    },
    architectureImage: {
      src: 'projects/kagoshima-travel/service-flow.svg',
      alt: 'Map Planner 실제 배포 구성과 외부 서비스 연결 흐름',
      caption: 'Vercel React PWA, Oracle Cloud의 Caddy와 Go API, Supabase PostgreSQL 및 Google 서비스 연결 구조',
      width: 1920,
      height: 1080,
    },
    challenge:
      '여행 준비 때 필요한 편집 기능과 현장에서 바로 확인해야 하는 다음 일정은 사용 맥락이 달랐습니다. 작은 화면에서 필요한 정보가 먼저 보이면서도 공유 권한은 안전하게 분리해야 했습니다.',
    responsibilities: [
      '여행 기간을 줄이는 요청과 새 일정을 추가하는 요청이 동시에 들어오면 기간 밖 일정이 남는 문제가 있었습니다. 검증 로직을 데이터베이스 트리거로 옮기고 검증하는 동안 해당 여행 행에 잠금을 걸어, 두 요청이 동시에 들어와도 정합성이 깨지지 않도록 만들었습니다.',
      '배포 후 새 버전이 정상 동작하는지 확인하지 않고 넘어가면 장애가 그대로 노출되는 문제가 있었습니다. 새 바이너리를 대기 상태로 올리고 systemd로 재시작한 뒤 헬스체크 엔드포인트를 폴링해 정상 응답이 올 때까지 기다리는 배포 스크립트를 만들고, 실패하면 직전 바이너리로 자동 롤백하도록 구성했습니다.',
      'React PWA, Go API, PostgreSQL 데이터 모델을 설계하고, 여행·일정·장소·체크리스트와 읽기 전용 공유 링크를 하나의 서비스로 연결했습니다.',
    ],
    journey: [
      {
        label: '공개 탐색',
        title: '서비스 이해',
        description: '첫 화면에서 여행 준비와 현장 이동을 연결하는 서비스 목적을 확인합니다.',
        href: 'https://kagoshima.hjh-dev.site/',
      },
      {
        label: '샘플 체험',
        title: '가입 전 사용',
        description: '계정 없이 샘플 여행의 일정, 동선, 체크리스트를 먼저 사용해 봅니다.',
        href: 'https://kagoshima.hjh-dev.site/demo',
      },
      {
        label: '로그인 · 회원가입',
        title: '개인 공간 진입',
        description: '이메일 로그인 또는 2단계 회원가입을 거쳐 개인 여행 데이터에 접근합니다.',
        href: 'https://kagoshima.hjh-dev.site/manage',
      },
      {
        label: '여행 관리',
        title: '계획 편집',
        description: '여행을 만들고 장소, 항공편, 일정, 준비물을 한 흐름에서 정리합니다.',
      },
      {
        label: '공유',
        title: '읽기 전용 전달',
        description:
          '동행자는 로그인 없이 토큰 링크로 필요한 여행 정보만 확인합니다. 내부 메모처럼 공개하면 안 되는 필드는 공유 응답 구조에서 아예 제외했습니다.',
      },
    ],
    featureStories: [
      {
        src: 'projects/kagoshima-travel/live/today.png',
        alt: '출발 준비와 첫날 동선을 한눈에 보여주는 Map Planner 오늘 화면',
        caption: '여행 단계, 첫 일정, 환율과 체크리스트를 모은 현재 운영 화면',
        width: 1280,
        height: 720,
        title: '현장에서 필요한 다음 행동을 먼저',
        description: '출발까지 남은 시간과 첫 일정, 이동 경로, 준비 항목을 한 화면에 모았습니다. 사용자는 여러 메뉴를 오가지 않고 지금 확인해야 할 행동부터 시작할 수 있습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/schedule.png',
        alt: '날짜별 일정을 확인하고 이동 순서를 관리하는 Map Planner 일정 화면',
        caption: '여행 전체 일정을 날짜별 동선으로 정리한 현재 운영 화면',
        width: 1280,
        height: 720,
        title: '계획은 날짜별 동선으로 읽히도록',
        description: '장소 목록이 아니라 하루의 이동 순서로 일정을 구성했습니다. 여행 전에는 전체 계획을 검토하고 현장에서는 현재 날짜의 다음 장소를 바로 찾을 수 있습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/map-current.png',
        alt: '저장한 장소와 현재 위치를 보여주는 Map Planner 지도 화면',
        caption: '저장 장소와 현재 위치를 실제 지도 위에서 확인하는 현재 운영 화면',
        width: 908,
        height: 1716,
        title: '저장한 장소를 실제 이동 경로로 연결',
        description: '일정에 담은 장소를 지도에서 다시 검색하지 않도록 저장 장소와 날짜별 경로를 연결했습니다. 계획과 현장 이동 사이의 정보 단절을 줄였습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/share.png',
        alt: '로그인 없이 여행 일정을 확인하는 Map Planner 읽기 전용 공유 화면',
        caption: '동행자가 계정 없이 필요한 여행 정보만 확인하는 현재 공유 화면',
        width: 520,
        height: 960,
        title: '동행자에게는 필요한 정보만 공유',
        description: '공유 토큰으로 읽기 전용 화면을 제공하고 원본 여행의 편집 권한은 분리했습니다. 동행자는 가입 과정 없이 일정과 동선을 확인할 수 있습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/login.png',
        alt: '개인 여행 관리로 진입하는 Map Planner 이메일 로그인 화면',
        caption: '공개 탐색과 개인 여행 편집의 경계를 구분하는 현재 로그인 화면',
        width: 520,
        height: 960,
        title: '공개 탐색과 개인 편집의 경계를 명확하게',
        description: '샘플과 공유 여행은 바로 열고 여행 생성과 편집은 인증 이후에 제공합니다. 사용 목적에 맞춰 진입 경로와 권한 경계를 나눴습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/register.png',
        alt: '이메일 확인과 비밀번호 설정으로 이어지는 Map Planner 회원가입 화면',
        caption: '이메일 소유 확인 뒤 계정을 만드는 현재 2단계 회원가입 화면',
        width: 520,
        height: 960,
        title: '회원가입은 단계와 완료 조건이 보이도록',
        description: '이메일 인증과 비밀번호 설정을 분리하고 현재 단계를 표시했습니다. 작은 화면에서도 사용자가 무엇을 완료했고 다음에 무엇을 해야 하는지 놓치지 않게 했습니다.',
      },
    ],
    outcomes: [
      '프론트엔드부터 API, 데이터베이스, 배포까지 개인 프로젝트의 전체 운영 경로를 완성했습니다.',
      '편집 권한과 토큰 기반 읽기 전용 공유 경로를 분리해 공개 범위를 명확히 했습니다.',
      '모바일과 Mac에서 설치형 PWA를 직접 실행하며 실제 여행 상황의 화면과 이동 흐름을 검증했습니다.',
    ],
    learnings: [
      '여행 전 편집과 현장 확인은 같은 데이터라도 정보 우선순위와 화면 밀도가 달라야 했습니다.',
    ],
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
      zones: [
        {
          id: 'client',
          label: '사용자 클라이언트',
          caption: 'Installable mobile web app',
          kind: 'client',
          nodeIds: ['traveler', 'web'],
        },
        {
          id: 'delivery',
          label: '프런트엔드 배포',
          caption: 'Static delivery · HTTPS',
          kind: 'edge',
          nodeIds: ['vercel'],
        },
        {
          id: 'backend',
          label: 'OCI 애플리케이션',
          caption: 'TLS termination · Domain API',
          kind: 'application',
          nodeIds: ['caddy', 'api'],
        },
        {
          id: 'data',
          label: '관리형 데이터',
          caption: 'Relational trip data',
          kind: 'data',
          nodeIds: ['db'],
        },
        {
          id: 'maps',
          label: '외부 지도 연동',
          caption: 'Place search · Directions',
          kind: 'external',
          nodeIds: ['places'],
        },
        {
          id: 'operations',
          label: '배포 자동화',
          caption: 'Frontend · API delivery',
          kind: 'operations',
          nodeIds: ['actions'],
        },
      ],
      nodes: [
        { id: 'traveler', label: 'Traveler', caption: 'Mobile browser · PWA', icon: 'mobile', ownership: 'external' },
        { id: 'web', label: 'React PWA', caption: 'Vite · installable web app', icon: 'react', ownership: 'mine' },
        { id: 'vercel', label: 'Vercel', caption: 'Frontend delivery · HTTPS', icon: 'vercel', ownership: 'external' },
        { id: 'caddy', label: 'Caddy', caption: 'TLS termination · reverse proxy', icon: 'caddy', ownership: 'mine' },
        { id: 'api', label: 'Go API', caption: 'Oracle Cloud VM', icon: 'go', ownership: 'mine' },
        { id: 'db', label: 'Supabase PostgreSQL', caption: 'Trips · schedules · places', icon: 'supabase', ownership: 'mine' },
        { id: 'places', label: 'Places · Maps', caption: 'Search · directions', icon: 'google-maps', ownership: 'external' },
        { id: 'actions', label: 'GitHub Actions', caption: 'Build · deploy workflow', icon: 'github-actions', ownership: 'mine' },
      ],
      edges: [
        { from: 'traveler', to: 'vercel', label: 'HTTPS 접속', kind: 'request' },
        { from: 'vercel', to: 'web', label: 'PWA 정적 자산', kind: 'request' },
        { from: 'web', to: 'caddy', label: 'API 요청', kind: 'request' },
        { from: 'caddy', to: 'api', label: 'Reverse proxy', kind: 'request' },
        { from: 'api', to: 'db', label: 'trip data', kind: 'data' },
        { from: 'api', to: 'places', label: 'Places proxy', kind: 'request' },
        { from: 'actions', to: 'vercel', label: 'Frontend deploy', kind: 'operations' },
        { from: 'actions', to: 'api', label: 'API build · deploy', kind: 'operations' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'Live service', href: 'https://kagoshima.hjh-dev.site/' },
      { label: 'Sample trip', href: 'https://kagoshima.hjh-dev.site/demo' },
      { label: 'GitHub repository', href: 'https://github.com/hjh6709/for_Kagoshima_travel' },
    ],
  },
  {
    slug: 'pr-check-doctor',
    title: 'PR Check Doctor',
    summary:
      '실패한 GitHub PR 체크와 로그를 읽어 다음 행동을 하나의 안정적인 PR 코멘트로 정리하는 GitHub Action입니다.',
    status: '오픈소스 · Marketplace 배포',
    role: 'Product design · GitHub API · Security',
    team: '개인 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['TypeScript', 'GitHub Actions', 'GitHub API', 'CI/CD', 'Security'],
    technologyRoles: [
      {
        name: 'TypeScript',
        icon: 'typescript',
        role: '체크 수집, 로그 가공, 판정, 코멘트 렌더링 계약을 타입 안전하게 구현했습니다.',
      },
      {
        name: 'GitHub Actions',
        icon: 'github-actions',
        role: 'CI 완료 이후 실패 근거를 모으고 fork PR에서도 권한 경계가 유지되는 실행 흐름을 설계했습니다.',
      },
      {
        name: 'GitHub API',
        icon: 'github',
        role: 'Check Run과 Workflow Job을 페이지네이션하고 기존 진단 코멘트를 찾아 갱신했습니다.',
      },
      {
        name: 'Security',
        icon: 'shield',
        role: '로그 속 토큰, 비밀번호, API Key, Private Key를 코멘트 작성 전에 마스킹했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/pr-check-doctor/architecture.svg',
      alt: 'PR Check Doctor GitHub CI 실패 로그 수집과 진단 코멘트 생성 흐름',
      caption: '실패 체크를 수집하고 민감값을 제거해 하나의 실행 가능한 코멘트로 정리',
      width: 1600,
      height: 900,
    },
    challenge:
      '여러 CI Job이 동시에 실패하면 로그가 흩어지고 핵심 원인을 찾는 시간이 길어집니다. 자동 진단이 유용하려면 누락 없이 수집하면서도 로그 속 비밀값을 노출하지 않아야 했습니다.',
    responsibilities: [
      'Check Run과 Workflow Job, 실패 로그를 페이지네이션하며 수집하는 흐름을 구현했습니다.',
      '토큰과 비밀번호, API Key, Private Key 패턴을 코멘트 생성 전에 마스킹했습니다.',
      'PASS·WARN·BLOCK 판정과 기존 PR 코멘트 갱신 방식을 설계했습니다.',
    ],
    featureStories: [
      {
        src: 'projects/pr-check-doctor/architecture.svg',
        alt: 'PR Check Doctor 실패 체크 수집부터 보안 필터와 PR 코멘트까지의 구조',
        caption: '실패 위치, 원인 후보, 재현 명령을 한 개의 업데이트 가능한 댓글로 제공',
        width: 1600,
        height: 900,
        title: '로그 요약이 아니라 다음 행동을 전달하기',
        description: '실패한 체크와 유효 로그 구간을 모아 개발자가 바로 실행할 수 있는 재현 명령과 함께 정리했습니다.',
      },
    ],
    outcomes: [
      '체크와 Job 페이지네이션을 적용해 큰 PR에서도 실패 진단이 누락되지 않게 했습니다.',
      '반복 실행 시 새 댓글을 쌓지 않고 기존 진단 코멘트를 갱신해 알림 노이즈를 줄였습니다.',
      'fork PR의 외부 코드 실행과 코멘트 쓰기 권한을 분리할 수 있는 안전한 운영 경계를 정리했습니다.',
    ],
    learnings: [
      '자동화 도구는 진단 정확도뿐 아니라 권한 경계와 반복 실행 시의 사용자 경험까지 함께 설계해야 했습니다.',
    ],
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
      zones: [
        {
          id: 'source',
          label: '진단 원천',
          caption: 'GitHub workflow results',
          kind: 'client',
          nodeIds: ['ci'],
        },
        {
          id: 'analysis',
          label: '진단 파이프라인',
          caption: 'Collect · Redact · Classify · Render',
          kind: 'application',
          nodeIds: ['collector', 'redactor', 'classifier', 'renderer'],
        },
        {
          id: 'delivery',
          label: '개발자 피드백',
          caption: 'Stable updated comment',
          kind: 'external',
          nodeIds: ['pr'],
        },
      ],
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
  {
    slug: 'us-market-intelligence-pipeline',
    title: 'US Market Intelligence Pipeline',
    summary:
      'CPI 발표 시각과 당시 공개값, 발표 전후 실제 체결을 같은 시간축으로 연결해 재현 가능하게 만드는 데이터 파이프라인입니다.',
    status: '개인 프로젝트 · 진행 중',
    role: 'Data Engineering · Kafka·Spark · PostgreSQL',
    team: '개인 프로젝트',
    period: '2026',
    featured: false,
    technologies: ['Python', 'Kafka', 'Spark', 'Airflow', 'PostgreSQL', 'GCP'],
    technologyRoles: [
      {
        name: 'Kafka · Spark',
        icon: 'kafka',
        role: '과거 SIP 원시 체결을 다시 흘려보내 Spark가 직접 검증·중복 제거·1분 집계하도록 구성했습니다.',
      },
      {
        name: 'Airflow',
        icon: 'airflow',
        role: 'Dynamic Task Mapping으로 종목별 수집·검증·집계 작업을 분리해 한 DAG에서 병렬 처리하고 종목별로 재실행할 수 있게 했습니다.',
      },
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        role: '발표 시각·종목·구간을 조합한 고유키로 같은 입력을 다시 실행해도 중복 저장되지 않도록 설계했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/us-market-intelligence-pipeline/architecture.png',
      alt: 'BLS CPI 발표, ALFRED 당시 공개값, Alpaca SIP 체결이 Kafka·Spark를 거쳐 PostgreSQL로 모이는 파이프라인 아키텍처',
      caption: '공식 발표 시각과 당시 공개값, 실제 체결을 같은 시간축으로 연결하는 구조',
      width: 1600,
      height: 1080,
    },
    challenge:
      '"CPI 때문에 주가가 올랐다"를 단정하기 전에, 공식 발표 시각과 그 시점에 실제로 알려져 있던 지표 값, 발표 구간의 실제 체결을 정확히 재현할 수 있어야 했습니다. 나중에 수정된 값이나 재처리 시 중복 저장이 섞이면 이 재현이 무의미해집니다.',
    responsibilities: [
      '같은 체결 데이터를 재처리해도 중복 저장되면 안 되는 문제가 있었습니다. PostgreSQL에 발표 시각·종목·구간을 조합한 고유키 제약을 걸고 저장 로직을 멱등하게 설계했습니다. 부하·복구 테스트로 736만여 건의 체결을 처리하는 중 PostgreSQL을 강제 중단시킨 뒤 같은 입력으로 복구했을 때 최종 고유키 중복 0건을 확인했습니다.',
      '이미 집계된 1분봉만으로는 파이프라인 자체의 정확성을 검증할 수 없는 문제가 있었습니다. Kafka로 과거 원시 체결을 다시 흘려보내고 Spark가 직접 1분봉으로 집계하도록 구성해, NVDA 한 종목의 체결 58,036건으로 만든 121개 1분봉을 거래소 데이터 제공사가 이미 집계한 1분봉과 전부 대조하는 방식으로 검증했습니다.',
      '종목이 늘어날수록 한 종목의 실패가 전체 실행을 막는 문제가 있었습니다. Airflow의 Dynamic Task Mapping으로 종목별 수집·검증·집계 작업을 독립시켜, 네 종목을 한 번에 처리하면서도 종목별 실패 지점과 재실행 범위를 구분할 수 있게 했습니다.',
    ],
    featureStories: [],
    outcomes: [
      'BLS 공식 발표 시각과 ALFRED 당시 공개값을 point-in-time으로 보존해 나중에 수정된 값이 섞이지 않게 했습니다.',
      'Kafka·Spark로 재현한 1분봉이 거래소 데이터 제공사의 1분봉과 전부 일치하는 것을 확인해 파이프라인 정확성을 검증했습니다.',
      '736만여 건 규모의 부하·장애 복구 테스트에서 데이터 중복 0건을 확인했습니다.',
    ],
    learnings: [
      '집계된 데이터만 보고 파이프라인을 신뢰하면 안 되고, 원시 데이터로 직접 재현해 대조해야 정확성을 검증할 수 있었습니다.',
      '멱등성은 처음부터 저장 스키마 설계에 넣어야지, 나중에 재처리 로직으로 보완하기 어렵다는 것을 배웠습니다.',
    ],
    problem:
      '경제지표 발표와 시장 반응의 인과관계를 단정하기 전에, 검증 가능한 데이터로 같은 결과를 다시 계산할 수 있는 기반이 필요했습니다.',
    contribution: [
      'BLS·ALFRED·Alpaca 세 출처의 데이터를 발표 시각 기준으로 연결하는 스키마를 설계했습니다.',
      'Kafka·Spark 기반 원시 체결 재처리 파이프라인을 구축하고 결과를 provider 데이터와 대조 검증했습니다.',
      'Airflow DAG로 다종목 처리를 자동화하고, GCP에서 대규모 부하·장애 복구 테스트를 수행했습니다.',
    ],
    decisions: [
      {
        title: '집계값이 아니라 원시 체결로 검증하기',
        body: '이미 집계된 1분봉만 쓰면 파이프라인 자체의 정확성을 확인할 수 없어, 원시 체결을 직접 재현해 대조하는 경로를 별도로 만들었습니다.',
      },
      {
        title: '저장 단계에서부터 멱등성 보장',
        body: '재처리·재실행이 잦은 파이프라인 특성상, 고유키 제약을 저장 스키마 설계 단계에서부터 넣어 재처리 시 중복이 구조적으로 불가능하게 했습니다.',
      },
    ],
    troubleshooting: [
      {
        problem: '대량 체결 데이터 처리 중 PostgreSQL이 중단되면 재시작 후 데이터가 중복되거나 유실될 위험이 있었습니다.',
        cause: '저장 로직이 재실행 시 같은 입력을 다시 넣는 상황을 전제하지 않았습니다.',
        solution: '발표 시각·종목·구간을 조합한 고유키 제약을 걸어 같은 입력을 여러 번 저장해도 하나만 남도록 만들었습니다.',
        result: '736만여 건 처리 중 강제 중단 후 복구 테스트에서 고유키 중복 0건을 확인했습니다.',
      },
    ],
    architecture: {
      zones: [
        {
          id: 'source',
          label: '공식 데이터 출처',
          caption: 'BLS · ALFRED · Alpaca',
          kind: 'external',
          nodeIds: ['bls', 'alfred', 'alpaca'],
        },
        {
          id: 'pipeline',
          label: '처리 파이프라인',
          caption: 'Kafka · Spark · Airflow',
          kind: 'application',
          nodeIds: ['kafka', 'spark', 'airflow'],
        },
        {
          id: 'storage',
          label: '저장소',
          caption: 'Point-in-time · idempotent',
          kind: 'data',
          nodeIds: ['postgres'],
        },
      ],
      nodes: [
        { id: 'bls', label: 'BLS', caption: 'CPI 발표 시각', icon: 'calendar', ownership: 'external' },
        { id: 'alfred', label: 'ALFRED', caption: '당시 공개값', icon: 'database', ownership: 'external' },
        { id: 'alpaca', label: 'Alpaca SIP', caption: '실제 체결·1분봉', icon: 'chart', ownership: 'external' },
        { id: 'kafka', label: 'Kafka', caption: '원시 체결 재생', icon: 'kafka', ownership: 'mine' },
        { id: 'spark', label: 'Spark', caption: '검증·중복 제거·집계', icon: 'spark', ownership: 'mine' },
        { id: 'airflow', label: 'Airflow', caption: '종목별 병렬 실행', icon: 'airflow', ownership: 'mine' },
        { id: 'postgres', label: 'PostgreSQL', caption: '고유키 기반 멱등 저장', icon: 'postgresql', ownership: 'mine' },
      ],
      edges: [
        { from: 'bls', to: 'postgres', label: '발표 시각', kind: 'data' },
        { from: 'alfred', to: 'postgres', label: '당시 공개값', kind: 'data' },
        { from: 'alpaca', to: 'kafka', label: '원시 체결', kind: 'data' },
        { from: 'kafka', to: 'spark', label: '재생 스트림', kind: 'data' },
        { from: 'spark', to: 'postgres', label: '1분봉 집계', kind: 'data' },
        { from: 'airflow', to: 'kafka', label: '종목별 실행', kind: 'operations' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/hjh6709/us-market-intelligence-pipeline' },
    ],
  },
  {
    slug: 'wait-on',
    title: 'Wait:ON',
    summary:
      '병원 밖에서 대기하는 보호자에게 병원이 확인한 치료 단계와 지금 할 일, 공식 지도 기반 이동 경로를 하나의 여정으로 이어 보여주는 Medical AX 서비스 프로토타입입니다.',
    status: 'AI 해커톤 · 4일 프로토타입',
    role: 'Product · Full-stack — 제품 정의부터 Next.js·NestJS 구현, 배포까지 단독 담당',
    team: '기획·인터뷰 23명 팀 · 구현 단독',
    period: '2026',
    featured: false,
    technologies: ['Next.js', 'React', 'NestJS', 'TypeScript', 'Zod', 'Vercel'],
    technologyRoles: [
      {
        name: 'Next.js · React',
        icon: 'nextjs',
        role: '보호자용 모바일 화면을 만들고, API 응답을 공유 Zod 스키마로 검증해 화면에 반영했습니다.',
      },
      {
        name: 'NestJS',
        icon: 'server',
        role: '보호자 여정 조회·연결·업무 완료, 검사 제한 안내, 공식 시설 카탈로그 API를 설계했습니다.',
      },
      {
        name: 'Zod',
        icon: 'validation',
        role: 'Web과 API가 공유하는 요청·응답 계약을 정의해, 없는 정보는 임의로 만들지 않고 빈 상태로 표시하게 했습니다.',
      },
      {
        name: 'AI 이미지 생성',
        icon: 'ai',
        role: '치료 진행 과정을 일반적인 장면으로 시각화하되, "현재 환자의 실시간 영상이 아닙니다"를 항상 함께 표시했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/wait-on/live/05-route.png',
      alt: '삼성서울병원 공식 층별 안내도 위에 현재 위치와 엘리베이터까지의 검증된 경로를 표시한 Wait:ON 길찾기 화면',
      caption: '출발지·복도·승강기·도착지가 모두 대조된 구간만 공식 경로로 표시',
      width: 780,
      height: 1688,
    },
    challenge:
      '현장 인터뷰에서 만난 보호자 23명은 치료 자체보다 "기다리는 동안"을 더 힘들어했습니다. 치료가 어느 단계인지 알기 어렵고, 서류 발급과 수납을 어디서 처리하는지는 오래 다닌 사람만 알았고, 본관·별관·암병원을 오가는 이동은 평면 지도만으로 이해하기 어려웠습니다. 4일 안에 이 문제를 실제로 동작하는 화면으로 증명해야 했습니다.',
    responsibilities: [
      '환자·보호자·병원 직원 23명 인터뷰로 발견한 문제를, "확인된 사실만 먼저 보여준다", "지금 할 일 하나를 우선한다" 같은 제품 원칙으로 정리하고 Next.js·NestJS·Zod 모노레포 구조를 설계했습니다.',
      '치료가 진단·EMR 없이도 이해되도록, 일반적인 수술 과정을 AI로 재구성한 이미지·영상으로 보여주는 화면을 만들었습니다. "AI가 진단을 생성하지 않는다"는 안전 경계를 지키기 위해 실시간 환자 영상이 아니라는 문구를 항상 함께 표시했습니다.',
      '환자 일정과 검사·수술 장소를 월간 달력으로 묶어 멀리 있는 보호자도 날짜별로 확인하게 하고, 삼성서울병원 공식 층별 안내도에서 출발지·복도·승강기·도착지 좌표를 모두 대조한 구간만 경로로 표시했습니다.',
    ],
    featureStories: [
      {
        src: 'projects/wait-on/live/01-home.png',
        alt: '오늘 병원 일도 차근차근 도와드릴게요 문구와 병원 확인 상태, 목적 검색창이 있는 Wait:ON 홈 화면',
        caption: '지금 상태와 지금 할 일 하나를 우선 보여주는 홈',
        width: 780,
        height: 1688,
        title: '메뉴보다 지금 할 일 하나',
        description: '병원이 확인한 치료 단계와 보호자가 지금 처리할 업무를 한 화면 위쪽에 두어, 전체 메뉴를 뒤지지 않아도 다음 행동을 알 수 있게 했습니다.',
      },
      {
        src: 'projects/wait-on/live/02-progress.png',
        alt: 'AI로 재구성한 일반 과정 배지와 함께 수술 준비 장면을 보여주고 실시간 영상이 아니라는 안내가 있는 화면',
        caption: 'AI 이미지로 대기 시간의 불안을 줄이되 안전 경계는 항상 표시',
        width: 780,
        height: 1688,
        title: '보이지 않는 시간을 보여주기',
        description: '치료 중인 환자를 볼 수 없는 보호자를 위해 일반적인 수술 과정을 AI 이미지로 재구성했습니다. "현재 환자의 실시간 영상이 아닙니다"를 화면에 고정해 오해를 막았습니다.',
      },
      {
        src: 'projects/wait-on/live/03-schedule.png',
        alt: '김정우 환자의 7월 30일 입원 수속과 위암 수술 일정을 시간순으로 보여주는 환자 일정 화면',
        caption: '멀리 있는 보호자도 날짜별로 확인하는 환자 일정',
        width: 780,
        height: 1688,
        title: '문자로 흩어진 일정을 한 곳에',
        description: '입원, 수술 같은 병원 일정을 날짜별 캘린더로 묶어, 문자와 예약 안내를 다시 찾지 않아도 보호자가 환자 일정을 확인할 수 있게 했습니다.',
      },
      {
        src: 'projects/wait-on/live/04-guide.png',
        alt: '무엇을 하러 가시나요 라는 질문과 서류 발급, 전체 건물·층별 안내 목적 카드가 있는 이용 안내 화면',
        caption: '건물 탐색이 아니라 목적에서 시작하는 길찾기',
        width: 780,
        height: 1688,
        title: '목적부터 묻고 경로로 이어주기',
        description: '"서류 발급" 같은 이용 목적을 먼저 고르면 처리 장소와 준비물, 공식 경로로 바로 연결되도록 해, 건물 구조를 몰라도 길을 찾을 수 있게 했습니다.',
      },
    ],
    outcomes: [
      '4일 안에 위암 수술·건강검진 두 여정을 끝까지 시연 가능한 프로토타입으로 구현해 발표했고, 23명 규모 팀에서 동상을 받았습니다.',
      '실제 환자 정보나 EMR·OCS 연결 없이, 가상 시나리오와 병원 공식 공개자료만으로 전체 흐름이 동작하도록 안전 경계를 지켰습니다.',
      '좌표를 대조하지 못한 구간에는 임의의 경로선을 그리지 않도록 해, 잘못된 길찾기로 보호자를 헤매게 할 위험을 없앴습니다.',
    ],
    learnings: [
      '빠르게 만드는 것과 의료 서비스가 지켜야 할 안전 경계(실시간 영상 아님, 진단 아님, 검증된 경로만 표시)는 서로 반대가 아니라, 경계를 먼저 정해야 오히려 빠르게 만들 수 있었습니다.',
    ],
    problem:
      '보호자는 치료 자체뿐 아니라, 지금 어느 단계인지 모르는 채로 기다리는 시간과 서류·수납·이동을 어디서 처리하는지 그때그때 물어야 하는 상황을 함께 겪고 있었습니다.',
    contribution: [
      '23명 인터뷰로 찾은 문제를 제품 원칙으로 정리하고 Next.js·NestJS·Zod 모노레포 구조를 설계했습니다.',
      '치료 과정을 AI 이미지로 시각화하면서 실시간 영상이 아니라는 경계를 항상 함께 표시하는 화면을 구현했습니다.',
      '환자 일정 캘린더와, 좌표를 대조한 구간만 표시하는 공식 지도 기반 길찾기를 구현했습니다.',
    ],
    decisions: [
      {
        title: 'AI 생성 이미지에는 항상 경계 문구를 고정',
        body: '치료 과정을 AI 이미지·영상으로 보여주되 "AI로 재구성한 일반 과정", "현재 환자의 실시간 영상이 아닙니다"를 화면에서 지울 수 없게 고정해, 보호자가 이를 실제 환자 상황으로 오해하지 않게 했습니다.',
      },
      {
        title: '검증되지 않은 구간은 경로선을 그리지 않음',
        body: '공식 층별 안내도에서 출발지·복도·동일 승강기·도착지를 모두 대조한 구간(OFFICIAL_PUBLIC)만 경로로 렌더링하고, 나머지 목적지는 경로선 없이 원문과 안내 데스크 정보만 제공합니다.',
      },
    ],
    troubleshooting: [
      {
        problem: '서류 발급 안내가 화면마다 다른 장소(1층 서류창구, 2층 원무수납)를 가리켰습니다.',
        cause: '목적 카드와 길찾기 화면이 각자 다른 시점의 안내 문구를 참조하고 있었습니다.',
        solution: '서류 발급 안내를 암병원 2층 원무수납 한 곳으로 단일화하고, 목적 카드에서 바로 해당 경로로 연결했습니다.',
        result: '보호자가 서류 발급을 위해 서로 다른 층을 오가지 않도록 안내가 일치하게 되었습니다.',
      },
    ],
    architecture: {
      zones: [
        {
          id: 'client',
          label: '보호자 화면',
          caption: 'Next.js 16 · React 19',
          kind: 'client',
          nodeIds: ['web'],
        },
        {
          id: 'application',
          label: '보호자 여정 API',
          caption: 'NestJS 11 · 공유 Zod 계약',
          kind: 'application',
          nodeIds: ['api', 'contracts', 'journeyRepo', 'restrictionService'],
        },
        {
          id: 'external',
          label: '공식 소스',
          caption: '삼성서울병원 공개 층별 안내도',
          kind: 'external',
          nodeIds: ['hospitalMap'],
        },
      ],
      nodes: [
        { id: 'web', label: 'Web', caption: '보호자 모바일 UI', icon: 'nextjs', ownership: 'mine' },
        { id: 'api', label: 'API', caption: 'NestJS REST endpoint', icon: 'server', ownership: 'mine' },
        { id: 'contracts', label: 'Contracts', caption: '요청·응답 Zod 스키마', icon: 'validation', ownership: 'mine' },
        { id: 'journeyRepo', label: 'Journey Repository', caption: '가상 보호자 여정 상태', icon: 'database', ownership: 'mine' },
        { id: 'restrictionService', label: 'Restriction Guidance', caption: '검사 제한 단계·질문 관리', icon: 'shield', ownership: 'mine' },
        { id: 'hospitalMap', label: '공식 층별 안내도', caption: '삼성서울병원 공개자료', icon: 'link', ownership: 'external' },
      ],
      edges: [
        { from: 'web', to: 'api', label: 'REST + Zod 검증', kind: 'request' },
        { from: 'api', to: 'contracts', label: '계약 검증', kind: 'data' },
        { from: 'api', to: 'journeyRepo', label: '여정 조회·갱신', kind: 'data' },
        { from: 'api', to: 'restrictionService', label: '제한 단계·질문', kind: 'data' },
        { from: 'api', to: 'hospitalMap', label: '공식 지도 이미지·좌표 대조', kind: 'data' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'GitHub repository', href: 'https://github.com/medical-ax-design/mission-hospital' },
    ],
  },
];
