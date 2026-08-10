export type Capability = {
  title: string;
  description: string;
  skills: string[];
};

export type TimelineItem = {
  title: string;
  organization: string;
  period?: string;
  description: string;
};

export const profile = {
  name: '한정현',
  title: 'Backend Developer',
  introduction:
    'API와 데이터 흐름을 설계하고, 사용자 화면부터 클라우드 운영 환경까지 직접 확인하는 백엔드 개발자입니다.',
  email: 'jh6780h@naver.com',
  github: 'https://github.com/hjh6709',
} as const;

export const capabilities: Capability[] = [
  {
    title: 'Backend',
    description: '서비스의 핵심 규칙과 데이터 흐름을 API로 구현하고 실패 경로까지 검증합니다.',
    skills: ['Go', 'Python', 'REST API', 'PostgreSQL', 'WebSocket', 'Authentication'],
  },
  {
    title: 'Service Experience',
    description: '백엔드 상태가 사용자의 화면과 행동으로 자연스럽게 이어지도록 전체 흐름을 다룹니다.',
    skills: ['Next.js', 'React', 'TypeScript', 'PWA', 'Loading & Error UX'],
  },
  {
    title: 'Cloud & Platform',
    description: '코드가 실제 환경에서 배포되고 관측되며 복구되는 과정까지 연결합니다.',
    skills: ['Kubernetes', 'AWS', 'KubeVirt', 'Terraform', 'Argo CD', 'Observability'],
  },
];

export const experience: TimelineItem[] = [
  {
    title: '안전감사실 인턴',
    organization: '평택도시공사',
    description:
      '직원 출석부 데이터를 정리하고 공문서 작성과 행사 운영을 지원하며, 정확한 기록과 협업 절차를 익혔습니다.',
  },
];

export const education: TimelineItem[] = [
  {
    title: '클라우드 인프라 부트캠프',
    organization: 'KT Cloud',
    description:
      'Linux와 네트워크 기초부터 Docker, Kubernetes, AWS, Terraform, CI/CD, OpenStack까지 실습하며 클라우드 서비스의 구축과 운영 흐름을 익혔습니다.',
  },
];
