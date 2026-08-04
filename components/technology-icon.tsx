import type { IconType } from 'react-icons';
import {
  FaAws,
  FaCircleCheck,
  FaCloud,
  FaCode,
  FaDatabase,
  FaLink,
  FaMobileScreenButton,
  FaRobot,
  FaServer,
  FaSlack,
} from 'react-icons/fa6';
import {
  SiApachekafka,
  SiGithub,
  SiGo,
  SiGooglechrome,
  SiGooglemaps,
  SiKeycloak,
  SiKubernetes,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
} from 'react-icons/si';

const icons: Record<string, IconType> = {
  'amazon-bedrock': FaRobot,
  'aws-api-gateway': FaAws,
  'aws-lambda': FaAws,
  aws: FaAws,
  browser: SiGooglechrome,
  github: SiGithub,
  go: SiGo,
  'google-maps': SiGooglemaps,
  kafka: SiApachekafka,
  keycloak: SiKeycloak,
  kubevirt: SiKubernetes,
  kubernetes: SiKubernetes,
  link: FaLink,
  mobile: FaMobileScreenButton,
  nextjs: SiNextdotjs,
  postgresql: SiPostgresql,
  react: SiReact,
  slack: FaSlack,
  validation: FaCircleCheck,
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
