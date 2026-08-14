import type { IconType } from 'react-icons';
import {
  FaAws,
  FaCircleCheck,
  FaCloud,
  FaCode,
  FaCodePullRequest,
  FaDatabase,
  FaFilter,
  FaLink,
  FaMobileScreenButton,
  FaRegCommentDots,
  FaRobot,
  FaServer,
  FaShieldHalved,
  FaSlack,
} from 'react-icons/fa6';
import {
  SiArgo,
  SiApachekafka,
  SiCaddy,
  SiCilium,
  SiCloudflare,
  SiDocker,
  SiGithubactions,
  SiGithub,
  SiGo,
  SiGooglechrome,
  SiGooglemaps,
  SiGrafana,
  SiKeycloak,
  SiKubernetes,
  SiNextdotjs,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailscale,
  SiTerraform,
  SiTraefikproxy,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVault,
} from 'react-icons/si';

const icons: Record<string, IconType> = {
  ai: FaRobot,
  'amazon-bedrock': FaRobot,
  'amazon-s3': FaAws,
  argocd: SiArgo,
  'aws-api-gateway': FaAws,
  'aws-lambda': FaAws,
  aws: FaAws,
  browser: SiGooglechrome,
  caddy: SiCaddy,
  cilium: SiCilium,
  cloudflare: SiCloudflare,
  comment: FaRegCommentDots,
  docker: SiDocker,
  filter: FaFilter,
  github: SiGithub,
  'github-actions': SiGithubactions,
  go: SiGo,
  'google-maps': SiGooglemaps,
  grafana: SiGrafana,
  kafka: SiApachekafka,
  keycloak: SiKeycloak,
  kubevirt: SiKubernetes,
  kubernetes: SiKubernetes,
  link: FaLink,
  mobile: FaMobileScreenButton,
  nextjs: SiNextdotjs,
  postgresql: SiPostgresql,
  prometheus: SiPrometheus,
  'pull-request': FaCodePullRequest,
  python: SiPython,
  react: SiReact,
  shield: FaShieldHalved,
  slack: FaSlack,
  validation: FaCircleCheck,
  supabase: SiSupabase,
  tailscale: SiTailscale,
  terraform: SiTerraform,
  traefik: SiTraefikproxy,
  typescript: SiTypescript,
  vercel: SiVercel,
  vite: SiVite,
  vault: SiVault,
};

const fallbackIcons: IconType[] = [FaServer, FaDatabase, FaCloud, FaCode];

type TechnologyIconProps = {
  name: string;
  label: string;
};

export function TechnologyIcon({ name, label }: TechnologyIconProps) {
  const fallbackIndex = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const Icon = icons[name] ?? fallbackIcons[fallbackIndex % fallbackIcons.length];

  return <Icon aria-label={`${label} 아이콘`} role="img" />;
}
