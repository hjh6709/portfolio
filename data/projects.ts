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
      '랜딩부터 로그인, Lab 탐색, 프로비저닝, 실습, 내 학습까지 웹 사용자 흐름을 구현했습니다.',
      'Next.js 화면과 Go Session API, WebSocket 터미널 사이의 상태 계약을 연결했습니다.',
      'KubeVirt 콘솔 연결 RBAC와 세션 복귀·만료·실패 동선을 점검하고 개선했습니다.',
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
          caption: 'Browser · Edge · Private tunnel',
          kind: 'edge',
          nodeIds: ['learner', 'edge', 'tunnel', 'traefik'],
        },
        {
          id: 'application',
          label: '서비스 계층',
          caption: 'Web · API · Authentication · AI',
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
          nodeIds: ['dispatcher', 'vm'],
        },
        {
          id: 'recovery',
          label: '확장·재해 복구',
          caption: 'Capacity overflow · DR · Backup',
          kind: 'recovery',
          nodeIds: ['overflow', 'dr', 's3'],
        },
        {
          id: 'operations',
          label: '플랫폼 제어 계층',
          caption: 'Secrets · GitOps · Observability · Network',
          kind: 'operations',
          nodeIds: ['vault', 'argocd', 'cluster', 'prometheus', 'grafana', 'network'],
        },
      ],
      nodes: [
        { id: 'learner', label: 'Learner', caption: 'Browser', icon: 'browser', ownership: 'external' },
        { id: 'edge', label: 'AWS Edge', caption: 'Route 53 · WAF · ALB', icon: 'aws', ownership: 'team' },
        { id: 'tunnel', label: 'Caddy · Tailscale', caption: 'Public proxy · private tunnel', icon: 'tailscale', ownership: 'team' },
        { id: 'traefik', label: 'Traefik', caption: 'Kubernetes ingress', icon: 'traefik', ownership: 'team' },
        { id: 'web', label: 'Web', caption: 'Next.js · xterm.js', icon: 'nextjs', ownership: 'mine' },
        { id: 'keycloak', label: 'Keycloak', caption: 'OIDC authentication', icon: 'keycloak', ownership: 'mine' },
        { id: 'ai', label: 'AI Tutor', caption: 'Gemini · ChromaDB', icon: 'ai', ownership: 'team' },
        { id: 'api', label: 'Session API', caption: 'Go · WebSocket', icon: 'go', ownership: 'mine' },
        { id: 'db', label: 'PostgreSQL', caption: 'CloudNativePG · learning state', icon: 'postgresql', ownership: 'team' },
        { id: 'dispatcher', label: 'Session Dispatcher', caption: 'Placement', icon: 'kubernetes', ownership: 'team' },
        { id: 'vm', label: 'KubeVirt Lab VM', caption: 'Longhorn · isolated session', icon: 'kubevirt', ownership: 'team' },
        { id: 'kafka', label: 'Apache Kafka', caption: 'Validation events', icon: 'kafka', ownership: 'team' },
        { id: 'validation', label: 'Validation Engine', caption: 'State-based grading', icon: 'validation', ownership: 'team' },
        { id: 'overflow', label: 'EC2 Overflow', caption: 'Capacity fallback', icon: 'aws', ownership: 'team' },
        { id: 'dr', label: 'Amazon EKS DR', caption: 'Disaster recovery cluster', icon: 'kubernetes', ownership: 'team' },
        { id: 's3', label: 'Amazon S3', caption: 'Backup · restore source', icon: 'amazon-s3', ownership: 'external' },
        { id: 'vault', label: 'Vault · ESO', caption: 'Secrets source · sync', icon: 'vault', ownership: 'team' },
        { id: 'argocd', label: 'Argo CD', caption: 'GitOps deployment', icon: 'argocd', ownership: 'team' },
        { id: 'cluster', label: 'On-prem Kubernetes', caption: 'Application · data · VM workloads', icon: 'kubernetes', ownership: 'team' },
        { id: 'prometheus', label: 'Prometheus', caption: 'Metrics · alerts', icon: 'prometheus', ownership: 'team' },
        { id: 'grafana', label: 'Grafana', caption: 'Operations dashboards', icon: 'grafana', ownership: 'team' },
        { id: 'network', label: 'Cilium · Hubble', caption: 'CNI · network visibility', icon: 'cilium', ownership: 'team' },
      ],
      edges: [
        { from: 'learner', to: 'edge', label: 'HTTPS 접속', kind: 'request' },
        { from: 'edge', to: 'tunnel', label: 'WAF 검사 후 전달', kind: 'request' },
        { from: 'tunnel', to: 'traefik', label: 'Tailscale 터널', kind: 'request' },
        { from: 'traefik', to: 'web', label: 'Ingress 라우팅', kind: 'request' },
        { from: 'web', to: 'keycloak', label: 'OIDC login', kind: 'request' },
        { from: 'web', to: 'api', label: 'API · console', kind: 'request' },
        { from: 'web', to: 'ai', label: '단계별 AI 힌트', kind: 'request' },
        { from: 'api', to: 'db', label: '학습·세션 상태 저장', kind: 'data' },
        { from: 'api', to: 'dispatcher', label: 'create session', kind: 'request' },
        { from: 'dispatcher', to: 'vm', label: 'on-prem first', kind: 'request' },
        { from: 'dispatcher', to: 'overflow', label: 'capacity overflow', kind: 'recovery' },
        { from: 'overflow', to: 'dr', label: '장애 시 DR 전환', kind: 'recovery' },
        { from: 's3', to: 'dr', label: '백업 복구', kind: 'recovery' },
        { from: 'api', to: 'kafka', label: '검증 요청 이벤트', kind: 'data' },
        { from: 'kafka', to: 'validation', label: '이벤트 소비', kind: 'data' },
        { from: 'vm', to: 'validation', label: 'VM 상태 확인', kind: 'data' },
        { from: 'validation', to: 'api', label: '채점 결과 반환', kind: 'data' },
        { from: 'vault', to: 'cluster', label: 'ESO Secret 동기화', kind: 'security' },
        { from: 'argocd', to: 'cluster', label: 'GitOps 배포·상태 동기화', kind: 'operations' },
        { from: 'cluster', to: 'prometheus', label: 'Metrics · alerts', kind: 'operations' },
        { from: 'prometheus', to: 'grafana', label: 'PromQL 조회', kind: 'operations' },
        { from: 'network', to: 'cluster', label: '네트워크·흐름 가시성', kind: 'operations' },
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
      { label: 'GitHub repository', href: 'https://github.com/requset700k/Cledyu' },
    ],
  },
  {
    slug: 'codebuddy',
    title: 'CodeBuddy',
    summary:
      'GitHub Webhook을 안전하게 검증하고 PR 변경 분석을 비동기로 처리해 GitHub 리뷰와 Slack으로 전달하는 서버리스 파이프라인입니다.',
    status: '개인 프로젝트 · 구현 완료',
    role: 'Backend · Cloud · Serverless',
    team: '개인 프로젝트',
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
      'AI가 리뷰를 생성하는 것보다 GitHub Webhook을 안전하게 받고, 긴 변경 내용을 보존하며, 지연과 실패가 있어도 결과를 전달하는 전체 파이프라인이 중요했습니다.',
    responsibilities: [
      'GitHub Webhook 수신부터 비동기 Lambda Worker와 Bedrock Agent 호출까지 설계했습니다.',
      'HMAC 검증, Secrets Manager, 최소 권한 IAM으로 외부 요청과 비밀값 경계를 구성했습니다.',
      'GitHub 댓글과 Slack 알림 계약을 테스트로 고정했습니다.',
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
        problem: '약 10,000자의 OpenAPI patch 후반부가 분석 입력에서 누락됐습니다.',
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
    title: 'Kagoshima Travel',
    summary:
      '여행 전 계획과 여행 중 다음 이동을 한 화면에서 관리하는 모바일 우선 여행 플래너입니다.',
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
      caption: '설치형 앱에서 실제 Google 지도와 저장 장소, 현재 위치를 확인하는 운영 화면',
      width: 908,
      height: 1716,
    },
    architectureImage: {
      src: 'projects/kagoshima-travel/service-flow.svg',
      alt: 'Kagoshima Travel 실제 배포 구성과 외부 서비스 연결 흐름',
      caption: 'Vercel React PWA, Oracle Cloud의 Caddy와 Go API, Supabase PostgreSQL 및 Google 서비스 연결 구조',
      width: 1920,
      height: 1080,
    },
    challenge:
      '여행 준비 때 필요한 편집 기능과 현장에서 바로 확인해야 하는 다음 일정은 사용 맥락이 달랐습니다. 작은 화면에서 필요한 정보가 먼저 보이면서도 공유 권한은 안전하게 분리해야 했습니다.',
    responsibilities: [
      'React PWA, Go API, PostgreSQL 데이터 모델을 설계하고 구현했습니다.',
      '여행·일정·장소·체크리스트와 읽기 전용 공유 링크를 하나의 서비스로 연결했습니다.',
      'Vercel과 Oracle Cloud VM, Caddy를 이용한 배포 및 복구 절차를 구성했습니다.',
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
        description: '동행자는 로그인 없이 토큰 링크로 필요한 여행 정보만 확인합니다.',
        href: 'https://kagoshima.hjh-dev.site/share/lo-PEB-IyorpWGzTaRFuuJffCGWZ3tFe',
      },
    ],
    featureStories: [
      {
        src: 'projects/kagoshima-travel/live/today.png',
        alt: '출발 준비와 첫날 동선을 한눈에 보여주는 Kagoshima Travel 오늘 화면',
        caption: '여행 단계, 첫 일정, 환율과 체크리스트를 모은 현재 운영 화면',
        width: 1280,
        height: 720,
        title: '현장에서 필요한 다음 행동을 먼저',
        description: '출발까지 남은 시간과 첫 일정, 이동 경로, 준비 항목을 한 화면에 모았습니다. 사용자는 여러 메뉴를 오가지 않고 지금 확인해야 할 행동부터 시작할 수 있습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/schedule.png',
        alt: '날짜별 일정을 확인하고 이동 순서를 관리하는 Kagoshima Travel 일정 화면',
        caption: '여행 전체 일정을 날짜별 동선으로 정리한 현재 운영 화면',
        width: 1280,
        height: 720,
        title: '계획은 날짜별 동선으로 읽히도록',
        description: '장소 목록이 아니라 하루의 이동 순서로 일정을 구성했습니다. 여행 전에는 전체 계획을 검토하고 현장에서는 현재 날짜의 다음 장소를 바로 찾을 수 있습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/map-current.png',
        alt: '저장한 장소와 현재 위치를 보여주는 Kagoshima Travel 지도 화면',
        caption: '저장 장소와 현재 위치를 실제 지도 위에서 확인하는 현재 운영 화면',
        width: 908,
        height: 1716,
        title: '저장한 장소를 실제 이동 경로로 연결',
        description: '일정에 담은 장소를 지도에서 다시 검색하지 않도록 저장 장소와 날짜별 경로를 연결했습니다. 계획과 현장 이동 사이의 정보 단절을 줄였습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/share.png',
        alt: '로그인 없이 여행 일정을 확인하는 Kagoshima Travel 읽기 전용 공유 화면',
        caption: '동행자가 계정 없이 필요한 여행 정보만 확인하는 현재 공유 화면',
        width: 520,
        height: 960,
        title: '동행자에게는 필요한 정보만 공유',
        description: '공유 토큰으로 읽기 전용 화면을 제공하고 원본 여행의 편집 권한은 분리했습니다. 동행자는 가입 과정 없이 일정과 동선을 확인할 수 있습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/login.png',
        alt: '개인 여행 관리로 진입하는 Kagoshima Travel 이메일 로그인 화면',
        caption: '공개 탐색과 개인 여행 편집의 경계를 구분하는 현재 로그인 화면',
        width: 520,
        height: 960,
        title: '공개 탐색과 개인 편집의 경계를 명확하게',
        description: '샘플과 공유 여행은 바로 열고 여행 생성과 편집은 인증 이후에 제공합니다. 사용 목적에 맞춰 진입 경로와 권한 경계를 나눴습니다.',
      },
      {
        src: 'projects/kagoshima-travel/live/register.png',
        alt: '이메일 확인과 비밀번호 설정으로 이어지는 Kagoshima Travel 회원가입 화면',
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
        { from: 'web', to: 'places', label: 'place search', kind: 'request' },
        { from: 'actions', to: 'vercel', label: 'Frontend deploy', kind: 'operations' },
        { from: 'actions', to: 'api', label: 'API build · deploy', kind: 'operations' },
      ],
    },
    gallery: [],
    evidence: [
      { label: 'Live service', href: 'https://kagoshima.hjh-dev.site/' },
      { label: 'Sample trip', href: 'https://kagoshima.hjh-dev.site/demo' },
      {
        label: 'Shared trip',
        href: 'https://kagoshima.hjh-dev.site/share/lo-PEB-IyorpWGzTaRFuuJffCGWZ3tFe',
      },
      { label: 'GitHub repository', href: 'https://github.com/hjh6709/for_Kagoshima_travel' },
    ],
  },
  {
    slug: 'chilseongpa',
    title: 'Chilseongpa',
    summary:
      'GCP 주 환경과 AWS 대기 환경을 연결하고 장애 시 트래픽을 전환하는 하이브리드 멀티클라우드 운영 프로젝트입니다.',
    status: '팀 프로젝트 · 구축 완료',
    role: 'AWS infrastructure · Cross-cloud connectivity',
    team: '6인 팀 프로젝트',
    period: '2026',
    featured: true,
    technologies: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Cloudflare', 'Prometheus', 'Grafana'],
    technologyRoles: [
      {
        name: 'AWS',
        icon: 'aws',
        role: 'Standby VPC와 컴퓨트, Kubernetes 접근 경로를 구성하고 장애 전환 대상을 준비했습니다.',
      },
      {
        name: 'Kubernetes',
        icon: 'kubernetes',
        role: '재실행 가능한 Failover를 위해 잔여 리소스 정리와 배포 순서를 운영 절차로 고정했습니다.',
      },
      {
        name: 'Terraform',
        icon: 'terraform',
        role: '대기 환경의 네트워크와 인프라 구성을 코드로 관리하고 반복 배포 가능성을 높였습니다.',
      },
      {
        name: 'Prometheus · Grafana',
        icon: 'prometheus',
        role: '전환 전후의 상태와 지표를 확인할 수 있도록 관측 구성과 Alert Rule을 검증했습니다.',
      },
    ],
    heroImage: {
      src: 'projects/chilseongpa/architecture.svg',
      alt: 'Chilseongpa GCP Primary와 AWS Standby 장애 전환 아키텍처',
      caption: 'Cloudflare 상태 확인을 기준으로 GCP에서 AWS로 전환하는 하이브리드 구조',
      width: 1600,
      height: 900,
    },
    challenge:
      '주 클라우드에 장애가 나도 서비스를 이어가려면 대기 환경만 만드는 것으로 부족했습니다. 같은 애플리케이션 버전, 데이터 접근, DNS 전환과 모니터링이 함께 동작해야 했습니다.',
    responsibilities: [
      'AWS Standby 환경의 네트워크, 컴퓨트, Kubernetes 인프라와 접근 경로를 구성했습니다.',
      'AWS 환경에서 GCP Cloud SQL을 사용하는 교차 클라우드 연결 조건을 점검했습니다.',
      'Prometheus와 Grafana 구성을 이전하고 장애 전환 시 관측 흐름을 검증했습니다.',
    ],
    featureStories: [
      {
        src: 'projects/chilseongpa/architecture.svg',
        alt: 'Cloudflare 라우팅과 GCP AWS 이중 환경을 보여주는 장애 복구 흐름',
        caption: 'Primary와 Standby가 같은 데이터와 관측 흐름을 사용하도록 연결',
        width: 1600,
        height: 900,
        title: '대기 환경을 실제 전환 가능한 환경으로',
        description: '장애 감지, Kubernetes 리소스 정리, Load Balancer 생성, DNS 전환 순서를 하나의 운영 절차로 검증했습니다.',
      },
    ],
    outcomes: [
      'GCP 장애 시 AWS Standby로 전환하고 복구 후 원 환경으로 돌아오는 흐름을 실습했습니다.',
      'Failback 뒤 남은 Kubernetes 객체가 다음 Failover를 막는 문제를 찾아 정리 순서를 보완했습니다.',
    ],
    learnings: [
      '인프라 생성만큼 재실행 가능하고 관측 가능한 전환 절차가 중요했습니다.',
    ],
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
      zones: [
        {
          id: 'access',
          label: '접속·라우팅',
          caption: 'Health check · Traffic steering',
          kind: 'edge',
          nodeIds: ['user', 'edge'],
        },
        {
          id: 'primary',
          label: 'Primary 환경',
          caption: 'GCP Kubernetes',
          kind: 'runtime',
          nodeIds: ['gcp'],
        },
        {
          id: 'standby',
          label: 'Standby 환경',
          caption: 'AWS Kubernetes',
          kind: 'recovery',
          nodeIds: ['aws'],
        },
        {
          id: 'data',
          label: '공유 데이터 계층',
          caption: 'Cross-cloud application data',
          kind: 'data',
          nodeIds: ['db'],
        },
        {
          id: 'operations',
          label: '통합 관측',
          caption: 'Primary · Standby metrics',
          kind: 'operations',
          nodeIds: ['monitoring'],
        },
      ],
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
];
